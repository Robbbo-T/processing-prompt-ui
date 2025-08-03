import { useState, useEffect, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, Robot, FolderOpen, GitBranch, Plus, Search, Filter, Code, Eye, FileText, Share, Copy, Check,
  Users, MessageCircle, Clock, Pencil, UserCircle, ChatCircle, PushPin, X, Play
} from '@phosphor-icons/react'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

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

interface Collaborator {
  id: string
  name: string
  avatar: string
  email: string
  status: 'online' | 'offline' | 'idle'
  cursor?: {
    line: number
    character: number
  }
  selection?: {
    start: { line: number; character: number }
    end: { line: number; character: number }
  }
  lastSeen: string
}

interface Comment {
  id: string
  author: Collaborator
  content: string
  timestamp: string
  resolved: boolean
  replies: Comment[]
  position?: {
    line: number
    character: number
  }
  selection?: string
}

interface DocumentEdit {
  id: string
  author: Collaborator
  timestamp: string
  type: 'insert' | 'delete' | 'replace'
  position: {
    start: { line: number; character: number }
    end: { line: number; character: number }
  }
  content: string
  previousContent?: string
}

interface CollaborationSession {
  id: string
  documentId: string
  participants: Collaborator[]
  activeUsers: string[]
  startTime: string
  lastActivity: string
}

interface GeneratedDocument {
  id: string
  templateId: string
  name: string
  rawContent: string
  renderedContent: string
  format: 'markdown' | 'html' | 'docx'
  status: 'draft' | 'reviewing' | 'approved' | 'published'
  metadata: {
    author: string
    created: string
    repository: string
    version: string
    lastModified: string
  }
  collaboration?: {
    session: CollaborationSession
    comments: Comment[]
    edits: DocumentEdit[]
    isLocked: boolean
    lockedBy?: string
  }
}

