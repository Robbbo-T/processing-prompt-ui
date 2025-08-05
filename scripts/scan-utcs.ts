#!/usr/bin/env ts-node

/**
 * UTCS Code Scanner for CI/CD Pipeline
 * 
 * Scans files for UTCS codes and validates them against the standard
 * Usage: npx ts-node scripts/scan-utcs.ts [file-patterns...]
 */

import * as fs from 'fs'
import * as path from 'path'
import glob from 'glob'
import { validateContentUTCS, formatValidationResult } from '../src/services/utcsValidator.js'

interface ScanResult {
  file: string
  codes: string[]
  errors: number
  warnings: number
  details: string[]
}

interface ScanSummary {
  filesScanned: number
  totalCodes: number
  validCodes: number
  invalidCodes: number
  filesWithErrors: number
  results: ScanResult[]
}

/**
 * Scan a single file for UTCS codes
 */
function scanFile(filePath: string): ScanResult {
  const content = fs.readFileSync(filePath, 'utf-8')
  const validation = validateContentUTCS(content)
  
  let errors = 0
  let warnings = 0
  const details: string[] = []
  
  validation.results.forEach((result, index) => {
    const code = validation.codes[index]
    if (!result.isValid) {
      errors++
      details.push(`❌ ${code}: ${result.errors.join(', ')}`)
    } else if (result.warnings.length > 0) {
      warnings++
      details.push(`⚠️  ${code}: ${result.warnings.join(', ')}`)
    } else {
      details.push(`✅ ${code}: Valid`)
    }
  })
  
  return {
    file: filePath,
    codes: validation.codes,
    errors,
    warnings,
    details
  }
}

/**
 * Scan multiple files matching patterns
 */
function scanFiles(patterns: string[]): ScanSummary {
  const files = new Set<string>()
  
  // Collect all matching files
  for (const pattern of patterns) {
    const matches = glob.sync(pattern, { 
      ignore: ['node_modules/**', 'dist/**', 'build/**', '.git/**'],
      absolute: true 
    })
    matches.forEach(file => files.add(file))
  }
  
  const results: ScanResult[] = []
  let totalCodes = 0
  let validCodes = 0
  let invalidCodes = 0
  let filesWithErrors = 0
  
  console.log(`🔍 Scanning ${files.size} files for UTCS codes...\n`)
  
  for (const file of Array.from(files).sort()) {
    try {
      const result = scanFile(file)
      results.push(result)
      
      totalCodes += result.codes.length
      validCodes += result.codes.length - result.errors
      invalidCodes += result.errors
      
      if (result.errors > 0) {
        filesWithErrors++
      }
      
      // Print results for this file
      if (result.codes.length > 0) {
        const relativePath = path.relative(process.cwd(), file)
        console.log(`📄 ${relativePath}`)
        
        if (result.codes.length === 0) {
          console.log('   No UTCS codes found')
        } else {
          result.details.forEach(detail => {
            console.log(`   ${detail}`)
          })
        }
        console.log()
      }
    } catch (error) {
      console.error(`❌ Error scanning ${file}: ${error}`)
    }
  }
  
  return {
    filesScanned: files.size,
    totalCodes,
    validCodes,
    invalidCodes,
    filesWithErrors,
    results
  }
}

/**
 * Print scan summary
 */
function printSummary(summary: ScanSummary): void {
  console.log('📊 UTCS Scan Summary')
  console.log('==================')
  console.log(`Files scanned: ${summary.filesScanned}`)
  console.log(`Total UTCS codes found: ${summary.totalCodes}`)
  console.log(`Valid codes: ${summary.validCodes}`)
  console.log(`Invalid codes: ${summary.invalidCodes}`)
  console.log(`Files with errors: ${summary.filesWithErrors}`)
  
  if (summary.invalidCodes > 0) {
    console.log('\n❌ Validation failed! Found invalid UTCS codes.')
    
    // List all files with errors
    const errorFiles = summary.results.filter(r => r.errors > 0)
    if (errorFiles.length > 0) {
      console.log('\nFiles with invalid codes:')
      errorFiles.forEach(result => {
        const relativePath = path.relative(process.cwd(), result.file)
        console.log(`   ${relativePath} (${result.errors} errors)`)
      })
    }
  } else {
    console.log('\n✅ All UTCS codes are valid!')
  }
}

/**
 * Generate JUnit XML report for CI systems
 */
function generateJUnitReport(summary: ScanSummary, outputPath: string): void {
  const testSuites = summary.results.map(result => {
    const relativePath = path.relative(process.cwd(), result.file)
    const testCases = result.codes.map((code, index) => {
      const isValid = index < result.codes.length - result.errors
      if (isValid) {
        return `    <testcase name="${code}" classname="${relativePath}"/>`
      } else {
        const detail = result.details[index] || 'Unknown error'
        return `    <testcase name="${code}" classname="${relativePath}">
      <failure message="Invalid UTCS code">${detail}</failure>
    </testcase>`
      }
    }).join('\n')
    
    return `  <testsuite name="${relativePath}" tests="${result.codes.length}" failures="${result.errors}" errors="0">
${testCases}
  </testsuite>`
  }).join('\n')
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="UTCS Validation" tests="${summary.totalCodes}" failures="${summary.invalidCodes}" errors="0">
${testSuites}
</testsuites>`
  
  fs.writeFileSync(outputPath, xml)
  console.log(`📋 JUnit report written to ${outputPath}`)
}

/**
 * Main execution
 */
function main(): void {
  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    console.log('Usage: npx ts-node scripts/scan-utcs.ts [file-patterns...]')
    console.log('Example: npx ts-node scripts/scan-utcs.ts "src/**/*.{ts,tsx,md}"')
    process.exit(1)
  }
  
  const summary = scanFiles(args)
  printSummary(summary)
  
  // Generate JUnit report if requested
  const junitOutput = process.env.JUNIT_OUTPUT
  if (junitOutput) {
    generateJUnitReport(summary, junitOutput)
  }
  
  // Exit with error code if validation failed
  if (summary.invalidCodes > 0) {
    process.exit(1)
  }
}

// Handle CLI usage
if (require.main === module) {
  main()
}

export { scanFiles, scanFile }