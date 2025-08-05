/**
 * AMPEL360 UTCS-Optimized Identification Coding Standard Validator
 * 
 * Validates codes in format: YYYZZZ-PPPVVVV-APP-[INS]
 * Where:
 * - YYYZZZ: UTCS Classification (6 digits)
 * - PPPVVVV: Product Variant (7 alphanumerics)
 * - APP: System/Technology ID (3 letters)
 * - [INS]: Installation/Unit (variable, in brackets)
 */

import { DOMAIN_TABLE } from '../data/utcsDomains'
import { PRODUCT_VARIANTS } from '../data/productVariants'
import { SYSTEM_TRIGRAMS } from '../data/systemTrigrams'

export interface ParsedUTCS {
  /** UTCS Classification (6 digits) */
  utcs: string
  /** Product Variant (7 alphanumerics) */
  variant: string
  /** System/Technology ID (3 letters) */
  system: string
  /** Installation/Unit string (without brackets) */
  installation: string
  /** Original full code */
  fullCode: string
}

export interface UTCSValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  parsed?: ParsedUTCS
  suggestions?: string[]
}

export interface InstallationUnit {
  type: 'single' | 'range' | 'list' | 'special'
  value: string
  expanded?: number[]
}

/**
 * Parse a UTCS code into its component parts
 */
export function parseUTCS(code: string): ParsedUTCS | null {
  // Use proper en-dash (U+2011) as specified in the standard
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
        'Check that installation units are enclosed in square brackets [...]'
      ]
    }
  }
  
  // Validate UTCS Classification (Block A)
  if (!DOMAIN_TABLE[parsed.utcs]) {
    errors.push(`Unknown UTCS domain/category: ${parsed.utcs}`)
    suggestions.push('Verify UTCS classification against the master domain table')
  }
  
  // Validate Product Variant (Block B)
  if (!PRODUCT_VARIANTS[parsed.variant]) {
    errors.push(`Unknown product variant: ${parsed.variant}`)
    suggestions.push('Check the Product Variant Catalogue or submit a new variant request to CRB')
  }
  
  // Validate System/Technology ID (Block C)
  if (!SYSTEM_TRIGRAMS[parsed.system]) {
    errors.push(`Unregistered system/technology trigram: ${parsed.system}`)
    suggestions.push('Register new trigram through CRB approval process')
  }
  
  // Validate Installation string (Block D)
  const installationUnits = parseInstallation(parsed.installation)
  if (installationUnits.length === 0) {
    errors.push('Invalid installation format')
    suggestions.push('Use formats like: [1], [1-10], [1,3,5], [1-10,17,54], [ALL], [STD], [TST], or [DEV]')
  }
  
  // Check for invalid characters in installation
  if (!/^[A-Z0-9,\-‑\s]+$/.test(parsed.installation)) {
    errors.push('Installation contains invalid characters')
    suggestions.push('Use only numbers, commas, dashes, and special keywords (ALL, STD, TST, DEV)')
  }
  
  // Validate installation ranges
  for (const unit of installationUnits) {
    if (unit.type === 'range' && unit.expanded) {
      if (unit.expanded.some(n => n < 1)) {
        warnings.push('Installation units should typically start from 1')
      }
      if (unit.expanded.length > 100) {
        warnings.push(`Large installation range detected (${unit.expanded.length} units)`)
      }
    }
  }
  
  // Check code immutability compliance
  if (parsed.variant.endsWith('V2') || parsed.variant.endsWith('V3')) {
    warnings.push('Consider using a new product variant code for major redesigns rather than version suffixes')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    parsed,
    suggestions
  }
}

/**
 * Generate suggestions for UTCS code completion
 */
