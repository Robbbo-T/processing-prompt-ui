import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckCircle, Warning, Info, Hash, Database, Eye, Copy, Check, BookOpen, FileText } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface UTCSCode {
  code: string
  utcs: string
  variant: string
  system: string
  installation: string
  description?: string
  isValid: boolean
  errors: string[]
}

interface UTCSValidatorProps {
  showBrowser?: boolean
  onValidCode?: (code: string, parsed: UTCSCode) => void
}

const UTCS_DOMAINS = {
  "000": "Aero - General Aircraft Systems",
  "024": "Aero - Electrical Power Systems", 
  "027": "Aero - Flight Control Systems",
  "090": "Quantum - Navigation Systems",
  "100": "Space - General Space Systems",
  "171": "Space - Thermal Protection",
  "310": "Digital - Flight Management",
  "431": "Energy - Electric Propulsion"
}

const PRODUCT_VARIANTS = [
  { code: "BWBQ100", description: "Blended Wing Body Quantum 100 (120-180 pax)" },
  { code: "BWBQ250", description: "Blended Wing Body Quantum 250 (220-300 pax)" },
  { code: "EVTCITY", description: "Electric VTOL City (2-6 pax)" },
  { code: "HYBE180", description: "Hybrid-Electric 180 (180 pax)" }
]

const SYSTEM_TRIGRAMS = [
  { code: "QNS", description: "Quantum Navigation System" },
  { code: "EPS", description: "Electric Propulsion System" },
  { code: "FMS", description: "Flight Management System" },
  { code: "STR", description: "Primary Structure" }
]

const sampleUTCSCodes = [
  "090101-BWBQ100-QNS-[1-10,17,54]",
  "431210-HYBE180-EPS-[ALL]",
  "310015-EVTCITY-FMS-[25]",
  "024500-BWBQ100-EPS-[ALL]"
]

