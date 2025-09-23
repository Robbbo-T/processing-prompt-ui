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
    const domain = UTCS_DOMAINS[utcs.substring(0, 3) as keyof typeof UTCS_DOMAINS] || 'Unknown Domain'
    const variantDesc = PRODUCT_VARIANTS.find(v => v.code === variant)?.description || 'Unknown Product'
    const systemDesc = SYSTEM_TRIGRAMS.find(s => s.code === system)?.description || 'Unknown System'
    
    return `${domain} - ${variantDesc} - ${systemDesc}`
  }

  const validateCode = async (code: string) => {
    setIsValidating(true)
    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const result = parseUTCSCode(code)
    setValidationResult(result)
    
    if (result.isValid && onValidCode) {
      onValidCode(code, result)
    }
    
    setIsValidating(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSampleCode = (sampleCode: string) => {
    setInputCode(sampleCode)
    validateCode(sampleCode)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash size={24} />
            UTCS Code Validator
          </CardTitle>
          <CardDescription>
            Validate AMPEL360 Universal Technology Classification System codes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter UTCS code (e.g., 090101-BWBQ100-QNS-[1-10,17,54])"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={() => validateCode(inputCode)}
              disabled={!inputCode || isValidating}
            >
              {isValidating ? 'Validating...' : 'Validate'}
            </Button>
          </div>

          {isValidating && (
            <Progress value={50} className="w-full" />
          )}

          {validationResult && (
            <Alert className={validationResult.isValid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              <div className="flex items-start gap-2">
                {validationResult.isValid ? (
                  <CheckCircle size={20} className="text-green-600 mt-0.5" />
                ) : (
                  <Warning size={20} className="text-red-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <AlertDescription>
                    {validationResult.isValid ? (
                      <div className="space-y-2">
                        <div className="font-medium text-green-800">Valid UTCS Code</div>
                        <div className="text-sm text-green-700">
                          {validationResult.description}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(validationResult.code)}
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? 'Copied' : 'Copy'}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="font-medium text-red-800">Invalid UTCS Code</div>
                        <ul className="text-sm text-red-700 list-disc list-inside">
                          {validationResult.errors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          )}
        </CardContent>
      </Card>

      {showBrowser && (
        <Tabs defaultValue="samples" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="samples">Sample Codes</TabsTrigger>
            <TabsTrigger value="domains">UTCS Domains</TabsTrigger>
            <TabsTrigger value="variants">Product Variants</TabsTrigger>
          </TabsList>

          <TabsContent value="samples" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sample UTCS Codes</CardTitle>
                <CardDescription>Click any sample code to validate it</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {sampleUTCSCodes.map((code, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleSampleCode(code)}
                    >
                      <code className="text-sm font-mono">{code}</code>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="domains" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">UTCS Domain Catalog</CardTitle>
                <CardDescription>Available technology domains</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {Object.entries(UTCS_DOMAINS).map(([code, description]) => (
                    <div key={code} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Badge variant="outline" className="font-mono">{code}</Badge>
                      <span className="text-sm">{description}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="variants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Variant Catalog</CardTitle>
                <CardDescription>Available product variants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {PRODUCT_VARIANTS.map((variant, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Badge variant="outline" className="font-mono">{variant.code}</Badge>
                      <span className="text-sm">{variant.description}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}