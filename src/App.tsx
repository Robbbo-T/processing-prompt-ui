import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { motion } from 'framer-motion'
import { 
  Robot, Plus, MagnifyingGlass as Search, Code, Eye, FileText, Copy, Check,
  Users, Clock, UserCircle, X, ArrowRight, GitBranch,
  CheckCircle, Warning, Lightning, Export, ArrowLeft,
  BookOpen, Compass, Airplane, Rocket, Brain, Globe, Shield,
  TreeStructure, Cube, ChartLine, 
  Desktop, Cube as ThreeDee, Cpu, Hash
} from '@phosphor-icons/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import UTCSValidator from '@/components/UTCSValidator'
import AquaVDocumentViewer from '@/components/AquaVDocumentViewer'

interface DocumentationSection {
  id: string
  title: string
  description: string
  icon: any
  category: 'automation' | 'compliance' | '3d-modeling' | 'collaboration' | 'ai-powered'
  status: 'draft' | 'in-review' | 'approved' | 'published'
  lastModified: string
  author: string
  wordCount: number
  readTime: number
  tags: string[]
  children?: DocumentationSection[]
}

interface AIRefinement {
  id: string
  documentId: string
  type: 'grammar' | 'clarity' | 'technical' | 'compliance' | 'structure'
  severity: 'low' | 'medium' | 'high' | 'critical'
  suggestion: string
  explanation: string
  position: { start: number; end: number }
  confidence: number
  status: 'pending' | 'accepted' | 'rejected' | 'applied'
  timestamp: string
}

interface ComplianceRequirement {
  id: string
  standard: string
  section: string
  requirement: string
  status: 'compliant' | 'non-compliant' | 'partial' | 'not-applicable'
  evidence: string[]
  lastVerified: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
}

const sampleDocumentationSections: DocumentationSection[] = [
  {
    id: 'aqua-v-mmd',
    title: 'AQUA V. Model Master Document (MMD)',
    description: 'Aerospace & Quantum United Advanced Venture - Comprehensive strategic framework and technical architecture for quantum-enhanced aerospace systems',
    icon: Rocket,
    category: 'compliance',
    status: 'published',
    lastModified: new Date().toISOString(),
    author: 'Amedeo Pelliccia, Quantum Aerospace Engineer',
    wordCount: 15500,
    readTime: 62,
    tags: ['AQUA V.', 'quantum', 'aerospace', 'BWB-Q100', 'strategic framework', 'master document', 'GAIA AIR'],
    children: []
  },
  {
    id: 'utcs-standard',
    title: 'UTCS-Optimized Identification Standard',
    description: 'AMPEL360 Universal Technology Classification System for unified artifact identification',
    icon: Hash,
    category: 'compliance',
    status: 'published',
    lastModified: new Date().toISOString(),
    author: 'AMPEL360 CRB',
    wordCount: 8500,
    readTime: 34,
    tags: ['UTCS', 'identification', 'standard', 'CRB', 'nomenclature']
  },
  {
    id: 'automation-1',
    title: 'Software Automation Framework',
    description: 'Comprehensive framework for automated software development and deployment in aerospace systems',
    icon: Robot,
    category: 'automation',
    status: 'published',
    lastModified: new Date().toISOString(),
    author: 'Dr. Sarah Chen',
    wordCount: 3500,
    readTime: 14,
    tags: ['automation', 'CI/CD', 'testing', 'deployment'],
    children: []
  }
]

const sampleComplianceRequirements: ComplianceRequirement[] = [
  {
    id: 'do178c-1',
    standard: 'DO-178C',
    section: '4.2',
    requirement: 'Software planning process shall be established',
    status: 'compliant',
    evidence: ['SDP-001.pdf', 'planning-checklist.md'],
    lastVerified: new Date().toISOString(),
    riskLevel: 'medium'
  },
  {
    id: 'do178c-2',
    standard: 'DO-178C',
    section: '6.3.1',
    requirement: 'Source code shall be reviewed',
    status: 'non-compliant',
    evidence: ['code-review-template.md'],
    lastVerified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    riskLevel: 'high'
  }
]