export default function UTCSValidator({ showBrowser = false, onValidCode }: UTCSValidatorProps) {
  const [inputCode, setInputCode] = useState('')
  const [validationResult, setValidationResult] = useState<UTCSCode | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [copied, setCopied] = useState(false)

  const parseUTCSCode = (code: string): UTCSCode => {
    const errors: string[] = []
    const parts = code.trim().split('-')
    
    if (parts.length < 4) {
      errors.push('Invalid format - expected UTCS-VARIANT-SYSTEM-INSTALLATION')
    }

    const utcs = parts[0] || ''
    const variant = parts[1] || ''
    const system = parts[2] || ''
    const installation = parts[3] || ''

    // Validate UTCS code
    if (!utcs.match(/^\d{6}$/)) {
      errors.push('UTCS code must be 6 digits')
    }

    // Validate variant
    if (!variant.match(/^[A-Z0-9]{7}$/)) {
      errors.push('Product variant must be 7 alphanumeric characters')
    }

    // Validate system
    if (!system.match(/^[A-Z]{3}$/)) {
      errors.push('System code must be 3 uppercase letters')
    }

    // Validate installation format
    if (!installation.match(/^\[.*\]$/)) {
      errors.push('Installation must be enclosed in square brackets')
    }

    const description = generateDescription(utcs, variant, system)

    return {
      code,
      utcs,
      variant,
      system,
      installation,
      description,
      isValid: errors.length === 0,
      errors
    }
  }

  const generateDescription = (utcs: string, variant: string, system: string): string => {
    const utcsDesc = UTCS_DOMAINS[utcs as keyof typeof UTCS_DOMAINS] || `Unknown UTCS ${utcs}`
    const variantDesc = PRODUCT_VARIANTS.find(v => v.code === variant)?.description || variant
    const systemDesc = SYSTEM_TRIGRAMS.find(s => s.code === system)?.description || system
    
    return `${systemDesc} for ${variantDesc} - ${utcsDesc}`
  }

  const validateCode = () => {
    if (!inputCode.trim()) {
      toast.error('Please enter a UTCS code')
      return
    }

    setIsValidating(true)
    
    // Simulate validation delay
    setTimeout(() => {
      const result = parseUTCSCode(inputCode)
      setValidationResult(result)
      setIsValidating(false)
      
      if (result.isValid) {
        toast.success('Valid UTCS code!')
        onValidCode?.(result.code, result)
      } else {
        toast.error('Invalid UTCS code format')
      }
    }, 500)
  }

  const handleSampleCode = (code: string) => {
    setInputCode(code)
    setValidationResult(null)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy')
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash size={20} />
            UTCS Code Validator
          </CardTitle>
          <CardDescription>
            Validate and parse AMPEL360 Universal Technology Classification System codes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter UTCS code (e.g., 090101-BWBQ100-QNS-[1-10,17,54])"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="font-mono"
            />
            <Button onClick={validateCode} disabled={isValidating}>
              {isValidating ? 'Validating...' : 'Validate'}
            </Button>
          </div>

          {isValidating && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Validating UTCS code...</div>
              <Progress value={65} className="w-full" />
            </div>
          )}

          {validationResult && (
            <div className="space-y-4">
              <Alert className={validationResult.isValid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                <div className="flex items-center gap-2">
                  {validationResult.isValid ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : (
                    <Warning size={16} className="text-red-600" />
                  )}
                  <AlertDescription className={validationResult.isValid ? 'text-green-800' : 'text-red-800'}>
                    {validationResult.isValid ? 'Valid UTCS code format' : 'Invalid UTCS code format'}
                  </AlertDescription>
                </div>
              </Alert>

              {validationResult.isValid ? (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-green-800">Parsed UTCS Code</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(validationResult.code)}
                        >
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                          {copied ? 'Copied!' : 'Copy'}
                        </Button>
                      </div>
                      <div className="text-sm text-green-700">{validationResult.description}</div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-green-600 font-medium">UTCS Classification:</span>
                          <div className="font-mono">{validationResult.utcs}</div>
                        </div>
                        <div>
                          <span className="text-green-600 font-medium">Product Variant:</span>
                          <div className="font-mono">{validationResult.variant}</div>
                        </div>
                        <div>
                          <span className="text-green-600 font-medium">System ID:</span>
                          <div className="font-mono">{validationResult.system}</div>
                        </div>
                        <div>
                          <span className="text-green-600 font-medium">Installation:</span>
                          <div className="font-mono">{validationResult.installation}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-red-800 mb-2">Validation Errors</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {validationResult.errors.map((error, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Warning size={14} />
                          {error}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {showBrowser && (
        <Tabs defaultValue="examples" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="reference">Reference</TabsTrigger>
            <TabsTrigger value="builder">Code Builder</TabsTrigger>
          </TabsList>

          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={20} />
                  Sample UTCS Codes
                </CardTitle>
                <CardDescription>
                  Click on any example to test validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sampleUTCSCodes.map((code, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleSampleCode(code)}
                    >
                      <code className="font-mono text-sm">{code}</code>
                      <Badge variant="outline">Click to test</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reference" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database size={20} />
                    UTCS Domain Reference
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-60">
                    <div className="space-y-2">
                      {Object.entries(UTCS_DOMAINS).map(([code, description]) => (
                        <div key={code} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                          <Badge variant="outline" className="font-mono">{code}</Badge>
                          <div className="text-sm">{description}</div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Variants</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-60">
                    <div className="space-y-2">
                      {PRODUCT_VARIANTS.map((variant) => (
                        <div key={variant.code} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                          <Badge variant="outline" className="font-mono">{variant.code}</Badge>
                          <div className="text-sm">{variant.description}</div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Trigrams</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-60">
                    <div className="space-y-2">
                      {SYSTEM_TRIGRAMS.map((system) => (
                        <div key={system.code} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                          <Badge variant="outline" className="font-mono">{system.code}</Badge>
                          <div className="text-sm">{system.description}</div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="builder" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen size={20} />
                  UTCS Code Builder
                </CardTitle>
                <CardDescription>
                  Build a valid UTCS code step by step
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Info size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Interactive Code Builder</h3>
                  <p className="text-muted-foreground mb-4">
                    Use the Driven Prompting Quiz for step-by-step UTCS code generation
                  </p>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}