import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { motion } from 'framer-motion'
import { Download, Robot, FolderOpen, GitBranch, Plus, Search, Filter } from '@phosphor-icons/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'

interface Template {
  id: string
  name: string
  description: string
  phase: string
  type: string
  docCode: string
  version: string
  criticality: 'Critical' | 'Essential' | 'Important' | 'Standard'
  lastModified: string
}

interface GeneratedDocument {
  id: string
  templateId: string
  name: string
  content: string
  metadata: {
    author: string
    created: string
    repository: string
    version: string
  }
}

const sampleTemplates: Template[] = [
  {
    id: '1',
    name: 'Business Strategy Plan',
    description: 'Comprehensive business strategy documentation',
    phase: 'STR',
    type: 'Planning',
    docCode: 'BSP',
    version: 'v1.0.0',
    criticality: 'Critical',
    lastModified: '2024-01-15'
  },
  {
    id: '2',
    name: 'Software Requirements Specification',
    description: 'Software-specific requirements template',
    phase: 'DES',
    type: 'Requirements',
    docCode: 'SRS',
    version: 'v1.0.0',
    criticality: 'Critical',
    lastModified: '2024-01-10'
  },
  {
    id: '3',
    name: 'Test Plan Template',
    description: 'Comprehensive testing strategy documentation',
    phase: 'TST',
    type: 'Planning',
    docCode: 'QTP',
    version: 'v1.0.0',
    criticality: 'Essential',
    lastModified: '2024-01-12'
  },
  {
    id: '4',
    name: 'Aircraft Maintenance Manual',
    description: 'Complete AMM template',
    phase: 'MNT',
    type: 'Manual',
    docCode: 'AMM',
    version: 'v1.0.0',
    criticality: 'Critical',
    lastModified: '2024-01-08'
  }
]

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPhase, setSelectedPhase] = useState('all')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [customPrompt, setCustomPrompt] = useState('')
  const [repositoryPath, setRepositoryPath] = useState('')
  
  const [generatedDocuments, setGeneratedDocuments] = useKV<GeneratedDocument[]>('generated-documents', [])
  const [savedTemplates, setSavedTemplates] = useKV<Template[]>('custom-templates', [])

  const phases = ['STR', 'CON', 'DES', 'DEV', 'TST', 'INT', 'CRT', 'PRD', 'OPS', 'MNT', 'REP', 'UPG', 'EXT', 'RET', 'AUD']

  const filteredTemplates = [...sampleTemplates, ...savedTemplates].filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.docCode.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPhase = selectedPhase === 'all' || template.phase === selectedPhase
    return matchesSearch && matchesPhase
  })

  const getCriticalityColor = (criticality: Template['criticality']) => {
    switch (criticality) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'Essential': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Important': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Standard': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleGenerate = async (template: Template) => {
    setSelectedTemplate(template)
    setIsGenerating(true)
    setGenerationProgress(0)

    try {
      // Simulate AI generation process
      for (let i = 0; i <= 100; i += 10) {
        setGenerationProgress(i)
        await new Promise(resolve => setTimeout(resolve, 200))
      }

      const prompt = spark.llmPrompt`Generate a ${template.name} document based on the following template requirements:
      
      Template: ${template.name}
      Description: ${template.description}
      Phase: ${template.phase}
      Document Code: ${template.docCode}
      
      Additional context: ${customPrompt || 'Standard implementation for AQUA V. aerospace program'}
      
      Please create a comprehensive document following industry standards and best practices.`

      const generatedContent = await spark.llm(prompt)

      const newDocument: GeneratedDocument = {
        id: `doc-${Date.now()}`,
        templateId: template.id,
        name: `${template.name} - Generated ${new Date().toLocaleDateString()}`,
        content: generatedContent,
        metadata: {
          author: 'AI Generator',
          created: new Date().toISOString(),
          repository: repositoryPath || 'local://documents/',
          version: '1.0.0'
        }
      }

      setGeneratedDocuments(current => [...current, newDocument])
      
      if (repositoryPath) {
        toast.success(`Document saved to ${repositoryPath}`)
      } else {
        toast.success('Document generated and saved locally')
      }

    } catch (error) {
      toast.error('Generation failed. Please try again.')
      console.error('Generation error:', error)
    } finally {
      setIsGenerating(false)
      setGenerationProgress(0)
      setSelectedTemplate(null)
      setCustomPrompt('')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Robot size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Processing Prompt UI</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Template Generator</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <GitBranch size={16} className="mr-2" />
                Version Control
              </Button>
              <Button variant="outline" size="sm">
                <FolderOpen size={16} className="mr-2" />
                Repository
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search templates by name, description, or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedPhase} onValueChange={setSelectedPhase}>
              <SelectTrigger className="w-48">
                <Filter size={16} className="mr-2" />
                <SelectValue placeholder="Filter by phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Phases</SelectItem>
                {phases.map(phase => (
                  <SelectItem key={phase} value={phase}>{phase}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Template Library</TabsTrigger>
            <TabsTrigger value="generated">Generated Documents</TabsTrigger>
            <TabsTrigger value="repositories">Repositories</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Card className="h-full cursor-pointer hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{template.name}</CardTitle>
                          <CardDescription className="text-sm">
                            {template.description}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className={getCriticalityColor(template.criticality)}>
                          {template.criticality}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-mono bg-muted px-2 py-1 rounded">
                            {template.phase}
                          </span>
                          <span>{template.docCode}</span>
                          <span>{template.version}</span>
                        </div>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full" size="sm">
                              <Download size={16} className="mr-2" />
                              Generate Template
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Generate {template.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="repository">Repository Path (optional)</Label>
                                <Input
                                  id="repository"
                                  placeholder="e.g., /local/templates/ or smb://server/templates/"
                                  value={repositoryPath}
                                  onChange={(e) => setRepositoryPath(e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="prompt">Custom Prompt (optional)</Label>
                                <Textarea
                                  id="prompt"
                                  placeholder="Add specific requirements or context for this template..."
                                  value={customPrompt}
                                  onChange={(e) => setCustomPrompt(e.target.value)}
                                  rows={4}
                                />
                              </div>
                              {isGenerating && selectedTemplate?.id === template.id && (
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span>Generating document...</span>
                                    <span>{generationProgress}%</span>
                                  </div>
                                  <Progress value={generationProgress} className="w-full" />
                                </div>
                              )}
                              <Button 
                                onClick={() => handleGenerate(template)}
                                disabled={isGenerating}
                                className="w-full"
                              >
                                {isGenerating && selectedTemplate?.id === template.id ? (
                                  <>Generating...</>
                                ) : (
                                  <>
                                    <Robot size={16} className="mr-2" />
                                    Generate with AI
                                  </>
                                )}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="generated" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Generated Documents</h2>
              <Badge variant="secondary">{generatedDocuments.length} documents</Badge>
            </div>
            
            <div className="grid gap-4">
              {generatedDocuments.map((doc) => (
                <Card key={doc.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{doc.name}</CardTitle>
                        <CardDescription>
                          Created: {new Date(doc.metadata.created).toLocaleDateString()} • 
                          Version: {doc.metadata.version} • 
                          Repository: {doc.metadata.repository}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download size={16} className="mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <GitBranch size={16} className="mr-2" />
                          Version
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm max-h-40 overflow-y-auto">
                      {doc.content.substring(0, 300)}...
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {generatedDocuments.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Robot size={48} className="text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No documents generated yet</h3>
                    <p className="text-muted-foreground text-center">
                      Generate your first template document from the Template Library
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="repositories" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Repository Management</h2>
              <Button>
                <Plus size={16} className="mr-2" />
                Add Repository
              </Button>
            </div>
            
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen size={20} />
                    Local Repository
                  </CardTitle>
                  <CardDescription>/local/templates/</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Status: Connected • Documents: {generatedDocuments.length}
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen size={20} />
                    Network Repository
                  </CardTitle>
                  <CardDescription>smb://aqua-v-net/templates/</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Status: Not configured
                    </div>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      Inactive
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App