export function suggestUTCS(partial: string): string[] {
  const suggestions: string[] = []
  
  // If partial looks like a domain, suggest variants
  if (/^[0-9]{6}$/.test(partial)) {
    const domainInfo = DOMAIN_TABLE[partial]
    if (domainInfo) {
      // Suggest common variants for this domain
      const commonVariants = Object.keys(PRODUCT_VARIANTS).slice(0, 5)
      commonVariants.forEach(variant => {
        suggestions.push(`${partial}-${variant}-`)
      })
    }
  }
  
  // If partial has domain and variant, suggest systems
  const partialMatch = /^([0-9]{6})[-‑]([A-Z0-9]{7})[-‑]?$/.exec(partial)
  if (partialMatch) {
    const [, domain, variant] = partialMatch
    const variantInfo = PRODUCT_VARIANTS[variant]
    if (variantInfo) {
      // Suggest relevant system trigrams based on variant type
      const relevantSystems = Object.entries(SYSTEM_TRIGRAMS)
        .filter(([, info]) => {
          // Simple heuristic: match technology families to variant types
          if (variant.includes('Q') && info.family.includes('Quantum')) return true
          if (variant.includes('EVT') && info.family.includes('Electric')) return true
          if (variant.includes('HYB') && info.family.includes('Hybrid')) return true
          return info.common // Show common systems for all variants
        })
        .slice(0, 5)
      
      relevantSystems.forEach(([trigram]) => {
        suggestions.push(`${domain}-${variant}-${trigram}-[`)
      })
    }
  }
  
  return suggestions
}

/**
 * Extract all UTCS codes from text content
 */
export function extractUTCSCodes(content: string): string[] {
  const pattern = /[0-9]{6}[-‑][A-Z0-9]{7}[-‑][A-Z]{3}[-‑]\[[^\]]+\]/g
  return content.match(pattern) || []
}

/**
 * Validate all UTCS codes found in content
 */
export function validateContentUTCS(content: string): {
  codes: string[]
  results: UTCSValidationResult[]
  hasErrors: boolean
} {
  const codes = extractUTCSCodes(content)
  const results = codes.map(validateUTCS)
  const hasErrors = results.some(r => !r.isValid)
  
  return { codes, results, hasErrors }
}

/**
 * Format validation results for display
 */
export function formatValidationResult(result: UTCSValidationResult): string {
  let output = ''
  
  if (result.isValid) {
    output += '✅ Valid UTCS code\n'
    if (result.parsed) {
      output += `   Domain: ${result.parsed.utcs} (${DOMAIN_TABLE[result.parsed.utcs] || 'Unknown'})\n`
      output += `   Variant: ${result.parsed.variant} (${PRODUCT_VARIANTS[result.parsed.variant]?.description || 'Unknown'})\n`
      output += `   System: ${result.parsed.system} (${SYSTEM_TRIGRAMS[result.parsed.system]?.family || 'Unknown'})\n`
      output += `   Installation: [${result.parsed.installation}]\n`
    }
  } else {
    output += '❌ Invalid UTCS code\n'
  }
  
  if (result.errors.length > 0) {
    output += '\nErrors:\n'
    result.errors.forEach(error => {
      output += `   • ${error}\n`
    })
  }
  
  if (result.warnings.length > 0) {
    output += '\nWarnings:\n'
    result.warnings.forEach(warning => {
      output += `   ⚠ ${warning}\n`
    })
  }
  
  if (result.suggestions.length > 0) {
    output += '\nSuggestions:\n'
    result.suggestions.forEach(suggestion => {
      output += `   💡 ${suggestion}\n`
    })
  }
  
  return output
}

/**
 * Check if a code follows the immutability principle
 */
export function checkCodeImmutability(oldCode: string, newCode: string): {
  isCompliant: boolean
  violations: string[]
} {
  const oldParsed = parseUTCS(oldCode)
  const newParsed = parseUTCS(newCode)
  const violations: string[] = []
  
  if (!oldParsed || !newParsed) {
    return { isCompliant: false, violations: ['Unable to parse one or both codes'] }
  }
  
  // Blocks A-C should not change after initial release
  if (oldParsed.utcs !== newParsed.utcs) {
    violations.push('UTCS classification (Block A) changed - this violates immutability principle')
  }
  
  if (oldParsed.variant !== newParsed.variant) {
    violations.push('Product variant (Block B) changed - this violates immutability principle')
  }
  
  if (oldParsed.system !== newParsed.system) {
    violations.push('System/Technology ID (Block C) changed - this violates immutability principle')
  }
  
  // Only installation (Block D) can change
  return {
    isCompliant: violations.length === 0,
    violations
  }
}