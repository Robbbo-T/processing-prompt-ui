import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Check, X, AlertTriangle, Info, Lightbulb, Copy, Code, 
  Hash, Compass, Database, Cpu, Zap, HelpCircle, ArrowRight, BookOpen,
  CheckCircle, XCircle, AlertCircle, Clock, Target, Layers
} from '@phosphor-icons/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { 
  validateUTCS, 
  parseUTCS, 
  suggestUTCS, 
  extractUTCSCodes, 
  validateContentUTCS,
  formatValidationResult,
  type UTCSValidationResult,
  type ParsedUTCS
} from '@/services/utcsValidator'
import { DOMAIN_TABLE, searchDomains, getDomainInfo } from '@/data/utcsDomains'
import { PRODUCT_VARIANTS, searchVariants, getVariantsByType } from '@/data/productVariants'
import { SYSTEM_TRIGRAMS, searchTrigrams, suggestTrigramsForVariant } from '@/data/systemTrigrams'

interface UTCSValidatorProps {
  initialCode?: string
  onValidCode?: (code: string, parsed: ParsedUTCS) => void
  showBrowser?: boolean
  compact?: boolean
}

export function UTCSValidator({ 
  initialCode = '', 
  onValidCode, 
  showBrowser = true, 
  compact = false 
}: UTCSValidatorProps) {
  const [currentCode, setCurrentCode] = useState(initialCode)
  const [validationResult, setValidationResult] = useState<UTCSValidationResult | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showDetails, setShowDetails] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [contentToScan, setContentToScan] = useState('')
  const [scanResults, setScanResults] = useState<any>(null)

  // Browser states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDomain, setSelectedDomain] = useState('')
  const [selectedVariant, setSelectedVariant] = useState('')
  const [selectedSystem, setSelectedSystem] = useState('')
  const [activeTab, setActiveTab] = useState('validator')

  useEffect(() => {
    if (currentCode.trim()) {
      setIsValidating(true)
      const result = validateUTCS(currentCode)
      setValidationResult(result)
      
      if (result.isValid && result.parsed && onValidCode) {
        onValidCode(currentCode, result.parsed)
      }
      
      // Generate suggestions for partial codes
      const partialSuggestions = suggestUTCS(currentCode)
      setSuggestions(partialSuggestions)
      
      setIsValidating(false)
    } else {
      setValidationResult(null)
      setSuggestions([])
    }
  }, [currentCode, onValidCode])

  const handleCodeChange = (value: string) => {
    setCurrentCode(value)
  }

  const handleCopyCode = async () => {
    if (currentCode) {
      try {
        await navigator.clipboard.writeText(currentCode)
        toast.success('UTCS code copied to clipboard')
      } catch (error) {
        toast.error('Failed to copy to clipboard')
      }
    }
  }

  const handleScanContent = () => {
    if (contentToScan.trim()) {
      const results = validateContentUTCS(contentToScan)
      setScanResults(results)
    }
  }

  const buildCodeFromBrowser = () => {
    if (selectedDomain && selectedVariant && selectedSystem) {
      const newCode = `${selectedDomain}‑${selectedVariant}‑${selectedSystem}‑[ALL]`
      setCurrentCode(newCode)
      setActiveTab('validator')
      toast.success('UTCS code generated from browser')
    }
  }

  const getValidationIcon = (result: UTCSValidationResult | null) => {
    if (!result) return <Hash className="text-muted-foreground" size={20} />
    if (result.isValid) return <CheckCircle className="text-green-500" size={20} />
    return <XCircle className="text-red-500" size={20} />
  }

  const getValidationColor = (result: UTCSValidationResult | null) => {
    if (!result) return 'border-border'
    if (result.isValid) return 'border-green-200 bg-green-50'
    return 'border-red-200 bg-red-50'
  }

  if (compact) {
    return (
      <div className="space-y-3">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {getValidationIcon(validationResult)}
          </div>
          <Input
            value={currentCode}
            onChange={(e) => handleCodeChange(e.target.value)}
            placeholder="Enter UTCS code (e.g., 090101‑BWBQ100‑QNS‑[ALL])"
            className={`pl-10 font-mono text-sm ${getValidationColor(validationResult)}`}
          />
          {validationResult?.isValid && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={handleCopyCode}
            >
              <Copy size={14} />
            </Button>
          )}
        </div>
        
        {validationResult && !validationResult.isValid && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="text-sm text-red-800">
              {validationResult.errors.slice(0, 2).map((error, index) => (
                <div key={index} className="flex items-start gap-2">
                  <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                  {error}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash size={24} />
            UTCS Code Validator
            <Badge variant="secondary">v12.3.1</Badge>
          </CardTitle>
          <CardDescription>
            Validate AMPEL360 UTCS-Optimized Identification Codes according to the standard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="validator">Validator</TabsTrigger>
              <TabsTrigger value="browser">Code Builder</TabsTrigger>
              <TabsTrigger value="scanner">Content Scanner</TabsTrigger>
            </TabsList>

            <TabsContent value="validator" className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="utcs-code">UTCS Code</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    {isValidating ? (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      getValidationIcon(validationResult)
                    )}
                  </div>
                  <Input
                    id="utcs-code"
                    value={currentCode}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    placeholder="e.g., 090101‑BWBQ100‑QNS‑[1‑10,17,54]"
                    className={`pl-10 font-mono ${getValidationColor(validationResult)}`}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    {validationResult?.isValid && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyCode}
                      >
                        <Copy size={16} />
                      </Button>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <HelpCircle size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>UTCS Code Format</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
                            YYYZZZ‑PPPVVVV‑APP‑[INS]
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Block A - UTCS (YYYZZZ)</h4>
                              <p className="text-sm text-muted-foreground">6-digit domain and category classification</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Block B - Variant (PPPVVVV)</h4>
                              <p className="text-sm text-muted-foreground">7-character product variant code</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Block C - System (APP)</h4>
                              <p className="text-sm text-muted-foreground">3-letter technology trigram</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Block D - Installation ([INS])</h4>
                              <p className="text-sm text-muted-foreground">Unit specification in brackets</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

              {/* Validation Results */}
              {validationResult && (
                <Card className={validationResult.isValid ? 'border-green-200' : 'border-red-200'}>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      {/* Status Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {validationResult.isValid ? (
                            <CheckCircle className="text-green-500" size={20} />
                          ) : (
                            <XCircle className="text-red-500" size={20} />
                          )}
                          <span className={`font-medium ${validationResult.isValid ? 'text-green-800' : 'text-red-800'}`}>
                            {validationResult.isValid ? 'Valid UTCS Code' : 'Invalid UTCS Code'}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowDetails(!showDetails)}
                        >
                          {showDetails ? 'Hide Details' : 'Show Details'}
                        </Button>
                      </div>

                      {/* Parsed Information */}
                      {validationResult.parsed && (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          <div>
                            <Label className="text-xs text-muted-foreground">Domain</Label>
                            <div className="text-sm font-mono">{validationResult.parsed.utcs}</div>
                            <div className="text-xs text-muted-foreground">
                              {DOMAIN_TABLE[validationResult.parsed.utcs] || 'Unknown'}
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Variant</Label>
                            <div className="text-sm font-mono">{validationResult.parsed.variant}</div>
                            <div className="text-xs text-muted-foreground">
                              {PRODUCT_VARIANTS[validationResult.parsed.variant]?.name || 'Unknown'}
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">System</Label>
                            <div className="text-sm font-mono">{validationResult.parsed.system}</div>
                            <div className="text-xs text-muted-foreground">
                              {SYSTEM_TRIGRAMS[validationResult.parsed.system]?.name || 'Unknown'}
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Installation</Label>
                            <div className="text-sm font-mono">[{validationResult.parsed.installation}]</div>
                          </div>
                        </div>
                      )}

                      {/* Errors */}
                      {validationResult.errors.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-red-800">Errors</Label>
                          {validationResult.errors.map((error, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm text-red-700 bg-red-50 p-2 rounded">
                              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                              {error}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Warnings */}
                      {validationResult.warnings.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-yellow-800">Warnings</Label>
                          {validationResult.warnings.map((warning, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
                              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                              {warning}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Suggestions */}
                      {validationResult.suggestions.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-blue-800">Suggestions</Label>
                          {validationResult.suggestions.map((suggestion, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                              <Lightbulb size={16} className="mt-0.5 flex-shrink-0" />
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Detailed Information */}
                      {showDetails && (
                        <div className="pt-3 border-t">
                          <pre className="text-xs bg-muted p-3 rounded overflow-auto">
                            {formatValidationResult(validationResult)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 && !validationResult?.isValid && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Code Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {suggestions.slice(0, 5).map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start font-mono text-sm"
                          onClick={() => setCurrentCode(suggestion)}
                        >
                          <ArrowRight size={16} className="mr-2" />
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="browser" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Domain Selection */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Database size={20} />
                      UTCS Domain
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Input
                        placeholder="Search domains..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <ScrollArea className="h-40">
                        <div className="space-y-1">
                          {Object.entries(DOMAIN_TABLE)
                            .filter(([code, desc]) => 
                              code.includes(searchQuery) || 
                              desc.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .slice(0, 20)
                            .map(([code, description]) => (
                              <Button
                                key={code}
                                variant={selectedDomain === code ? "default" : "ghost"}
                                size="sm"
                                className="w-full justify-start text-left"
                                onClick={() => setSelectedDomain(code)}
                              >
                                <div>
                                  <div className="font-mono text-xs">{code}</div>
                                  <div className="text-xs text-muted-foreground truncate">
                                    {description}
                                  </div>
                                </div>
                              </Button>
                            ))
                          }
                        </div>
                      </ScrollArea>
                    </div>
                  </CardContent>
                </Card>

                {/* Variant Selection */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Layers size={20} />
                      Product Variant
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-48">
                      <div className="space-y-1">
                        {Object.values(PRODUCT_VARIANTS)
                          .filter(variant => variant.status === 'active' || variant.status === 'development')
                          .slice(0, 15)
                          .map((variant) => (
                            <Button
                              key={variant.code}
                              variant={selectedVariant === variant.code ? "default" : "ghost"}
                              size="sm"
                              className="w-full justify-start text-left"
                              onClick={() => setSelectedVariant(variant.code)}
                            >
                              <div>
                                <div className="font-mono text-xs">{variant.code}</div>
                                <div className="text-xs text-muted-foreground truncate">
                                  {variant.name}
                                </div>
                              </div>
                            </Button>
                          ))
                        }
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* System Selection */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Cpu size={20} />
                      System Trigram
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-48">
                      <div className="space-y-1">
                        {(selectedVariant ? 
                          suggestTrigramsForVariant(selectedVariant) : 
                          Object.values(SYSTEM_TRIGRAMS).filter(t => t.common)
                        ).slice(0, 15).map((trigram) => (
                          <Button
                            key={trigram.code}
                            variant={selectedSystem === trigram.code ? "default" : "ghost"}
                            size="sm"
                            className="w-full justify-start text-left"
                            onClick={() => setSelectedSystem(trigram.code)}
                          >
                            <div>
                              <div className="font-mono text-xs">{trigram.code}</div>
                              <div className="text-xs text-muted-foreground truncate">
                                {trigram.name}
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Generate Code Button */}
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {selectedDomain && selectedVariant && selectedSystem ? (
                        <span className="font-mono">
                          {selectedDomain}‑{selectedVariant}‑{selectedSystem}‑[ALL]
                        </span>
                      ) : (
                        'Select domain, variant, and system to generate code'
                      )}
                    </div>
                    <Button
                      onClick={buildCodeFromBrowser}
                      disabled={!selectedDomain || !selectedVariant || !selectedSystem}
                    >
                      <Zap size={16} className="mr-2" />
                      Generate Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scanner" className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="content-scan">Content to Scan</Label>
                <Textarea
                  id="content-scan"
                  value={contentToScan}
                  onChange={(e) => setContentToScan(e.target.value)}
                  placeholder="Paste content containing UTCS codes to validate them..."
                  rows={6}
                  className="font-mono text-sm"
                />
                <Button onClick={handleScanContent} disabled={!contentToScan.trim()}>
                  <Search size={16} className="mr-2" />
                  Scan Content
                </Button>
              </div>

              {scanResults && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target size={20} />
                      Scan Results
                      <Badge variant={scanResults.hasErrors ? "destructive" : "secondary"}>
                        {scanResults.codes.length} codes found
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {scanResults.codes.map((code: string, index: number) => {
                        const result = scanResults.results[index]
                        return (
                          <div
                            key={index}
                            className={`p-3 rounded border ${
                              result.isValid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {result.isValid ? (
                                <CheckCircle className="text-green-500" size={16} />
                              ) : (
                                <XCircle className="text-red-500" size={16} />
                              )}
                              <code className="text-sm font-mono">{code}</code>
                            </div>
                            {!result.isValid && (
                              <div className="text-sm text-red-700">
                                {result.errors.slice(0, 2).join(', ')}
                              </div>
                            )}
                          </div>
                        )
                      })}
                      
                      {scanResults.codes.length === 0 && (
                        <div className="text-center py-6 text-muted-foreground">
                          No UTCS codes found in the content
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default UTCSValidator