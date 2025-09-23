/**
 * UTCS Validator Service
 * Validates AMPEL360 Universal Technology Classification System codes
 */

export interface ParsedUTCS {
  utcs: string          // 6 digits
  variant: string       // 7 alphanumerics  
  system: string        // 3 letters
  installation: string  // installation string
  fullCode: string
}

export interface UTCSValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  parsed?: ParsedUTCS
  suggestions?: string[]
}

/**
 * Parse a UTCS code into its component parts
 */
export function parseUTCS(code: string): ParsedUTCS | null {
  const pattern = /^([0-9]{6})-([A-Z0-9]{7})-([A-Z]{3})-\[(.+)\]$/
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
 * Validate a complete UTCS code
 */
export function validateUTCS(code: string): UTCSValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const suggestions: string[] = []
  
  if (!code || code.trim().length === 0) {
    return {
      isValid: false,
      errors: ['UTCS code cannot be empty'],
      warnings,
      suggestions
    }
  }
  
  const parsed = parseUTCS(code)
  if (!parsed) {
    return {
      isValid: false,
      errors: [
        'Invalid UTCS code format',
        'Expected format: YYYZZZ-PPPVVVV-APP-[INS]'
      ],
      warnings,
      suggestions: [
        'Use proper hyphen (-) delimiters between blocks',
        'Ensure installation is enclosed in square brackets'
      ]
    }
  }
  
  // Validate UTCS classification
  if (!/^[0-9]{6}$/.test(parsed.utcs)) {
    errors.push('UTCS classification must be exactly 6 digits')
  }
  
  // Validate product variant
  if (!/^[A-Z0-9]{7}$/.test(parsed.variant)) {
    errors.push('Product variant must be exactly 7 uppercase alphanumeric characters')
  }
  
  // Validate system trigram
  if (!/^[A-Z]{3}$/.test(parsed.system)) {
    errors.push('System/Technology ID must be exactly 3 uppercase letters')
  }
  
  // Validate installation format
  if (!parsed.installation || parsed.installation.length === 0) {
    errors.push('Installation specification cannot be empty')
  } else if (!/^[A-Z0-9,\-\s]+$/.test(parsed.installation)) {
    warnings.push('Installation contains unusual characters')
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
 * Generate a description for a UTCS code
 */
export function generateUTCSDescription(parsed: ParsedUTCS): string {
  const utcsDescriptions: Record<string, string> = {
    '090101': 'Quantum Navigation Systems',
    '431210': 'Electric Propulsion Systems',
    '310015': 'Flight Management Systems',
    '024500': 'Electrical Power Systems'
  }
  
  const variantDescriptions: Record<string, string> = {
    'BWBQ100': 'Blended Wing Body Quantum 100',
    'BWBQ250': 'Blended Wing Body Quantum 250',
    'EVTCITY': 'Electric VTOL City',
    'HYBE180': 'Hybrid-Electric 180'
  }
  
  const systemDescriptions: Record<string, string> = {
    'QNS': 'Quantum Navigation System',
    'EPS': 'Electric Propulsion System',
    'FMS': 'Flight Management System',
    'STR': 'Primary Structure'
  }
  
  const utcsDesc = utcsDescriptions[parsed.utcs] || `UTCS ${parsed.utcs}`
  const variantDesc = variantDescriptions[parsed.variant] || parsed.variant
  const systemDesc = systemDescriptions[parsed.system] || parsed.system
  
  return `${systemDesc} for ${variantDesc} - ${utcsDesc}`
}