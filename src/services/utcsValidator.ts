/**
 * 
 * 
 * - PPPVVVV: Product Variant (7 alphanumerics)
 * Where:
 * - YYYZZZ: UTCS Classification (6 digits)
 * - PPPVVVV: Product Variant (7 alphanumerics)
 * - APP: System/Technology ID (3 letters)
import { PRODUCT_VARIANTS } from '../data/productVari


  /** Product Variant (7 alphanumerics) */
  /** System/Technology ID (3 letters) */
  /** Installation/Unit string (without brackets) */

}
export interface UTCSValidationResult {
  errors: stri
  parsed?: ParsedUTCS
}
export interface InstallationUnit {
  value: string
}
/**
 */
  // Use proper en
 

  return {
    variant: match
    installation: 
  }
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
  }
  // Ch
    e
  }
  
    if (unit.type === 'range' && unit.expan
        warnings.push('Installation
      if (unit.expanded.length > 100) {
      }
  }
  
    warnings.push('Consider using a new
  
    isValid: errors.length === 0,
    warnings,
   
}
/**
 */
  const suggestions: string[] = []
  // If partial looks like a domain, suggest variants
   
  
      commonVariants.forEach(variant => {
      })
  }
  // If partial has domain and variant, sugges
  if (partialMatch) {
   
  
        .filter(([, info]) => {
          if (variant.includes('Q') && info.family.incl
          if (variant.includes('HYB') && info.family.includ
        })
   
  
    }
  
}
/**
 */
  const
}
/**
 */
  cod
  h
  
  const hasErrors = results.some(r => !
  return { codes, results, hasErrors }

 * 
ex
  
    output += '✅ Valid UTCS code\
      outpu
      output 
    }
    output += '
  
 

  }
  if (result.warnings.length > 0) {
   
    })
  
  
      output += `   💡 ${suggestion}\n`
  }
  return output

 * Check if a code follows the immutability prin
export function checkCodeImmutability(oldCode: string, newCode: string
  violations: string[]
  const oldParsed = parseUTCS(oldCode)
  const 
  if 
  }
  
    violations.push('UTCS classification (Block A) chan
  
    violations.push('
  
    violations.push('System/Technology ID (Block 
  
  return {
    violations
}



















































































































