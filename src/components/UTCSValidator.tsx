import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Hash, CheckCircle, AlertCircle } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

interface UTCSValidatorProps {
  showBrowser?: boolean
  onValidCode?: (code: string, parsed: any) => void
}

export default function UTCSValidator({ showBrowser = false, onValidCode }: UTCSValidatorProps) {
  const [utcsCode, setUtcsCode] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [parsedData, setParsedData] = useState<any>(null)

  const validateUTCS = (code: string) => {
    // Simple UTCS validation pattern: YYYZZZ-PPPVVVV-APP-[INS]
    const utcsPattern = /^([0-9]{6})-([A-Z0-9]{7})-([A-Z]{3})-\[(.+)\]$/
    const match = utcsPattern.exec(code)
    
    if (match) {
      const parsed = {
        domain: match[1],
        variant: match[2],
        system: match[3],
        installation: match[4]
      }
      setIsValid(true)
      setParsedData(parsed)
      onValidCode?.(code, parsed)
      toast.success('Valid UTCS code format')
    } else {
      setIsValid(false)
      setParsedData(null)
      toast.error('Invalid UTCS code format')
    }
  }

  const handleValidate = () => {
    if (utcsCode.trim()) {
      validateUTCS(utcsCode.trim())
    }
  }

  const handleGenerateExample = () => {
    const exampleCode = '090101-BWBQ100-QNS-[1-10,17,54]'
    setUtcsCode(exampleCode)
    validateUTCS(exampleCode)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash size={20} />
          UTCS Code Validator
        </CardTitle>
        <CardDescription>
          Validate AMPEL360 Universal Technology Classification System codes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="e.g., 090101-BWBQ100-QNS-[1-10,17,54]"
              value={utcsCode}
              onChange={(e) => {
                setUtcsCode(e.target.value)
                setIsValid(null)
                setParsedData(null)
              }}
              className="font-mono"
            />
            <Button onClick={handleValidate} disabled={!utcsCode.trim()}>
              Validate
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleGenerateExample}>
              Load Example
            </Button>
            {showBrowser && (
              <Button variant="outline" size="sm">
                Browse Catalog
              </Button>
            )}
          </div>
        </div>

        {isValid !== null && (
          <div className={`flex items-center gap-2 p-3 rounded-lg ${
            isValid ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {isValid ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            <span className="text-sm font-medium">
              {isValid ? 'Valid UTCS Code' : 'Invalid UTCS Code Format'}
            </span>
          </div>
        )}

        {parsedData && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Parsed Components:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Domain:</span>
                <Badge variant="outline" className="ml-2">{parsedData.domain}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Variant:</span>
                <Badge variant="outline" className="ml-2">{parsedData.variant}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">System:</span>
                <Badge variant="outline" className="ml-2">{parsedData.system}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Installation:</span>
                <Badge variant="outline" className="ml-2">{parsedData.installation}</Badge>
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <p><strong>Format:</strong> YYYZZZ-PPPVVVV-APP-[INS]</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>YYYZZZ: 6-digit UTCS Domain/Category</li>
            <li>PPPVVVV: 7-character Product Variant</li>
            <li>APP: 3-letter System/Technology ID</li>
            <li>[INS]: Installation/Unit specification in brackets</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}