/**
 * UTCS Validator Service
 * Based on AMPEL360 UTCS-Optimized Identification Coding Standard
 * 
 * Format: YYYZZZ‑PPPVVVV‑APP‑[INS]
 * Where:
 * - YYYZZZ: UTCS Classification (6 digits)
 * - PPPVVVV: Product Variant (7 alphanumerics)
 * - APP: System/Technology ID (3 letters)
 * - [INS]: Installation/Unit specification in brackets
 */

import { DOMAIN_TABLE } from '../data/utcsDomains'
import { PRODUCT_VARIANTS } from '../data/productVariants'
import { SYSTEM_TRIGRAMS } from '../data/systemTrigrams'

export interface ParsedUTCS {
  utcs: string
  variant: string
  system: string
  installation: string
  fullCode: string
}

export interface UTCSValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  suggestions: string[]
  parsed?: ParsedUTCS
}

export interface InstallationUnit {
  type: 'single' | 'range' | 'list' | 'special'
  value: string
  expanded?: number[]
}

export interface ImmutabilityResult {
  isCompliant: boolean
  violations: string[]
}

export interface ContentValidationResult {
  codes: string[]
  results: UTCSValidationResult[]
  hasErrors: boolean
}

/**
 * Parse a UTCS code into its component parts
 */
export function parseUTCS(code: string): ParsedUTCS | null {
  // Use proper en-dash (U+2011) as specified in the standard, but also accept regular hyphens
  const pattern = /^([0-9]{6})[-‑]([A-Z0-9]{7})[-‑]([A-Z]{3})[-‑]\[(.+)\]$/
  const match = pattern.exec(code.trim())
  
  if (!match) return null
  
  return {
    utcs: match[1],
    variant: match[2],
    system: match[3],
    installation: match[4],
    fullCode: code
  }
}

/**
 * Parse installation string into structured units
 */
export function parseInstallation(installation: string): InstallationUnit[] {
  const units: InstallationUnit[] = []
  
  // Handle special cases
  if (['ALL', 'STD', 'TST', 'DEV'].includes(installation)) {
    return [{ type: 'special', value: installation }]
  }
  
  // Split by commas and process each part
  const parts = installation.split(',').map(p => p.trim())
  
  for (const part of parts) {
    if (part.includes('‑') || part.includes('-')) {
      // Range format: n-m or n‑m
      const [start, end] = part.split(/[-‑]/).map(s => parseInt(s.trim()))
      if (!isNaN(start) && !isNaN(end) && start <= end) {
        const expanded = Array.from({ length: end - start + 1 }, (_, i) => start + i)
        units.push({ type: 'range', value: part, expanded })
      } else {
        units.push({ type: 'single', value: part })
      }
    } else if (/^\d+$/.test(part)) {
      // Single number
      units.push({ type: 'single', value: part, expanded: [parseInt(part)] })
    } else {
      // List or other format
      units.push({ type: 'list', value: part })
    }
  }
  
  return units
}

/**
 * Validate a complete UTCS code
 */
export function validateUTCS(code: string): UTCSValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const suggestions: string[] = []
  
  // Check for empty or undefined code
  if (!code || code.trim().length === 0) {
    return {
      isValid: false,
      errors: ['UTCS code cannot be empty'],
      warnings,
      suggestions
    }
  }
  
  // Parse the code
  const parsed = parseUTCS(code)
  if (!parsed) {
    return {
      isValid: false,
      errors: [
        'Invalid UTCS code format',
        'Expected format: YYYZZZ-PPPVVVV-APP-[INS]',
        'Where YYYZZZ = 6 digits, PPPVVVV = 7 alphanumerics, APP = 3 letters, [INS] = installation in brackets'
      ],
      warnings,
      suggestions: [
        'Ensure you use the proper en-dash (‑) delimiter between blocks',
        'Check that installation specification is enclosed in brackets'
      ]
    }
  }
  
  // Check UTCS domain
  if (!DOMAIN_TABLE[parsed.utcs]) {
    errors.push(`Unknown UTCS domain/category: ${parsed.utcs}`)
  }
  
  // Check product variant
  if (!PRODUCT_VARIANTS[parsed.variant]) {
    errors.push(`Unknown product variant: ${parsed.variant}`)
  }
  
  // Check system trigram
  if (!SYSTEM_TRIGRAMS[parsed.system]) {
    errors.push(`Unregistered system/technology trigram: ${parsed.system}`)
  }
  
  // Validate installation
  const installationUnits = parseInstallation(parsed.installation)
  
  // Check for invalid characters in installation
  if (!/^[0-9,\-‑\[\]A-Z ]+$/.test(`[${parsed.installation}]`)) {
    errors.push('Installation contains invalid characters')
  }
  
  // Check for large ranges (warning)
  for (const unit of installationUnits) {
    if (unit.type === 'range' && unit.expanded && unit.expanded.length > 100) {
      warnings.push(`Large installation range detected (${unit.expanded.length} units)`)
    }
  }
  
  // Check for overly complex installations
  if (installationUnits.length > 20) {
    warnings.push('Consider using a more concise installation specification')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestions,
    parsed
  }
}

