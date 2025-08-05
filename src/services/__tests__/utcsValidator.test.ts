/**
 * Unit tests for UTCS Validator
 */

import { describe, it, expect } from 'vitest'
import { 
  parseUTCS, 
  validateUTCS, 
  parseInstallation, 
  suggestUTCS,
  extractUTCSCodes,
  validateContentUTCS,
  checkCodeImmutability
} from '../src/services/utcsValidator'

describe('UTCS Validator', () => {
  describe('parseUTCS', () => {
    it('should parse valid UTCS codes correctly', () => {
      const code = '090101‑BWBQ100‑QNS‑[1‑10,17,54]'
      const result = parseUTCS(code)
      
      expect(result).toEqual({
        utcs: '090101',
        variant: 'BWBQ100',
        system: 'QNS',
        installation: '1‑10,17,54',
        fullCode: code
      })
    })
    
    it('should handle regular hyphens as well as en-dash', () => {
      const code = '090101-BWBQ100-QNS-[ALL]'
      const result = parseUTCS(code)
      
      expect(result).toEqual({
        utcs: '090101',
        variant: 'BWBQ100',
        system: 'QNS',
        installation: 'ALL',
        fullCode: code
      })
    })
    
    it('should return null for invalid formats', () => {
      const invalidCodes = [
        'invalid',
        '12345-INVALID',
        '090101‑BWBQ100‑QNS',  // missing installation
        '090101‑BWBQ100‑QNS‑1‑10',  // installation not in brackets
        'ABCDEF‑BWBQ100‑QNS‑[ALL]',  // non-numeric UTCS
        '090101‑BWBQ10‑QNS‑[ALL]',  // variant too short
        '090101‑BWBQ1000‑QNS‑[ALL]',  // variant too long
        '090101‑BWBQ100‑QN‑[ALL]',  // system too short
        '090101‑BWBQ100‑QNSX‑[ALL]',  // system too long
      ]
      
      invalidCodes.forEach(code => {
        expect(parseUTCS(code)).toBeNull()
      })
    })
  })
  
  describe('parseInstallation', () => {
    it('should parse special installation values', () => {
      expect(parseInstallation('ALL')).toEqual([
        { type: 'special', value: 'ALL' }
      ])
      
      expect(parseInstallation('STD')).toEqual([
        { type: 'special', value: 'STD' }
      ])
    })
    
    it('should parse single units', () => {
      expect(parseInstallation('17')).toEqual([
        { type: 'single', value: '17', expanded: [17] }
      ])
    })
    
    it('should parse ranges', () => {
      expect(parseInstallation('1‑10')).toEqual([
        { type: 'range', value: '1‑10', expanded: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
      ])
      
      expect(parseInstallation('5-8')).toEqual([
        { type: 'range', value: '5-8', expanded: [5, 6, 7, 8] }
      ])
    })
    
    it('should parse complex installations', () => {
      const result = parseInstallation('1‑10,17,54')
      expect(result).toHaveLength(3)
      expect(result[0]).toEqual({
        type: 'range', 
        value: '1‑10', 
        expanded: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      })
      expect(result[1]).toEqual({
        type: 'single', 
        value: '17', 
        expanded: [17]
      })
      expect(result[2]).toEqual({
        type: 'single', 
        value: '54', 
        expanded: [54]
      })
    })
  })
  
  describe('validateUTCS', () => {
    it('should validate correct UTCS codes', () => {
      const result = validateUTCS('090101‑BWBQ100‑QNS‑[1‑10,17,54]')
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.parsed).toBeDefined()
    })
    
    it('should reject unknown UTCS domains', () => {
      const result = validateUTCS('999999‑BWBQ100‑QNS‑[ALL]')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Unknown UTCS domain/category: 999999')
    })
    
    it('should reject unknown product variants', () => {
      const result = validateUTCS('090101‑INVALID‑QNS‑[ALL]')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Unknown product variant: INVALID')
    })
    
    it('should reject unregistered system trigrams', () => {
      const result = validateUTCS('090101‑BWBQ100‑XYZ‑[ALL]')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Unregistered system/technology trigram: XYZ')
    })
    
    it('should provide warnings for questionable practices', () => {
      // Test with large range
      const result = validateUTCS('090101‑BWBQ100‑QNS‑[1‑150]')
      expect(result.isValid).toBe(true)
      expect(result.warnings).toContain('Large installation range detected (150 units)')
    })
    
    it('should handle empty codes', () => {
      const result = validateUTCS('')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('UTCS code cannot be empty')
    })
  })
  
  describe('suggestUTCS', () => {
    it('should suggest variants for complete domains', () => {
      const suggestions = suggestUTCS('090101')
      expect(suggestions.length).toBeGreaterThan(0)
      expect(suggestions[0]).toMatch(/^090101‑[A-Z0-9]{7}‑$/)
    })
    
    it('should suggest systems for domain-variant combinations', () => {
      const suggestions = suggestUTCS('090101‑BWBQ100‑')
      expect(suggestions.length).toBeGreaterThan(0)
      expect(suggestions[0]).toMatch(/^090101‑BWBQ100‑[A-Z]{3}‑\[$/)
    })
  })
  
  describe('extractUTCSCodes', () => {
    it('should extract UTCS codes from text content', () => {
      const content = `
        This document references the following systems:
        - Quantum navigation: 090101‑BWBQ100‑QNS‑[1‑10,17,54]
        - Electric propulsion: 431210‑HYBE180‑EPS‑[ALL]
        Some invalid code: 123-INVALID-XYZ-[1]
      `
      
      const codes = extractUTCSCodes(content)
      expect(codes).toEqual([
        '090101‑BWBQ100‑QNS‑[1‑10,17,54]',
        '431210‑HYBE180‑EPS‑[ALL]'
      ])
    })
  })
  
  describe('validateContentUTCS', () => {
    it('should validate all codes in content', () => {
      const content = `
        Valid code: 090101‑BWBQ100‑QNS‑[ALL]
        Invalid code: 999999‑INVALID‑XYZ‑[ALL]
      `
      
      const result = validateContentUTCS(content)
      expect(result.codes).toHaveLength(2)
      expect(result.hasErrors).toBe(true)
      expect(result.results[0].isValid).toBe(true)
      expect(result.results[1].isValid).toBe(false)
    })
  })
  
  describe('checkCodeImmutability', () => {
    it('should allow changes only to installation block', () => {
      const oldCode = '090101‑BWBQ100‑QNS‑[1]'
      const newCode = '090101‑BWBQ100‑QNS‑[1‑10]'
      
      const result = checkCodeImmutability(oldCode, newCode)
      expect(result.isCompliant).toBe(true)
      expect(result.violations).toHaveLength(0)
    })
    
    it('should reject changes to UTCS classification', () => {
      const oldCode = '090101‑BWBQ100‑QNS‑[1]'
      const newCode = '090102‑BWBQ100‑QNS‑[1]'
      
      const result = checkCodeImmutability(oldCode, newCode)
      expect(result.isCompliant).toBe(false)
      expect(result.violations).toContain('UTCS classification (Block A) changed - this violates immutability principle')
    })
    
    it('should reject changes to product variant', () => {
      const oldCode = '090101‑BWBQ100‑QNS‑[1]'
      const newCode = '090101‑BWBQ250‑QNS‑[1]'
      
      const result = checkCodeImmutability(oldCode, newCode)
      expect(result.isCompliant).toBe(false)
      expect(result.violations).toContain('Product variant (Block B) changed - this violates immutability principle')
    })
    
    it('should reject changes to system trigram', () => {
      const oldCode = '090101‑BWBQ100‑QNS‑[1]'
      const newCode = '090101‑BWBQ100‑EPS‑[1]'
      
      const result = checkCodeImmutability(oldCode, newCode)
      expect(result.isCompliant).toBe(false)
      expect(result.violations).toContain('System/Technology ID (Block C) changed - this violates immutability principle')
    })
  })
  
  describe('edge cases and error handling', () => {
    it('should handle malformed installation ranges', () => {
      const result = validateUTCS('090101‑BWBQ100‑QNS‑[10‑5]')  // invalid range
      expect(result.isValid).toBe(true)  // Parser should handle this gracefully
    })
    
    it('should handle mixed delimiters', () => {
      const result = validateUTCS('090101-BWBQ100‑QNS-[ALL]')  // mixed hyphens
      expect(result.parsed).toBeDefined()
    })
    
    it('should validate installation character restrictions', () => {
      const result = validateUTCS('090101‑BWBQ100‑QNS‑[1@2]')  // invalid character
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Installation contains invalid characters')
    })
  })
})