interface GenerationStep {
  step: 'generating' | 'raw-review' | 'preview' | 'formatting' | 'complete'
  progress: number
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

const sampleCollaborators: Collaborator[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    email: 'alice@aqua-v.com',
    status: 'online',
    lastSeen: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Bob Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    email: 'bob@aqua-v.com',
    status: 'online',
    lastSeen: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Carol Davis',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
    email: 'carol@aqua-v.com',
    status: 'idle',
    lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  }
]

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPhase, setSelectedPhase] = useState('all')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState<GenerationStep>({ step: 'generating', progress: 0 })
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [customPrompt, setCustomPrompt] = useState('')
  const [repositoryPath, setRepositoryPath] = useState('')
  const [outputFormat, setOutputFormat] = useState<'markdown' | 'html' | 'docx'>('markdown')
  const [currentDocument, setCurrentDocument] = useState<GeneratedDocument | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // Collaboration states
  const [collaborationSession, setCollaborationSession] = useState<CollaborationSession | null>(null)
  const [activeCollaborators] = useState<Collaborator[]>(sampleCollaborators.filter(c => c.status === 'online'))
  const [comments, setComments] = useKV<Comment[]>('document-comments', [])
  const [newComment, setNewComment] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [isEditingMode, setIsEditingMode] = useState(false)
  const [editContent, setEditContent] = useState('')
  const [collaborativeDocument, setCollaborativeDocument] = useState<GeneratedDocument | null>(null)
  const editorRef = useRef<HTMLTextAreaElement>(null)
  
  const [generatedDocuments, setGeneratedDocuments] = useKV<GeneratedDocument[]>('generated-documents', [])
  const [savedTemplates, setSavedTemplates] = useKV<Template[]>('custom-templates', [])

  const phases = ['STR', 'CON', 'DES', 'DEV', 'TST', 'INT', 'CRT', 'PRD', 'OPS', 'MNT', 'REP', 'UPG', 'EXT', 'RET', 'AUD']

  // Simulate real-time collaboration
  useEffect(() => {
    if (collaborativeDocument && isEditingMode) {
      const interval = setInterval(() => {
        // Simulate cursor positions and selections from other users
        setActiveCollaborators(prev => prev.map(collaborator => ({
          ...collaborator,
          cursor: {
            line: Math.floor(Math.random() * 20) + 1,
            character: Math.floor(Math.random() * 80)
          }
        })))
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [collaborativeDocument, isEditingMode])

  const startCollaborativeEditing = (document: GeneratedDocument) => {
    setCollaborativeDocument(document)
    setEditContent(document.rawContent)
    setIsEditingMode(true)
    
    // Create collaboration session
    const session: CollaborationSession = {
      id: `session-${Date.now()}`,
      documentId: document.id,
      participants: [...activeCollaborators, {
        id: 'current-user',
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        email: 'you@aqua-v.com',
        status: 'online',
        lastSeen: new Date().toISOString()
      }],
      activeUsers: ['current-user', ...activeCollaborators.map(c => c.id)],
      startTime: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    }
    
    setCollaborationSession(session)
    toast.success('Collaborative editing started')
  }

  const saveCollaborativeChanges = () => {
    if (collaborativeDocument && editContent) {
      const updatedDocument: GeneratedDocument = {
        ...collaborativeDocument,
        rawContent: editContent,
        renderedContent: editContent,
        metadata: {
          ...collaborativeDocument.metadata,
          lastModified: new Date().toISOString()
        },
        collaboration: {
          session: collaborationSession!,
          comments: comments,
          edits: [],
          isLocked: false
        }
      }

      setGeneratedDocuments(current => 
        current.map(doc => doc.id === collaborativeDocument.id ? updatedDocument : doc)
      )
      
      setCollaborativeDocument(updatedDocument)
      toast.success('Changes saved successfully')
    }
  }

  const addComment = () => {
    if (!newComment.trim() || !collaborativeDocument) return

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        email: 'you@aqua-v.com',
        status: 'online',
        lastSeen: new Date().toISOString()
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      resolved: false,
      replies: []
    }

    setComments(current => [...current, comment])
    setNewComment('')
    toast.success('Comment added')
  }

  const resolveComment = (commentId: string) => {
    setComments(current => 
      current.map(comment => 
        comment.id === commentId 
          ? { ...comment, resolved: true }
          : comment
      )
    )
    toast.success('Comment resolved')
  }

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
    setCurrentStep({ step: 'generating', progress: 0 })
    setIsDialogOpen(true)

    try {
      // Step 1: Generate raw content
      setCurrentStep({ step: 'generating', progress: 25 })
      await new Promise(resolve => setTimeout(resolve, 1000))

      const prompt = spark.llmPrompt`Generate a ${template.name} document in ${outputFormat} format based on the following template requirements:
      
      Template: ${template.name}
      Description: ${template.description}
      Phase: ${template.phase || 'N/A'}
      Document Code: ${template.docCode || 'N/A'}
      Output Format: ${outputFormat}
      
      Additional context: ${customPrompt || 'Standard implementation for AQUA V. aerospace program'}
      
      Please create a comprehensive document following industry standards and best practices. 
      ${outputFormat === 'markdown' ? 'Use proper markdown syntax with headers, lists, tables, and code blocks.' : ''}
      ${outputFormat === 'html' ? 'Generate clean, semantic HTML5 with proper structure and styling classes.' : ''}
      ${outputFormat === 'docx' ? 'Structure the content for Word document format with proper headings and formatting.' : ''}`

      const rawContent = await spark.llm(prompt)
      
      setCurrentStep({ step: 'raw-review', progress: 50 })
      
      // Create the document object
      const newDocument: GeneratedDocument = {
        id: `doc-${Date.now()}`,
        templateId: template.id,
        name: `${template.name} - Generated ${new Date().toLocaleDateString()}`,
        rawContent: rawContent,
        renderedContent: rawContent, // Initially same as raw
        format: outputFormat,
        status: 'draft',
        metadata: {
          author: 'AI Generator',
          created: new Date().toISOString(),
          repository: repositoryPath || 'local://documents/',
          version: '1.0.0',
          lastModified: new Date().toISOString()
        }
      }

      setCurrentDocument(newDocument)
      setCurrentStep({ step: 'raw-review', progress: 100 })

    } catch (error) {
      toast.error('Generation failed. Please try again.')
      console.error('Generation error:', error)
      setIsGenerating(false)
      setIsDialogOpen(false)
    }
  }

  const handleApproveRaw = () => {
    setCurrentStep({ step: 'preview', progress: 0 })
  }

  const handleApprovePreview = () => {
    setCurrentStep({ step: 'formatting', progress: 50 })
    setTimeout(() => {
      setCurrentStep({ step: 'complete', progress: 100 })
    }, 1000)
  }

  const handlePublish = () => {
    if (currentDocument) {
      const finalDocument = {
        ...currentDocument,
        status: 'published' as const,
        metadata: {
          ...currentDocument.metadata,
          lastModified: new Date().toISOString()
        }
      }

      setGeneratedDocuments(current => [...current, finalDocument])
      
      if (repositoryPath) {
        toast.success(`Document published to ${repositoryPath}`)
      } else {
        toast.success('Document published locally')
      }

      // Reset state
      setIsGenerating(false)
      setIsDialogOpen(false)
      setCurrentDocument(null)
      setCustomPrompt('')
      setRepositoryPath('')
    }
  }

  const handleCopyToClipboard = async () => {
    if (currentDocument) {
      try {
        await navigator.clipboard.writeText(currentDocument.rawContent)
        setCopied(true)
        toast.success('Content copied to clipboard')
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        toast.error('Failed to copy to clipboard')
      }
    }
  }

  const renderPreview = (content: string, format: string) => {
    if (!content || !format) {
      return <div className="text-muted-foreground">No content available</div>
    }
    
    if (format === 'html') {
      return <div dangerouslySetInnerHTML={{ __html: content }} className="prose max-w-none" />
    } else if (format === 'markdown') {
      // Simple markdown to HTML conversion for preview
      const htmlContent = content
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
      return <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="prose max-w-none" />
    } else {
      return <pre className="whitespace-pre-wrap text-sm">{content}</pre>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="templates">Template Library</TabsTrigger>
            <TabsTrigger value="generated">Generated Documents</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
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
                            {template.phase || 'N/A'}
                          </span>
                          <span>{template.docCode || 'N/A'}</span>
                          <span>{template.version || 'v1.0.0'}</span>
                        </div>
                        
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button className="w-full" size="sm">
                              <Download size={16} className="mr-2" />
                              Generate Template
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh]">
                            <DialogHeader>
                              <DialogTitle>Generate {template.name}</DialogTitle>
                            </DialogHeader>
                            
                            {!isGenerating ? (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="format">Output Format</Label>
                                    <Select value={outputFormat} onValueChange={(value: 'markdown' | 'html' | 'docx') => setOutputFormat(value)}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="markdown">Markdown</SelectItem>
                                        <SelectItem value="html">HTML5</SelectItem>
                                        <SelectItem value="docx">Word Document</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label htmlFor="repository">Repository Path (optional)</Label>
                                    <Input
                                      id="repository"
                                      placeholder="e.g., /local/templates/ or smb://server/templates/"
                                      value={repositoryPath}
                                      onChange={(e) => setRepositoryPath(e.target.value)}
                                    />
                                  </div>
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
                                <Button 
                                  onClick={() => handleGenerate(template)}
                                  className="w-full"
                                >
                                  <Robot size={16} className="mr-2" />
                                  Generate with AI
                                </Button>
                              </div>
                            ) : (
                              <div className="space-y-6">
                                {/* Progress Indicator */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep.step === 'generating' ? 'bg-blue-500 text-white' : currentStep.progress >= 50 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                                      <Robot size={16} />
                                    </div>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep.step === 'raw-review' ? 'bg-blue-500 text-white' : currentStep.step === 'preview' || currentStep.step === 'formatting' || currentStep.step === 'complete' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                                      <Code size={16} />
                                    </div>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep.step === 'preview' ? 'bg-blue-500 text-white' : currentStep.step === 'formatting' || currentStep.step === 'complete' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                                      <Eye size={16} />
                                    </div>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep.step === 'formatting' ? 'bg-blue-500 text-white' : currentStep.step === 'complete' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                                      <FileText size={16} />
                                    </div>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep.step === 'complete' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                                      <Share size={16} />
                                    </div>
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {currentStep.step === 'generating' && 'Generating content...'}
                                    {currentStep.step === 'raw-review' && 'Review raw code'}
                                    {currentStep.step === 'preview' && 'Preview rendering'}
                                    {currentStep.step === 'formatting' && 'Formatting...'}
                                    {currentStep.step === 'complete' && 'Ready to publish'}
                                  </div>
                                </div>

                                <Progress value={currentStep.progress} className="w-full" />

                                {currentStep.step === 'raw-review' && currentDocument && (
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <h3 className="text-lg font-semibold">Raw Code Review</h3>
                                      <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                                          {copied ? <Check size={16} /> : <Copy size={16} />}
                                          {copied ? 'Copied!' : 'Copy'}
                                        </Button>
                                        <Badge variant="secondary">{currentDocument.format?.toUpperCase() || 'UNKNOWN'}</Badge>
                                      </div>
                                    </div>
                                    <ScrollArea className="h-96 w-full border rounded-lg">
                                      <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
                                        {currentDocument.rawContent}
                                      </pre>
                                    </ScrollArea>
                                    <div className="flex justify-end gap-2">
                                      <Button variant="outline" onClick={() => { setIsGenerating(false); setIsDialogOpen(false) }}>
                                        Cancel
                                      </Button>
                                      <Button onClick={handleApproveRaw}>
                                        <Eye size={16} className="mr-2" />
                                        Preview Rendering
                                      </Button>
                                    </div>
                                  </div>
                                )}

                                {currentStep.step === 'preview' && currentDocument && (
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <h3 className="text-lg font-semibold">Preview Rendering</h3>
                                      <Badge variant="secondary">{currentDocument.format?.toUpperCase() || 'UNKNOWN'}</Badge>
                                    </div>
                                    <Tabs defaultValue="preview" className="w-full">
                                      <TabsList>
                                        <TabsTrigger value="preview">Preview</TabsTrigger>
                                        <TabsTrigger value="raw">Raw Code</TabsTrigger>
                                      </TabsList>
                                      <TabsContent value="preview">
                                        <ScrollArea className="h-96 w-full border rounded-lg">
                                          <div className="p-4">
                                            {renderPreview(currentDocument.rawContent, currentDocument.format)}
                                          </div>
                                        </ScrollArea>
                                      </TabsContent>
                                      <TabsContent value="raw">
                                        <ScrollArea className="h-96 w-full border rounded-lg">
                                          <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
                                            {currentDocument.rawContent}
                                          </pre>
                                        </ScrollArea>
                                      </TabsContent>
                                    </Tabs>
                                    <div className="flex justify-end gap-2">
                                      <Button variant="outline" onClick={() => setCurrentStep({ step: 'raw-review', progress: 100 })}>
                                        Back to Raw
                                      </Button>
                                      <Button onClick={handleApprovePreview}>
                                        <FileText size={16} className="mr-2" />
                                        Format & Prepare
                                      </Button>
                                    </div>
                                  </div>
                                )}

                                {(currentStep.step === 'formatting' || currentStep.step === 'complete') && currentDocument && (
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <h3 className="text-lg font-semibold">
                                        {currentStep.step === 'formatting' ? 'Formatting Document...' : 'Ready to Publish'}
                                      </h3>
                                      <Badge variant="secondary">{currentDocument.format?.toUpperCase() || 'UNKNOWN'}</Badge>
                                    </div>
                                    
                                    {currentStep.step === 'complete' && (
                                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <div className="flex items-center gap-2 text-green-800 mb-2">
                                          <Check size={16} />
                                          <span className="font-medium">Document Ready</span>
                                        </div>
                                        <p className="text-sm text-green-700">
                                          Your {currentDocument.format.toUpperCase()} document has been generated and formatted successfully.
                                        </p>
                                      </div>
                                    )}

                                    <div className="space-y-2">
                                      <Label>Document Details</Label>
                                      <div className="bg-muted p-3 rounded-lg text-sm">
                                        <div><strong>Name:</strong> {currentDocument.name}</div>
                                        <div><strong>Format:</strong> {currentDocument.format?.toUpperCase() || 'UNKNOWN'}</div>
                                        <div><strong>Repository:</strong> {currentDocument.metadata.repository}</div>
                                        <div><strong>Size:</strong> {currentDocument.rawContent ? (currentDocument.rawContent.length / 1024).toFixed(1) : '0'} KB</div>
                                      </div>
                                    </div>

                                    {currentStep.step === 'complete' && (
                                      <div className="flex justify-end gap-2">
                                        <Button variant="outline" onClick={() => { setIsGenerating(false); setIsDialogOpen(false) }}>
                                          Cancel
                                        </Button>
                                        <Button onClick={handlePublish}>
                                          <Share size={16} className="mr-2" />
                                          Publish Document
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
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
                        <CardTitle className="text-lg flex items-center gap-2">
                          {doc.name}
                          <Badge variant="outline" className={
                            doc.status === 'published' ? 'bg-green-100 text-green-800 border-green-200' :
                            doc.status === 'approved' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            doc.status === 'reviewing' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                            'bg-gray-100 text-gray-800 border-gray-200'
                          }>
                            {doc.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          Created: {new Date(doc.metadata.created).toLocaleDateString()} • 
                          Format: {doc.format?.toUpperCase() || 'UNKNOWN'} • 
                          Version: {doc.metadata.version} • 
                          Repository: {doc.metadata.repository}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye size={16} className="mr-2" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download size={16} className="mr-2" />
                          Download
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => startCollaborativeEditing(doc)}
                        >
                          <Users size={16} className="mr-2" />
                          Collaborate
                        </Button>
                        <Button variant="outline" size="sm">
                          <GitBranch size={16} className="mr-2" />
                          Version
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="preview" className="w-full">
                      <TabsList>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="raw">Raw Code</TabsTrigger>
                      </TabsList>
                      <TabsContent value="preview">
                        <ScrollArea className="h-40 w-full border rounded-lg">
                          <div className="p-4">
                            {renderPreview(doc.rawContent, doc.format)}
                          </div>
                        </ScrollArea>
                      </TabsContent>
                      <TabsContent value="raw">
                        <ScrollArea className="h-40 w-full border rounded-lg">
                          <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
                            {doc.rawContent ? doc.rawContent.substring(0, 500) + '...' : 'No content available'}
                          </pre>
                        </ScrollArea>
                      </TabsContent>
                    </Tabs>
                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                      <span>Size: {doc.rawContent ? (doc.rawContent.length / 1024).toFixed(1) : '0'} KB</span>
                      <span>Modified: {new Date(doc.metadata.lastModified).toLocaleDateString()}</span>
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

          <TabsContent value="collaboration" className="space-y-6">
            {!isEditingMode ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Users size={48} className="text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Real-time Collaboration</h2>
                <p className="text-muted-foreground text-center mb-6">
                  Select a document from the Generated Documents tab and click "Collaborate" to start real-time editing with your team.
                </p>
                
                <div className="grid gap-4 w-full max-w-2xl">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users size={20} />
                        Active Team Members
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {sampleCollaborators.map((collaborator) => (
                          <div key={collaborator.id} className="flex items-center gap-2">
                            <div className="relative">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                                <AvatarFallback>{collaborator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                collaborator.status === 'online' ? 'bg-green-500' : 
                                collaborator.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-400'
                              }`} />
                            </div>
                            <div className="text-sm">
                              <div className="font-medium">{collaborator.name}</div>
                              <div className="text-muted-foreground capitalize">{collaborator.status}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Collaboration Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold">Collaborative Editing</h2>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                      Live Session
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Active Users */}
                    <div className="flex items-center gap-2">
                      {collaborationSession?.participants.slice(0, 4).map((participant, index) => (
                        <div key={participant.id} className="relative">
                          <Avatar className="w-8 h-8" style={{ zIndex: 10 - index }}>
                            <AvatarImage src={participant.avatar} alt={participant.name} />
                            <AvatarFallback>{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          {participant.cursor && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-white"
                            />
                          )}
                        </div>
                      ))}
                      {collaborationSession && collaborationSession.participants.length > 4 && (
                        <div className="text-sm text-muted-foreground">
                          +{collaborationSession.participants.length - 4} more
                        </div>
                      )}
                    </div>
                    
                    <Separator orientation="vertical" className="h-6" />
                    
                    <div className="flex gap-2">
                      <Popover open={showComments} onOpenChange={setShowComments}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MessageCircle size={16} className="mr-2" />
                            Comments ({comments.filter(c => !c.resolved).length})
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80" align="end">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">Comments</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowComments(false)}
                              >
                                <X size={16} />
                              </Button>
                            </div>
                            
                            <ScrollArea className="h-60">
                              <div className="space-y-3">
                                {comments.map((comment) => (
                                  <motion.div
                                    key={comment.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-3 rounded-lg border ${comment.resolved ? 'bg-gray-50' : 'bg-white'}`}
                                  >
                                    <div className="flex items-start gap-2">
                                      <Avatar className="w-6 h-6">
                                        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                                        <AvatarFallback className="text-xs">
                                          {comment.author.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1 text-sm">
                                        <div className="font-medium">{comment.author.name}</div>
                                        <div className="text-muted-foreground mb-1">
                                          {new Date(comment.timestamp).toLocaleTimeString()}
                                        </div>
                                        <div className={comment.resolved ? 'line-through text-muted-foreground' : ''}>
                                          {comment.content}
                                        </div>
                                        {!comment.resolved && (
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="mt-1 p-0 h-auto text-xs"
                                            onClick={() => resolveComment(comment.id)}
                                          >
                                            <Check size={12} className="mr-1" />
                                            Resolve
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </ScrollArea>
                            
                            <div className="space-y-2">
                              <Textarea
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                rows={2}
                              />
                              <Button 
                                size="sm" 
                                onClick={addComment}
                                disabled={!newComment.trim()}
                              >
                                <Plus size={16} className="mr-2" />
                                Add Comment
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={saveCollaborativeChanges}
                      >
                        <Check size={16} className="mr-2" />
                        Save Changes
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setIsEditingMode(false)
                          setCollaborativeDocument(null)
                          setCollaborationSession(null)
                        }}
                      >
                        <X size={16} className="mr-2" />
                        End Session
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Editor Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[600px]">
                  {/* Editor */}
                  <Card className="flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Editor</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {collaborativeDocument?.format?.toUpperCase()}
                          </Badge>
                          <div className="flex -space-x-2">
                            {activeCollaborators.slice(0, 3).map((collaborator) => (
                              <motion.div
                                key={collaborator.id}
                                animate={{
                                  x: Math.random() * 4 - 2,
                                  y: Math.random() * 4 - 2
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <Avatar className="w-6 h-6 border-2 border-white">
                                  <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                                  <AvatarFallback className="text-xs">
                                    {collaborator.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-0">
                      <div className="relative h-full">
                        <Textarea
                          ref={editorRef}
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="h-full resize-none border-0 focus:ring-0 font-mono text-sm"
                          placeholder="Start editing your document..."
                        />
                        
                        {/* Simulated cursor positions */}
                        <AnimatePresence>
                          {activeCollaborators.map((collaborator) => (
                            collaborator.cursor && (
                              <motion.div
                                key={`cursor-${collaborator.id}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute pointer-events-none"
                                style={{
                                  top: `${collaborator.cursor.line * 20 + 50}px`,
                                  left: `${collaborator.cursor.character * 8 + 20}px`
                                }}
                              >
                                <div className="w-0.5 h-5 bg-purple-500 animate-pulse" />
                                <div className="bg-purple-500 text-white text-xs px-1 py-0.5 rounded mt-1 whitespace-nowrap">
                                  {collaborator.name}
                                </div>
                              </motion.div>
                            )
                          ))}
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Live Preview */}
                  <Card className="flex flex-col">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Live Preview</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0">
                      <ScrollArea className="h-full">
                        <div className="p-4">
                          {renderPreview(editContent, collaborativeDocument?.format || 'markdown')}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>

                {/* Activity Feed */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock size={20} />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { user: 'Alice Johnson', action: 'edited lines 15-20', time: '2 minutes ago', type: 'edit' },
                        { user: 'Bob Wilson', action: 'added a comment', time: '5 minutes ago', type: 'comment' },
                        { user: 'You', action: 'joined the session', time: '8 minutes ago', type: 'join' }
                      ].map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
                        >
                          <div className={`w-2 h-2 rounded-full ${
                            activity.type === 'edit' ? 'bg-blue-500' :
                            activity.type === 'comment' ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <div className="flex-1 text-sm">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </div>
                          <div className="text-xs text-muted-foreground">{activity.time}</div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
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

export default App          <TabsContent value="repositories" className="space-y-6">
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