const sampleAIRefinements: AIRefinement[] = [
  {
    id: 'ref-1',
    documentId: 'automation-1',
    type: 'clarity',
    severity: 'medium',
    suggestion: 'Consider breaking this long sentence into two for better readability',
    explanation: 'Sentences over 25 words can be difficult to parse in technical documentation',
    position: { start: 125, end: 187 },
    confidence: 0.87,
    status: 'pending',
    timestamp: new Date().toISOString()
  }
]

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSection, setSelectedSection] = useState<DocumentationSection | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [refinementFilter, setRefinementFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all')

  const [documentationSections] = useKV<DocumentationSection[]>('documentation-sections', sampleDocumentationSections)
  const [complianceRequirements] = useKV<ComplianceRequirement[]>('compliance-requirements', sampleComplianceRequirements)
  const [aiRefinements] = useKV<AIRefinement[]>('ai-refinements', sampleAIRefinements)

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'automation': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'compliance': return 'bg-red-100 text-red-800 border-red-200'
      case '3d-modeling': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'collaboration': return 'bg-green-100 text-green-800 border-green-200'
      case 'ai-powered': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 border-green-200'
      case 'approved': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'in-review': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Filter documentation sections
  const filteredSections = (documentationSections || []).filter(section => {
    const matchesSearch = section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         section.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || section.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Filter AI refinements
  const filteredRefinements = (aiRefinements || []).filter(refinement => {
    if (refinementFilter === 'all') return true
    return refinement.status === refinementFilter
  })

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Navigation */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} transition-all duration-300 bg-card border-r flex flex-col`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl">
                <Airplane size={24} className="text-primary-foreground" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-lg font-bold">AMPEL360 BWB-Q100</h1>
                  <p className="text-xs text-muted-foreground">Documentation Platform</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            </Button>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {!sidebarCollapsed && (
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 text-sm"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              {(documentationSections || []).map((section) => (
                <div key={section.id}>
                  <Button
                    variant={selectedSection?.id === section.id ? "secondary" : "ghost"}
                    className={`w-full justify-start ${sidebarCollapsed ? 'px-2' : 'px-3'}`}
                    onClick={() => setSelectedSection(section)}
                  >
                    <section.icon size={16} className={sidebarCollapsed ? '' : 'mr-3'} />
                    {!sidebarCollapsed && (
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">{section.title}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {section.description}
                        </div>
                      </div>
                    )}
                    {!sidebarCollapsed && (
                      <Badge variant="outline" className={getStatusColor(section.status)}>
                        {section.status}
                      </Badge>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>AI Assistant Online</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/95">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold">
                    {selectedSection ? selectedSection.title : 'Documentation Overview'}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {selectedSection ? selectedSection.description : 'AI-powered documentation platform for aerospace systems'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAIPanel(true)}
                  disabled={!selectedSection}
                >
                  <Brain size={16} className="mr-2" />
                  AI Analysis
                </Button>
                <Button variant="outline" size="sm">
                  <Compass size={16} className="mr-2" />
                  Guided Quiz
                </Button>
                <Button variant="outline" size="sm">
                  <GitBranch size={16} className="mr-2" />
                  Version Control
                </Button>
                <Button variant="outline" size="sm">
                  <Export size={16} className="mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {!selectedSection ? (
            // Documentation Overview Dashboard
            <div className="p-6">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="documentation">Documentation</TabsTrigger>
                  <TabsTrigger value="utcs">UTCS Standard</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  <TabsTrigger value="ai-refinements">AI Refinements</TabsTrigger>
                  <TabsTrigger value="3d-models">3D Models</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Platform Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <FileText size={24} className="text-blue-600" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">{(documentationSections || []).length}</div>
                            <div className="text-sm text-muted-foreground">Total Sections</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-green-100 rounded-lg">
                            <CheckCircle size={24} className="text-green-600" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">
                              {(complianceRequirements || []).filter(req => req.status === 'compliant').length}
                            </div>
                            <div className="text-sm text-muted-foreground">Compliant Items</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-orange-100 rounded-lg">
                            <Brain size={24} className="text-orange-600" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">
                              {(aiRefinements || []).filter(ref => ref.status === 'pending').length}
                            </div>
                            <div className="text-sm text-muted-foreground">AI Suggestions</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-purple-100 rounded-lg">
                            <Users size={24} className="text-purple-600" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">5</div>
                            <div className="text-sm text-muted-foreground">Active Users</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock size={20} />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { action: 'AI refinement suggested for Software Automation Framework', time: '5 minutes ago', type: 'ai', user: 'AI Assistant' },
                          { action: 'Compliance matrix updated for DO-178C', time: '12 minutes ago', type: 'compliance', user: 'Jennifer Walsh' },
                          { action: '3D model integration completed for BWB-Q100', time: '1 hour ago', type: '3d', user: 'Maria Santos' },
                          { action: 'New section created: Deployment Strategies', time: '2 hours ago', type: 'documentation', user: 'Alex Kim' }
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                            <div className={`w-2 h-2 rounded-full ${
                              activity.type === 'ai' ? 'bg-orange-500' :
                              activity.type === 'compliance' ? 'bg-red-500' :
                              activity.type === '3d' ? 'bg-purple-500' : 'bg-blue-500'
                            }`} />
                            <div className="flex-1">
                              <div className="text-sm font-medium">{activity.action}</div>
                              <div className="text-xs text-muted-foreground">by {activity.user}</div>
                            </div>
                            <div className="text-xs text-muted-foreground">{activity.time}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="utcs" className="space-y-6">
                  <UTCSValidator 
                    showBrowser={true}
                    onValidCode={(code, parsed) => {
                      console.log('Valid UTCS code generated:', { code, parsed })
                      toast.success(`Valid UTCS code: ${code}`)
                    }}
                  />
                </TabsContent>

                <TabsContent value="documentation" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSections.map((section) => (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <Card className="h-full cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg mb-2 flex items-center gap-2">
                                  <section.icon size={20} />
                                  {section.title}
                                </CardTitle>
                                <CardDescription className="text-sm line-clamp-3">
                                  {section.description}
                                </CardDescription>
                              </div>
                              <Badge variant="outline" className={getCategoryColor(section.category)}>
                                {section.category.replace('-', ' ')}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="space-y-4">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <Badge variant="outline" className={getStatusColor(section.status)}>
                                  {section.status}
                                </Badge>
                                <span>{section.wordCount} words</span>
                                <span>{section.readTime} min read</span>
                              </div>

                              <div className="space-y-2">
                                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                  Tags
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {section.tags.slice(0, 3).map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {section.tags.length > 3 && (
                                    <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                      +{section.tags.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>By {section.author}</span>
                                <span>{new Date(section.lastModified).toLocaleDateString()}</span>
                              </div>
                              
                              <Button 
                                className="w-full" 
                                size="sm"
                                onClick={() => setSelectedSection(section)}
                              >
                                <FileText size={16} className="mr-2" />
                                Open Documentation
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="compliance" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield size={20} />
                        Compliance Matrix
                      </CardTitle>
                      <CardDescription>
                        Track compliance status against aerospace standards and regulations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {(complianceRequirements || []).map((requirement) => (
                          <div key={requirement.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge variant="outline">{requirement.standard}</Badge>
                                <Badge variant="outline">{requirement.section}</Badge>
                                <Badge variant="outline" className={
                                  requirement.status === 'compliant' ? 'bg-green-100 text-green-800 border-green-200' :
                                  requirement.status === 'partial' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                  requirement.status === 'non-compliant' ? 'bg-red-100 text-red-800 border-red-200' :
                                  'bg-gray-100 text-gray-800 border-gray-200'
                                }>
                                  {requirement.status}
                                </Badge>
                                <Badge variant="outline" className={
                                  requirement.riskLevel === 'critical' ? 'bg-red-100 text-red-800 border-red-200' :
                                  requirement.riskLevel === 'high' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                                  requirement.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                  'bg-green-100 text-green-800 border-green-200'
                                }>
                                  {requirement.riskLevel} risk
                                </Badge>
                              </div>
                              <div className="text-sm font-medium mb-1">{requirement.requirement}</div>
                              <div className="text-xs text-muted-foreground">
                                Last verified: {new Date(requirement.lastVerified).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Evidence: {requirement.evidence.join(', ')}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Eye size={16} className="mr-2" />
                                Review
                              </Button>
                              <Button variant="outline" size="sm">
                                <Check size={16} className="mr-2" />
                                Verify
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ai-refinements" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">AI Content Refinements</h2>
                    <div className="flex items-center gap-3">
                      <Select value={refinementFilter} onValueChange={(value: any) => setRefinementFilter(value)}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Refinements</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="accepted">Accepted</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button>
                        <Brain size={16} className="mr-2" />
                        Run Analysis
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredRefinements.map((refinement) => (
                      <Card key={refinement.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge variant="outline" className={getCategoryColor(refinement.type)}>
                                  {refinement.type}
                                </Badge>
                                <Badge variant="outline" className={
                                  refinement.severity === 'critical' ? 'bg-red-100 text-red-800 border-red-200' :
                                  refinement.severity === 'high' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                                  refinement.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                  'bg-green-100 text-green-800 border-green-200'
                                }>
                                  {refinement.severity}
                                </Badge>
                                <Badge variant="outline" className={
                                  refinement.status === 'accepted' ? 'bg-green-100 text-green-800 border-green-200' :
                                  refinement.status === 'rejected' ? 'bg-red-100 text-red-800 border-red-200' :
                                  'bg-yellow-100 text-yellow-800 border-yellow-200'
                                }>
                                  {refinement.status}
                                </Badge>
                                <div className="text-xs text-muted-foreground">
                                  Confidence: {Math.round(refinement.confidence * 100)}%
                                </div>
                              </div>
                              <div className="text-sm font-medium mb-1">{refinement.suggestion}</div>
                              <div className="text-xs text-muted-foreground mb-2">{refinement.explanation}</div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(refinement.timestamp).toLocaleString()}
                              </div>
                            </div>
                            {refinement.status === 'pending' && (
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Check size={16} className="mr-2" />
                                  Accept
                                </Button>
                                <Button variant="outline" size="sm">
                                  <X size={16} className="mr-2" />
                                  Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="3d-models" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Cube size={20} />
                        3D Model Library
                      </CardTitle>
                      <CardDescription>
                        Interactive 3D models with WebGPU rendering and real-time annotations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <ThreeDee size={64} className="mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">3D Model Viewer</h3>
                        <p className="text-muted-foreground mb-4">
                          WebGPU-powered 3D model viewer with exploded views and interactive annotations
                        </p>
                        <Button>
                          <Plus size={16} className="mr-2" />
                          Load BWB-Q100 Model
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            // Selected Section Content
            <div className="p-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSection(null)}
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Overview
                  </Button>
                  <Badge variant="outline" className={getCategoryColor(selectedSection.category)}>
                    {selectedSection.category.replace('-', ' ')}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(selectedSection.status)}>
                    {selectedSection.status}
                  </Badge>
                </div>

                {selectedSection.id === 'aqua-v-mmd' ? (
                  <AquaVDocumentViewer />
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <selectedSection.icon size={24} />
                        {selectedSection.title}
                      </CardTitle>
                      <CardDescription>{selectedSection.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p>This is where the actual documentation content would be displayed. The content would be rendered based on the selected section and would include:</p>
                        <ul>
                          <li>Interactive editing capabilities</li>
                          <li>Real-time collaboration features</li>
                          <li>AI-powered refinement suggestions</li>
                          <li>Compliance validation</li>
                          <li>3D model integration where applicable</li>
                        </ul>
                        <p>The static-interactive hybrid system would precompile this content for optimal performance while enabling rich interactive features on demand.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </main>

        {/* AI Analysis Panel */}
        <Dialog open={showAIPanel} onOpenChange={setShowAIPanel}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain size={20} />
                AI Content Analysis
              </DialogTitle>
            </DialogHeader>
            
            <div className="text-center py-8">
              <Brain size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Ready for Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Select a document section to run AI-powered content analysis
              </p>
              <Button>
                <Lightning size={16} className="mr-2" />
                Start Analysis
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default App