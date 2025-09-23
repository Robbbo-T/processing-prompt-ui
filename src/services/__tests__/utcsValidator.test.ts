/**
 * Unit tests for UTCS Validator
 */

import { describe, it, expect } from 'vitest'
import { 
  parseUTCS, 
  validateUTCS, 
  generateUTCSDescription
} from '../utcsValidator'

describe('UTCS Validator', () => {
  describe('parseUTCS', () => {
    it('should parse valid UTCS codes correctly', () => {
      const code = '090101-BWBQ100-QNS-[1-10,17,54]'
      const result = parseUTCS(code)
      
      expect(result).toEqual({
        utcs: '090101',
        variant: 'BWBQ100',
        system: 'QNS',
        installation: '1-10,17,54',
        fullCode: code
      })
    })
    
    it('should handle different installation formats', () => {
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
        '090101-BWBQ100-QNS',  // missing installation
        '090101-BWBQ100-QNS-1-10',  // installation not in brackets
        'ABCDEF-BWBQ100-QNS-[ALL]',  // non-numeric UTCS
        '090101-BWBQ10-QNS-[ALL]',  // variant too short
        '090101-BWBQ1000-QNS-[ALL]',  // variant too long
        '090101-BWBQ100-QN-[ALL]',  // system too short
        '090101-BWBQ100-QNSX-[ALL]',  // system too long
      ]
      
      invalidCodes.forEach(code => {
        expect(parseUTCS(code)).toBeNull()
      })
    })
  })
  
  describe('validateUTCS', () => {
    it('should validate correct UTCS codes', () => {
      const result = validateUTCS('090101-BWBQ100-QNS-[1-10,17,54]')
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.parsed).toBeDefined()
    })
    
    it('should reject malformed codes', () => {
      const result = validateUTCS('invalid-code')
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })
    
    it('should reject codes with invalid UTCS classification', () => {
      const result = validateUTCS('ABCDEF-BWBQ100-QNS-[ALL]')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('UTCS classification must be exactly 6 digits')
    })
    
    it('should reject codes with invalid product variant', () => {
      const result = validateUTCS('090101-BWBQ10-QNS-[ALL]')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Product variant must be exactly 7 uppercase alphanumeric characters')
    })
    
    it('should reject codes with invalid system trigram', () => {
      const result = validateUTCS('090101-BWBQ100-Q-[ALL]')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('System/Technology ID must be exactly 3 uppercase letters')
    })
    
    it('should handle empty codes', () => {
      const result = validateUTCS('')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('UTCS code cannot be empty')
    })
  })
  
  describe('generateUTCSDescription', () => {
    it('should generate descriptions for known codes', () => {
      const parsed = {
        utcs: '090101',
        variant: 'BWBQ100',
        system: 'QNS',
        installation: '[1-10]',
        fullCode: '090101-BWBQ100-QNS-[1-10]'
      }
      
      const description = generateUTCSDescription(parsed)
      expect(description).toContain('Quantum Navigation System')
      expect(description).toContain('Blended Wing Body Quantum 100')
      expect(description).toContain('Quantum Navigation Systems')
    })
    
    it('should handle unknown codes gracefully', () => {
      const parsed = {
        utcs: '999999',
        variant: 'UNKNOWN',
        system: 'UNK',
        installation: '[ALL]',
        fullCode: '999999-UNKNOWN-UNK-[ALL]'
      }
      
      const description = generateUTCSDescription(parsed)
      expect(description).toContain('UNK')
      expect(description).toContain('UNKNOWN')
      expect(description).toContain('UTCS 999999')
    })
  })
})