/**
 * Suggest UTCS codes based on partial input
 */
export function suggestUTCS(partial: string): string[] {
  const suggestions: string[] = []
  
  // If partial looks like a domain, suggest variants
  if (/^[0-9]{6}$/.test(partial) && DOMAIN_TABLE[partial]) {
    const commonVariants = ['BWBQ100', 'HYBE180', 'EVTCITY', 'QPURACK']
    commonVariants.forEach(variant => {
      suggestions.push(`${partial}‑${variant}‑`)
    })
  }
  
  // If partial has domain and variant, suggest systems
  const partialMatch = /^([0-9]{6})‑([A-Z0-9]{7})‑$/.exec(partial)
  if (partialMatch) {
    const [, domain, variant] = partialMatch
    
    // Get suitable trigrams based on variant type
    const suitableTrigrams = Object.values(SYSTEM_TRIGRAMS)
      .filter(trigram => {
        if (variant.includes('Q') && trigram.family.includes('Quantum')) return true
        if (variant.includes('HYB') && trigram.family.includes('Hybrid')) return true
        if (variant.includes('EVT') && trigram.family.includes('Electric')) return true
        return trigram.common
      })
      .slice(0, 5)
    
    suitableTrigrams.forEach(trigram => {
      suggestions.push(`${partial}${trigram.code}‑[`)
    })
  }
  
  return suggestions
}

/**
 * Extract UTCS codes from text content
 */
export function extractUTCSCodes(content: string): string[] {
  const pattern = /([0-9]{6})[-‑]([A-Z0-9]{7})[-‑]([A-Z]{3})[-‑]\[([^\]]+)\]/g
  const codes: string[] = []
  let match
  
  while ((match = pattern.exec(content)) !== null) {
    codes.push(match[0])
  }
  
  return codes
}

/**
 * Validate all UTCS codes in content
 */
export function validateContentUTCS(content: string): ContentValidationResult {
  const codes = extractUTCSCodes(content)
  const results = codes.map(code => validateUTCS(code))
  const hasErrors = results.some(r => !r.isValid)
  
  return { codes, results, hasErrors }
}

/**
 * Format validation result as human-readable text
 */
export function formatValidationResult(result: UTCSValidationResult): string {
  let output = ''
  
  if (result.isValid) {
    output += '✅ Valid UTCS code\n'
    if (result.parsed) {
      output += `   Domain: ${result.parsed.utcs}\n`
      output += `   Variant: ${result.parsed.variant}\n`
      output += `   System: ${result.parsed.system}\n`
      output += `   Installation: ${result.parsed.installation}\n`
    }
    output += '\n'
  } else {
    output += '❌ Invalid UTCS code\n'
    result.errors.forEach(error => {
      output += `   ❌ ${error}\n`
    })
  }
  
  if (result.warnings.length > 0) {
    result.warnings.forEach(warning => {
      output += `   ⚠️ ${warning}\n`
    })
  }
  
  if (result.suggestions.length > 0) {
    result.suggestions.forEach(suggestion => {
      output += `   💡 ${suggestion}\n`
    })
  }
  
  return output
}

/**
 * Check if a code follows the immutability principle
 */
export function checkCodeImmutability(oldCode: string, newCode: string): ImmutabilityResult {
  const violations: string[] = []
  const oldParsed = parseUTCS(oldCode)
  const newParsed = parseUTCS(newCode)
  
  if (!oldParsed || !newParsed) {
    violations.push('Cannot parse one or both codes')
    return { isCompliant: false, violations }
  }
  
  // Check UTCS classification (Block A) - must not change
  if (oldParsed.utcs !== newParsed.utcs) {
    violations.push('UTCS classification (Block A) changed - this violates immutability principle')
  }
  
  // Check product variant (Block B) - must not change
  if (oldParsed.variant !== newParsed.variant) {
    violations.push('Product variant (Block B) changed - this violates immutability principle')
  }
  
  // Check system trigram (Block C) - must not change
  if (oldParsed.system !== newParsed.system) {
    violations.push('System/Technology ID (Block C) changed - this violates immutability principle')
  }
  
  // Installation block (Block D) can change - this is allowed
  
  return {
    isCompliant: violations.length === 0,
    violations
  }
}