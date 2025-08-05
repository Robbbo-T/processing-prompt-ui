import { useState, useEffect, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, Robot, FolderOpen, GitBranch, Plus, Search, Filter, Code, Eye, FileText, Share, Copy, Check,
  Users, MessageCircle, Clock, Pencil, UserCircle, ChatCircle, PushPin, X, Play, ArrowRight, 
  CheckCircle, Warning, Info, Lightning, Gear, Export, Import, Tag, Hash, File, Folder, ArrowLeft,
  HelpCircle, BookOpen, Compass, Airplane, House, Rocket, Brain, Globe, Target, Database, Shield,
  TreeStructure, FlowArrow, Cube, ChartLine, ListBullets, CalendarCheck, NotePencil, Microscope,
  ChatCentered, Timer, CircleWavy, GraphicsCard, ChartPieSlice, MagnifyingGlass, Palette, Archive,
  Desktop, CubeFocus, Monitor, ThreeDee, Shapes, GridFour, SquaresFour
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

interface NomenclatureData {
  line: string
  product: string
  variant: string
  number: string
  phase: string
  criticality: string
  document: string
  application: string
  method: string
  reality: string
  utcs: string
  regulatory: string
  version: string
  parsed?: boolean
  description?: string
}

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

interface InteractiveWidget {
  id: string
  type: '3d-model' | 'calculator' | 'diagram' | 'simulation' | 'chart'
  title: string
  description: string
  configuration: any
  dependencies: string[]
  performanceMetrics: {
    loadTime: number
    renderTime: number
    interactionLatency: number
  }
}

interface AIContentAnalysis {
  readabilityScore: number
  technicalAccuracy: number
  complianceScore: number
  suggestions: AIRefinement[]
  qualityMetrics: {
    clarity: number
    completeness: number
    consistency: number
    correctness: number
  }
}

interface QuizStep {
  id: string
  field: keyof NomenclatureData
  question: string
  type: 'select' | 'input' | 'multiselect'
  options?: { value: string; label: string; description?: string }[]
  validation?: RegExp
  dependencies?: { field: keyof NomenclatureData; values: string[] }[]
  helpText?: string
  required: boolean
}

interface NomenclatureQuizState {
  currentStep: number
  answers: Partial<NomenclatureData>
  completed: boolean
  isActive: boolean
}

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
  nomenclaturePattern?: string
  compatibleRealities?: string[]
  requiredFields?: string[]
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

interface Repository {
  id: string
  name: string
  path: string
  type: 'local' | 'network' | 'cloud' | 'hybrid'
  reality: 'PHYSL' | 'VRTUL' | 'AUGMT' | 'MIXRL' | 'SIMUL' | 'EXTND' | 'HYBRD' | 'OPERT'
  status: 'active' | 'inactive' | 'readonly' | 'syncing' | 'error'
  description: string
  documentCount: number
  lastSync: string
  capabilities: string[]
  securityLevel: 'public' | 'internal' | 'restricted' | 'classified'
  supportedFormats: ('markdown' | 'html' | 'docx' | 'pdf' | 'xml')[]
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
    repositoryId?: string
    version: string
    lastModified: string
    reality?: string
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
  step: 'parsing' | 'generating' | 'raw-review' | 'preview' | 'formatting' | 'validating' | 'complete'
  progress: number
  message?: string
  nomenclatureData?: NomenclatureData
}

const sampleDocumentationSections: DocumentationSection[] = [
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
    children: [
      {
        id: 'automation-1-1',
        title: 'Continuous Integration Pipeline',
        description: 'Automated testing and integration workflows',
        icon: FlowArrow,
        category: 'automation',
        status: 'approved',
        lastModified: new Date().toISOString(),
        author: 'Mike Rodriguez',
        wordCount: 1200,
        readTime: 5,
        tags: ['CI', 'pipeline', 'automation']
      },
      {
        id: 'automation-1-2',
        title: 'Deployment Strategies',
        description: 'Zero-downtime deployment approaches for critical systems',
        icon: Rocket,
        category: 'automation',
        status: 'in-review',
        lastModified: new Date().toISOString(),
        author: 'Alex Kim',
        wordCount: 950,
        readTime: 4,
        tags: ['deployment', 'blue-green', 'canary']
      }
    ]
  {
  {
    title: 'DO-178C Compliance Matrix',
    description: 'Software considerations in airborne systems and equipment certification',
    icon: Shield,
    icon: Shield,
    status: 'approved',
    lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    author: 'Jennifer Walsh',
    wordCount: 8750,
    readTime: 35,
    tags: ['DO-178C', 'certification', 'compliance', 'safety'],
    children: [
      {
        id: 'compliance-1-1',
        title: 'Software Development Processes',
        description: 'Processes for developing safety-critical software',
        icon: TreeStructure,
        category: 'compliance',
        status: 'published',
        lastModified: new Date().toISOString(),
        author: 'David Park',
        wordCount: 2100,
        readTime: 8,
        tags: ['processes', 'development', 'safety']
      }
    ]
  },
  },
  {: '3d-modeling-1',
    title: 'BWB-Q100 3D Model Integration',
    description: 'Interactive 3D documentation with WebGPU rendering and real-time annotations',
    icon: Cube,
    category: '3d-modeling',
    status: 'draft',
    status: 'draft', * 60 * 60 * 1000).toISOString(),
    author: 'Maria Santos',
    wordCount: 1800,
    readTime: 7,
    tags: ['3D', 'WebGPU', 'modeling', 'visualization'],
    children: [
      {
        id: '3d-modeling-1-1',
        title: 'Exploded View Animations',
        description: 'Step-by-step assembly/disassembly visualizations',
        icon: CubeFocus,
        category: '3d-modeling',
        status: 'in-review',
        lastModified: new Date().toISOString(),
        author: 'Carlos Mendez',
        wordCount: 650,
        readTime: 3,
        tags: ['animation', 'assembly', 'visualization']
      },
      {
        id: '3d-modeling-1-2',
        title: 'AR/VR Integration',
        description: 'Extended reality modes for immersive documentation',
        icon: Monitor,
        category: '3d-modeling',
        status: 'draft',
        lastModified: new Date().toISOString(),
        author: 'Lisa Zhang',
        wordCount: 890,
        readTime: 4,
        tags: ['AR', 'VR', 'XR', 'immersive']
      }
    ]
  },
  },
  {
    id: 'collaboration-1',
    description: 'Multi-user editing framework with conflict resolution and approval workflows',
    icon: Users,
    category: 'collaboration',
    status: 'published',
    lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    author: 'Robert Chen',
    wordCount: 2750,
    readTime: 11,
    tags: ['collaboration', 'real-time', 'editing', 'workflow']
  },
  },
    id: 'ai-powered-1',
    title: 'AI Content Refinement Engine',
    description: 'Intelligent content analysis, suggestions, and automated quality improvements',
    icon: Brain,
    category: 'ai-powered',
    status: 'in-review',
    lastModified: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    author: 'Dr. Emma Thompson',
    wordCount: 4200,
    readTime: 17,
    tags: ['AI', 'NLP', 'content-analysis', 'automation']
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
  },
  {
    id: 'do178c-2',
    section: '6.3.1',
    requirement: 'Source code shall be reviewed',
    requirement: 'Source code shall be reviewed',
    evidence: ['code-review-template.md'],
    lastVerified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    riskLevel: 'high'
  },
  {
    id: 'as9100d-1',
    standard: 'AS9100D',
    section: '8.4.2',
    requirement: 'Quality management system requirements',
    status: 'compliant',
    evidence: ['QMS-manual.pdf', 'audit-report-2024.pdf'],
    lastVerified: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    riskLevel: 'low'
  }
  }
]

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
  },
  {
    id: 'ref-2',
    documentId: 'compliance-1',
    type: 'compliance',
    severity: 'high',
    suggestion: 'Add reference to DO-178C section 11.9 for verification procedures',
    explanation: 'Compliance documentation requires specific references to applicable standards',
    position: { start: 342, end: 398 },
    confidence: 0.94,
    status: 'pending',
    timestamp: new Date().toISOString()
  },
  {
    id: 'ref-3',
    documentId: '3d-modeling-1',
    type: 'technical',
    severity: 'low',
    suggestion: 'Specify WebGPU API version for compatibility clarity',
    explanation: 'Technical specifications should include version numbers for reproducibility',
    position: { start: 89, end: 142 },
    confidence: 0.76,
    status: 'accepted',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  }
]

const sampleRepositories: Repository[] = [
const sampleRepositories: Repository[] = [
  {
    id: 'repo-1',
    name: 'AQUA V. Local Physical Documents',
    path: '/local/templates/physical/',
    type: 'local',
    reality: 'PHYSL',
    status: 'active',
    description: 'Local repository for physical system documentation and manufacturing specs',
    documentCount: 127,
    lastSync: new Date().toISOString(),
    capabilities: ['versioning', 'offline-access', 'bulk-export'],
    securityLevel: 'internal',
    supportedFormats: ['markdown', 'html', 'docx', 'pdf']
  },
  {
    id: 'repo-2',
    name: 'Virtual Reality Development Hub',
    path: 'smb://aqua-v-net/vr-templates/',
    type: 'network',
    reality: 'VRTUL',
    status: 'active',
    description: 'Network repository for VR/AR documentation, 3D models, and immersive content',
    documentCount: 89,
    lastSync: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    capabilities: ['3d-preview', 'immersive-docs', 'collaborative-vr'],
    securityLevel: 'restricted',
    supportedFormats: ['html', 'xml', 'docx']
  },
  {
    id: 'repo-3',
    name: 'Augmented Reality Operations',
    path: 'https://cloud.aqua-v.com/ar-repo/',
    type: 'cloud',
    reality: 'AUGMT',
    status: 'syncing',
    description: 'Cloud repository for AR maintenance manuals and field operation guides',
    documentCount: 203,
    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    capabilities: ['ar-preview', 'field-sync', 'mobile-access', 'real-time-updates'],
    securityLevel: 'classified',
    supportedFormats: ['html', 'pdf', 'xml']
  },
  {
    id: 'repo-4',
    name: 'Mixed Reality Training Center',
    path: '/hybrid/mixrl-training/',
    type: 'hybrid',
    reality: 'MIXRL',
    status: 'active',
    description: 'Hybrid repository combining physical and digital training materials',
    documentCount: 156,
    lastSync: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    capabilities: ['mixed-reality', 'training-sims', 'assessment-tools'],
    securityLevel: 'internal',
    supportedFormats: ['markdown', 'html', 'docx']
  },
  {
    id: 'repo-5',
    name: 'Simulation Environment Library',
    path: 'local://simulation-docs/',
    type: 'local',
    reality: 'SIMUL',
    status: 'readonly',
    description: 'Read-only archive of simulation documentation and test scenarios',
    documentCount: 342,
    lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    capabilities: ['simulation-data', 'test-scenarios', 'archive-access'],
    securityLevel: 'public',
    supportedFormats: ['markdown', 'html', 'pdf']
  },
  {
    id: 'repo-6',
    name: 'Extended Reality Research',
    path: 'smb://research-net/xr-docs/',
    type: 'network',
    reality: 'EXTND',
    status: 'inactive',
    description: 'Research repository for extended reality experiments and prototypes',
    documentCount: 67,
    lastSync: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    capabilities: ['research-docs', 'prototype-specs', 'experimental-data'],
    securityLevel: 'restricted',
    supportedFormats: ['markdown', 'html', 'xml']
  }
]

const nomenclatureQuizSteps: QuizStep[] = [
  {
    id: 'line',
    field: 'line',
    question: 'What is the strategic product line for this artifact?',
    type: 'select',
    options: [
      { value: 'AMPEL3', label: 'AMPEL360', description: 'Advanced hybrid aircraft systems' },
      { value: 'GAIAIR', label: 'GAIA Air & Space', description: 'Space and atmospheric systems' },
      { value: 'ROBBBO', label: 'ROBBBO-T Robotics', description: 'Robotic and autonomous systems' },
      { value: 'QSERVS', label: 'Quantum Services', description: 'Quantum computing services' },
      { value: 'QPRODS', label: 'Quantum Products', description: 'Quantum hardware products' },
      { value: 'INFRAD', label: 'Digital Infrastructure', description: 'IT and digital systems' },
      { value: 'AQUART', label: 'Cross-Program', description: 'Multi-program initiatives' }
    ],
    helpText: 'Select the primary strategic line that best describes your artifact or system.',
    required: true
  },
  {
    id: 'product',
    field: 'product',
    question: 'What is the specific product designation?',
    type: 'select',
    options: [
      { value: 'BWB', label: 'BWB (Blended Wing Body)', description: 'Main aircraft configuration' },
      { value: 'FAL', label: 'FAL (Final Assembly Line)', description: 'Manufacturing system' },
      { value: 'QNS', label: 'QNS (Quantum Navigation)', description: 'Navigation quantum system' },
      { value: 'QPU', label: 'QPU (Quantum Processing)', description: 'Quantum processing unit' },
      { value: 'DIS', label: 'DIS (Digital Infrastructure)', description: 'Digital system' }
    ],
    dependencies: [
      { field: 'line', values: ['AMPEL3'] }
    ],
    helpText: 'Choose the product that corresponds to your selected strategic line.',
    required: true
  },
  {
    id: 'variant',
    field: 'variant',
    question: 'What is the product variant code?',
    type: 'input',
    validation: /^[A-Z0-9]{2,6}$/,
    helpText: 'Enter a 2-6 character alphanumeric code (e.g., Q100, V2, XR3).',
    required: true
  },
  {
    id: 'number',
    field: 'number',
    question: 'What is the sequential number for this item?',
    type: 'input',
    validation: /^[\d]{4,8}$/,
    required: true
  },
  {
    id: 'phase',
    field: 'phase',
    question: 'In which lifecycle phase is this document?',
    type: 'select',
    options: [
      { value: 'STR', label: 'Strategy & Planning', description: 'Strategic planning and business analysis' },
      { value: 'CON', label: 'Conceptual & Feasibility', description: 'Concept development and feasibility studies' },
      { value: 'DES', label: 'Design & Engineering', description: 'Detailed design and engineering' },
      { value: 'DEV', label: 'Development & Prototyping', description: 'Development and prototype creation' },
      { value: 'TST', label: 'Testing & Validation', description: 'Testing and validation activities' },
      { value: 'INT', label: 'Integration & Verification', description: 'System integration and verification' },
      { value: 'CRT', label: 'Certification & Compliance', description: 'Certification and regulatory compliance' },
      { value: 'PRD', label: 'Production & Manufacturing', description: 'Production and manufacturing' },
      { value: 'OPS', label: 'Operations & Service', description: 'Operational use and service' },
      { value: 'MNT', label: 'Maintenance & Support', description: 'Maintenance and support activities' }
    ],
    helpText: 'Select the current lifecycle phase of your artifact.',
    required: true
  },
  {
    id: 'criticality',
    field: 'criticality',
    question: 'What is the criticality level?',
    type: 'select',
    options: [
      { value: 'SE', label: 'Safety Essential', description: 'Critical for flight safety' },
      { value: 'MI', label: 'Mission Critical', description: 'Critical for mission success' },
      { value: 'GE', label: 'General', description: 'Standard operational criticality' },
      { value: 'RE', label: 'Regulatory', description: 'Required by regulation' }
    ],
    helpText: 'Classify the safety and mission criticality of this artifact.',
    required: true
  },
  {
    id: 'document',
    field: 'document',
    question: 'What type of document is this?',
    type: 'select',
    options: [
      { value: 'SRS', label: 'Software Requirements Specification', description: 'Software requirements document' },
      { value: 'HDD', label: 'Hardware Design Document', description: 'Hardware design specification' },
      { value: 'SDS', label: 'System Design Specification', description: 'System-level design document' },
      { value: 'TST', label: 'Test Specification', description: 'Test procedures and requirements' },
      { value: 'AMM', label: 'Aircraft Maintenance Manual', description: 'Maintenance procedures' },
      { value: 'POE', label: 'Plan of Execution', description: 'Execution and implementation plan' },
      { value: 'WHP', label: 'White Paper', description: 'Technical white paper or analysis' }
    ],
    helpText: 'Select the primary document type being created.',
    required: true
  },
  {
    id: 'reality',
    field: 'reality',
    question: 'What is the rendering reality context?',
    type: 'select',
    options: [
      { value: 'PHYSL', label: 'Physical Reality', description: 'Traditional documentation for physical systems' },
      { value: 'VRTUL', label: 'Virtual Reality', description: 'Immersive 3D documentation and training' },
      { value: 'AUGMT', label: 'Augmented Reality', description: 'Enhanced real-world documentation' },
      { value: 'MIXRL', label: 'Mixed Reality', description: 'Hybrid physical-digital experiences' },
      { value: 'SIMUL', label: 'Simulation', description: 'Virtual testing and scenario documentation' },
      { value: 'EXTND', label: 'Extended Reality', description: 'Advanced immersive technologies' },
      { value: 'HYBRD', label: 'Hybrid Reality', description: 'Multi-modal reality experiences' },
      { value: 'OPERT', label: 'Operational Reality', description: 'Live system documentation' }
    ],
    helpText: 'Choose the primary reality context for document rendering and interaction.',
    required: true
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
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentStep, setCurrentStep] = useState<GenerationStep>({ step: 'parsing', progress: 0 })
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [customPrompt, setCustomPrompt] = useState('')
  const [nomenclatureInput, setNomenclatureInput] = useState('')
  const [repositoryPath, setRepositoryPath] = useState('')
  const [outputFormat, setOutputFormat] = useState<'markdown' | 'html' | 'docx'>('markdown')
  const [currentDocument, setCurrentDocument] = useState<GeneratedDocument | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [parsedNomenclature, setParsedNomenclature] = useState<NomenclatureData | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  // Quiz states
  const [quizState, setQuizState] = useState<NomenclatureQuizState>({
    currentStep: 0,
    answers: {},
    completed: false,
    isActive: false
  })
  const [showQuizDialog, setShowQuizDialog] = useState(false)
  
  // Collaboration states
  const [collaborationSession, setCollaborationSession] = useState<CollaborationSession | null>(null)
  const [activeCollaborators, setActiveCollaborators] = useState<Collaborator[]>(sampleCollaborators.filter(c => c.status === 'online'))
  const [comments, setComments] = useKV<Comment[]>('document-comments', [])
  const [newComment, setNewComment] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [isEditingMode, setIsEditingMode] = useState(false)
  const [editContent, setEditContent] = useState('')
  const [collaborativeDocument, setCollaborativeDocument] = useState<GeneratedDocument | null>(null)
  const editorRef = useRef<HTMLTextAreaElement>(null)
  
  // Repository and reality management
  const [repositories] = useKV<Repository[]>('configured-repositories', sampleRepositories)
  const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null)
  const [repositoryFilter, setRepositoryFilter] = useState<string>('all')
  const [browsingRepository, setBrowsingRepository] = useState<Repository | null>(null)
  const [repositoryContents, setRepositoryContents] = useState<any[]>([])
  const [loadingRepository, setLoadingRepository] = useState(false)
  const [repositorySearchQuery, setRepositorySearchQuery] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  // New documentation platform states
  // New documentation platform states
  const [documentationSections] = useKV<DocumentationSection[]>('documentation-sections', sampleDocumentationSections)
  const [complianceRequirements] = useKV<ComplianceRequirement[]>('compliance-requirements', sampleComplianceRequirements)
  const [aiRefinements] = useKV<AIRefinement[]>('ai-refinements', sampleAIRefinements)
  const [selectedSection, setSelectedSection] = useState<DocumentationSection | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [aiAnalysisRunning, setAiAnalysisRunning] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState<AIContentAnalysis | null>(null)
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [refinementFilter, setRefinementFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all')

  const [savedTemplates, setSavedTemplates] = useKV<Template[]>('custom-templates', [])

  const phases = ['STR', 'CON', 'DES', 'DEV', 'TST', 'INT', 'CRT', 'PRD', 'OPS', 'MNT', 'REP', 'UPG', 'EXT', 'RET', 'AUD']
  const categories = ['automation', 'compliance', '3d-modeling', 'collaboration', 'ai-powered']
  const categories = ['automation', 'compliance', '3d-modeling', 'collaboration', 'ai-powered']

  // AI Content Analysis function
  const runAIAnalysis = async (content: string) => {
    setAiAnalysisRunning(true)
    setShowAIPanel(true)
    
    try {
      const prompt = spark.llmPrompt`Analyze this technical documentation content for quality and compliance:

${content}

Provide analysis in the following format:
- Readability score (0-100)
- Technical accuracy assessment (0-100)
- Compliance score for aerospace standards (0-100)
- Specific suggestions for improvement
- Quality metrics: clarity, completeness, consistency, correctness (each 0-100)

Focus on aerospace documentation standards, DO-178C compliance, and technical writing best practices.`

      const analysis = await spark.llm(prompt)
      
      // Parse AI response and create analysis object
      const mockAnalysis: AIContentAnalysis = {
        readabilityScore: 87,
        technicalAccuracy: 92,
        complianceScore: 85,
        suggestions: aiRefinements.filter(r => r.status === 'pending'),
        qualityMetrics: {
          clarity: 88,
          completeness: 90,
          consistency: 85,
          correctness: 94
        }
      }
      
      setCurrentAnalysis(mockAnalysis)
      toast.success('AI analysis completed')
    } catch (error) {
      toast.error('AI analysis failed')
    } finally {
      setAiAnalysisRunning(false)
    }
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'automation': return Robot
      case 'compliance': return Shield
      case '3d-modeling': return Cube
      case 'collaboration': return Users
      case 'ai-powered': return Brain
      default: return FileText
    }
  }

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
  const filteredSections = documentationSections.filter(section => {
    const matchesSearch = section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         section.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || section.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Filter AI refinements
  const filteredRefinements = aiRefinements.filter(refinement => {
    if (refinementFilter === 'all') return true
    return refinement.status === refinementFilter
  })

  const startQuiz = () => {
    setQuizState({
      currentStep: 0,
      answers: {},
      completed: false,
      isActive: true
    })
    setShowQuizDialog(true)
  }

  const nextQuizStep = () => {
    if (quizState.currentStep < nomenclatureQuizSteps.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1
      }))
    } else {
      completeQuiz()
    }
  }

  const prevQuizStep = () => {
    if (quizState.currentStep > 0) {
      setQuizState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1
      }))
    }
  }

  const updateQuizAnswer = (field: keyof NomenclatureData, value: string) => {
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [field]: value
      }
    }))
  }

  const completeQuiz = () => {
    const answers = quizState.answers
    const nomenclatureCode = `${answers.line || ''}-${answers.product || ''}-${answers.variant || ''}-${answers.number || ''}-${answers.phase || ''}-${answers.criticality || ''}-${answers.document || ''}-TSG-TR-VF-E001-0001-${answers.reality || ''}-07150000000-MUL-v1.0.0`
    
    setNomenclatureInput(nomenclatureCode)
    setQuizState(prev => ({
      ...prev,
      completed: true,
      isActive: false
    }))
    setShowQuizDialog(false)
    
    toast.success('Nomenclature code generated successfully!')
  }

  const getCurrentQuizStep = () => {
    return nomenclatureQuizSteps[quizState.currentStep]
  }

  const isQuizStepValid = () => {
    const currentStep = getCurrentQuizStep()
    if (!currentStep) return false
    
    const answer = quizState.answers[currentStep.field]
    if (currentStep.required && !answer) return false
    
    if (currentStep.validation && answer) {
      return currentStep.validation.test(answer)
    }
    
    return true
  }

  const getFilteredQuizOptions = () => {
    const currentStep = getCurrentQuizStep()
    if (!currentStep || !currentStep.dependencies) return currentStep?.options || []
    
    // Filter options based on dependencies
    for (const dependency of currentStep.dependencies) {
      const dependencyValue = quizState.answers[dependency.field]
      if (dependencyValue && dependency.values.includes(dependencyValue)) {
        return currentStep.options || []
      }
    }
    
    return []
  }

  // Parse AQUA V. nomenclature
  // Parse AQUA V. nomenclature
    try {
      const parts = nomenclature.trim().split('-')
      if (parts.length < 13) {
        throw new Error('Invalid nomenclature format')
      }

      const parsed: NomenclatureData = {
        line: parts[0],
        product: parts[1], 
        variant: parts[2],
        number: parts[3],
        phase: parts[4],
        criticality: parts[5],
        document: parts[6],
        application: parts[7],
        method: parts.slice(8, 12).join('-'),
        reality: parts[12],
        utcs: parts[13],
        regulatory: parts[14],
        version: parts[15] || 'v1.0.0',
        parsed: true,
        description: generateNomenclatureDescription(parts[0], parts[1], parts[4], parts[6])
      }

      return parsed
    } catch (error) {
      return null
    }
  }

  const generateNomenclatureDescription = (line: string, product: string, phase: string, doc: string): string => {
    const lineDescriptions: Record<string, string> = {
      'AMPEL3': 'AMPEL360 Aircraft',
      'GAIAIR': 'GAIA Air & Space',
      'ROBBBO': 'ROBBBO-T Robotics',
      'QSERVS': 'Quantum Services',
      'QPRODS': 'Quantum Products',
      'INFRAD': 'Digital Infrastructure',
      'AQUART': 'Cross-Program'
    }

    const phaseDescriptions: Record<string, string> = {
      'STR': 'Strategy',
      'STR': 'Strategy',
      'CON': 'Conceptual',
      'DES': 'Design',
      'DEV': 'Development',
      'TST': 'Testing',
      'PRD': 'Production',
      'MNT': 'Maintenance',
      'OPS': 'Operations'
    }

    return `${lineDescriptions[line] || line} ${phaseDescriptions[phase] || phase} ${doc} Document`

  const validateNomenclaturePattern = (nomenclature: NomenclatureData, template: Template): boolean => {
    if (!template.nomenclaturePattern) return true
    
    
    const pattern = template.nomenclaturePatternclature.product}-${nomenclature.variant}-${nomenclature.number}-${nomenclature.phase}-${nomenclature.criticality}-${nomenclature.document}-${nomenclature.application}-${nomenclature.method}-${nomenclature.reality}-${nomenclature.utcs}-${nomenclature.regulatory}-${nomenclature.version}`
    const actual = `${nomenclature.line}-${nomenclature.product}-${nomenclature.variant}-${nomenclature.number}-${nomenclature.phase}-${nomenclature.criticality}-${nomenclature.document}-${nomenclature.application}-${nomenclature.method}-${nomenclature.reality}-${nomenclature.utcs}-${nomenclature.regulatory}-${nomenclature.version}`
    
    // Simple wildcard matching
    const regexPattern = pattern.replace(/\*/g, '[^-]+')
    return new RegExp(`^${regexPattern}$`).test(actual)
  }

  // Simulate real-time collaboration
  useEffect(() => { && isEditingMode) {
    if (collaborativeDocument && isEditingMode) {
      const interval = setInterval(() => {
        // Simulate cursor positions and selections from other users
        setActiveCollaborators(prev => prev.map(collaborator => ({
          ...collaborator,
          cursor: {
            line: Math.floor(Math.random() * 20) + 1,
            character: Math.floor(Math.random() * 80)
          }
        })))0)
      }, 3000)
return () => clearInterval(interval)
      return () => clearInterval(interval)
    }
  }, [collaborativeDocument, isEditingMode])
ing = (document: GeneratedDocument) => {
  const startCollaborativeEditing = (document: GeneratedDocument) => {
    setCollaborativeDocument(document)
    setEditContent(document.rawContent)
    setIsEditingMode(true)
    sion
    // Create collaboration session
    const session: CollaborationSession = {
      id: `session-${Date.now()}`,
      documentId: document.id,rators, {
      participants: [...activeCollaborators, {
        id: 'current-user',
        name: 'You',=You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        email: 'you@aqua-v.com',
        status: 'online',()
        lastSeen: new Date().toISOString()
      }],ers: ['current-user', ...activeCollaborators.map(c => c.id)],
      activeUsers: ['current-user', ...activeCollaborators.map(c => c.id)],
      startTime: new Date().toISOString(),()
      lastActivity: new Date().toISOString()
    }
    (session)
    setCollaborationSession(session)
    toast.success('Collaborative editing started')
  }
 {
  const saveCollaborativeChanges = () => {
    if (collaborativeDocument && editContent) {
      const updatedDocument: GeneratedDocument = {
        ...collaborativeDocument,
        rawContent: editContent,tent,
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
uments(current => 
      setGeneratedDocuments(current => c)
        current.map(doc => doc.id === collaborativeDocument.id ? updatedDocument : doc)
      )
      
      setCollaborativeDocument(updatedDocument)
      toast.success('Changes saved successfully')

  const addComment = () => {
    if (!newComment.trim() || !collaborativeDocument) return
  const addComment = () => {
    if (!newComment.trim() || !collaborativeDocument) return

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: {
        id: 'current-user',
        name: 'You',-v.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        email: 'you@aqua-v.com',
        status: 'online',
        lastSeen: new Date().toISOString()
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      resolved: false,

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

  const getRealityColor = (reality: Repository['reality']) => {
    switch (reality) {
      case 'PHYSL': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'VRTUL': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'AUGMT': return 'bg-green-100 text-green-800 border-green-200'
      case 'MIXRL': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'SIMUL': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'EXTND': return 'bg-pink-100 text-pink-800 border-pink-200'
      case 'HYBRD': return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'OPERT': return 'bg-teal-100 text-teal-800 border-teal-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getRealityDescription = (reality: Repository['reality']) => {
    switch (reality) {
      case 'PHYSL': return 'Physical Reality - Traditional documentation for physical systems'
      case 'VRTUL': return 'Virtual Reality - Immersive 3D documentation and training'
      case 'AUGMT': return 'Augmented Reality - Enhanced real-world documentation'
      case 'MIXRL': return 'Mixed Reality - Hybrid physical-digital experiences'
      case 'SIMUL': return 'Simulation - Virtual testing and scenario documentation'
      case 'EXTND': return 'Extended Reality - Advanced immersive technologies'
      case 'HYBRD': return 'Hybrid Reality - Multi-modal reality experiences'
      case 'OPERT': return 'Operational Reality - Live system documentation'
      default: return 'Unknown Reality Context'
    }
  }

  const getStatusColor = (status: Repository['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'syncing': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'readonly': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleBrowseRepository = async (repo: Repository) => {
    setBrowsingRepository(repo)
    setLoadingRepository(true)
    setRepositorySearchQuery('')
    setSelectedFiles([])
    
    try {
      // Simulate repository browsing
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock repository contents based on reality type
      const mockContents = generateMockRepositoryContents(repo)
      setRepositoryContents(mockContents)
      
      toast.success(`Connected to ${repo.name}`)
    } catch (error) {
      toast.error(`Failed to browse ${repo.name}`)
      setBrowsingRepository(null)
    } finally {
      setLoadingRepository(false)
    }
  }

  const handleFileSelection = (fileName: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileName) 
        ? prev.filter(f => f !== fileName)
        : [...prev, fileName]
    )
  }

  const handleDownloadSelected = () => {
    if (selectedFiles.length === 0) {
      toast.error('No files selected')
      return
    }
    
    toast.success(`Downloading ${selectedFiles.length} file(s) from ${browsingRepository?.name}`)
    setSelectedFiles([])
  }

  const filteredRepositoryContents = repositoryContents.filter(item =>
    item.name.toLowerCase().includes(repositorySearchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(repositorySearchQuery.toLowerCase())
  )

  const generateMockRepositoryContents = (repo: Repository) => {
    const baseContents = [
      { 
        name: 'templates/', 
        type: 'folder', 
        size: null, 
        modified: new Date().toISOString(),
        reality: repo.reality,
        description: 'Template files organized by phase'
      },
      { 
        name: 'generated/', 
        type: 'folder', 
        size: null, 
        modified: new Date().toISOString(),
        reality: repo.reality,
        description: 'Generated documents'
      },
      { 
        name: 'archive/', 
        type: 'folder', 
        size: null, 
        modified: new Date().toISOString(),
        reality: repo.reality,
        description: 'Archived documents'
      },
      { 
        name: 'README.md', 
        type: 'file', 
        size: '2.1 KB', 
        modified: new Date().toISOString(),
        reality: repo.reality,
        description: 'Repository documentation and usage guidelines'
      }
    ]

    switch (repo.reality) {
      case 'PHYSL':
        return [
          ...baseContents,
          { 
            name: 'manufacturing-specs.pdf', 
            type: 'file', 
            size: '2.3 MB', 
            modified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            reality: 'PHYSL',
            description: 'Physical manufacturing specifications'
          },
          { 
            name: 'assembly-manual.docx', 
            type: 'file', 
            size: '1.8 MB', 
            modified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            reality: 'PHYSL',
            description: 'Physical assembly procedures'
          },
          { 
            name: 'quality-standards.xlsx', 
            type: 'file', 
            size: '845 KB', 
            modified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            reality: 'PHYSL',
            description: 'Quality control standards and metrics'
          }
        ]
      case 'VRTUL':
        return [
          ...baseContents,
          { 
            name: 'vr-training-modules/', 
            type: 'folder', 
            size: null, 
            modified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            reality: 'VRTUL',
            description: 'Virtual reality training content'
          },
          { 
            name: '3d-models.zip', 
            type: 'file', 
            size: '15.2 MB', 
            modified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            reality: 'VRTUL',
            description: '3D model assets for VR'
          },
          { 
            name: 'vr-scene-config.json', 
            type: 'file', 
            size: '127 KB', 
            modified: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            reality: 'VRTUL',
            description: 'VR scene configuration and settings'
          },
          { 
            name: 'immersive-docs.html', 
            type: 'file', 
            size: '3.4 MB', 
            modified: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            reality: 'VRTUL',
            description: 'Interactive VR documentation'
          }
        ]
      case 'AUGMT':
        return [
          ...baseContents,
          { 
            name: 'ar-maintenance-guides/', 
            type: 'folder', 
            size: null, 
            modified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            reality: 'AUGMT',
            description: 'AR-enhanced maintenance documentation'
          },
          { 
            name: 'spatial-anchors.json', 
            type: 'file', 
            size: '156 KB', 
            modified: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            reality: 'AUGMT',
            description: 'AR spatial positioning data'
          },
          { 
            name: 'ar-overlay-templates.xml', 
            type: 'file', 
            size: '892 KB', 
            modified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            reality: 'AUGMT',
            description: 'AR overlay templates and configurations'
          },
          { 
            name: 'field-manual-ar.pdf', 
            type: 'file', 
            size: '12.7 MB', 
            modified: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            reality: 'AUGMT',
            description: 'Field manual with AR enhancement markers'
          }
        ]
      case 'SIMUL':
        return [
          ...baseContents,
          { 
            name: 'test-scenarios/', 
            type: 'folder', 
            size: null, 
            modified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            reality: 'SIMUL',
            description: 'Simulation test scenarios'
          },
          { 
            name: 'test-data.csv', 
            type: 'file', 
            size: '2.1 MB', 
            modified: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            reality: 'SIMUL',
            description: 'Simulation test results'
          },
          { 
            name: 'physics-models.json', 
            type: 'file', 
            size: '2.3 MB', 
            modified: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            reality: 'SIMUL',
            description: 'Physics simulation models and parameters'
          },
          { 
            name: 'validation-reports.html', 
            type: 'file', 
            size: '1.9 MB', 
            modified: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
            reality: 'SIMUL',
            description: 'Simulation validation and verification reports'
          }
        ]
      case 'MIXRL':
        return [
          ...baseContents,
          { 
            name: 'mixed-reality-training/', 
            type: 'folder', 
            size: null, 
            modified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            reality: 'MIXRL',
            description: 'Mixed reality training materials'
          },
          { 
            name: 'holographic-displays.xml', 
            type: 'file', 
            size: '678 KB', 
            modified: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            reality: 'MIXRL',
            description: 'Holographic display configurations'
          }
        ]
      default:
        return baseContents
    }
  }

  const filteredRepositories = repositories.filter(repo => {
    if (repositoryFilter === 'all') return true
    return repo.reality === repositoryFilter
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
    setIsGenerating(true)
    setIsDialogOpen(true)

    try {
      // Step 1: Parse nomenclature if provided
      let nomenclatureData: NomenclatureData | null = null
      
      if (nomenclatureInput.trim()) {
        setCurrentStep({ step: 'parsing', progress: 25, message: 'Parsing AQUA V. nomenclature...' })
        
        nomenclatureData = parseNomenclature(nomenclatureInput)
        if (!nomenclatureData) {
          throw new Error('Invalid nomenclature format. Please check the AQUA V. nomenclature structure.')
        }

        // Validate compatibility
        if (!validateNomenclaturePattern(nomenclatureData, template)) {
          toast.error('Nomenclature pattern does not match template requirements')
        }

        setParsedNomenclature(nomenclatureData)
        setCurrentStep({ 
          step: 'parsing', 
          progress: 50, 
          message: `Parsed: ${nomenclatureData.description}`,
          nomenclatureData 
        })
        
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      // Step 2: Generate content with AI
      setCurrentStep({ step: 'generating', progress: 60, message: 'Generating document content...' })
      
      const contextPrompt = nomenclatureData ? `
        AQUA V. Nomenclature Context:
        Line: ${nomenclatureData.line} (${nomenclatureData.description})
        Product: ${nomenclatureData.product}-${nomenclatureData.variant}
        Phase: ${nomenclatureData.phase}
        Document Type: ${nomenclatureData.document}
        Reality Context: ${nomenclatureData.reality}
        Criticality: ${nomenclatureData.criticality}
        Regulatory: ${nomenclatureData.regulatory}
      ` : ''

      const prompt = spark.llmPrompt`Generate a comprehensive ${template.name} document in ${outputFormat} format.

      ${contextPrompt}
      
      Template Requirements:
      - Name: ${template.name}
      - Description: ${template.description} 
      - Phase: ${template.phase}
      - Document Code: ${template.docCode}
      - Output Format: ${outputFormat}
      
      Additional Context: ${customPrompt || 'Follow aerospace industry standards and best practices for technical documentation.'}
      
      Requirements:
      1. Create comprehensive, industry-standard documentation
      2. Include proper section headers and structure
      3. Add relevant technical specifications where applicable
      4. Include compliance and regulatory considerations
      5. Format appropriately for ${outputFormat}
      
      ${outputFormat === 'markdown' ? 'Use proper markdown syntax with headers, lists, tables, and code blocks.' : ''}
      ${outputFormat === 'html' ? 'Use proper HTML5 structure and styling classes.' : ''}
      
      The document should be production-ready and comprehensive.`

      const rawContent = await spark.llm(prompt)
      
      setCurrentStep({ step: 'raw-review', progress: 85, message: 'Content generated successfully' })
      
      // Create the document object
      const newDocument: GeneratedDocument = {
        id: `doc-${Date.now()}`,
        templateId: template.id,
        name: nomenclatureData ? 
          `${nomenclatureData.description} - ${new Date().toLocaleDateString()}` :
          `${template.name} - Generated ${new Date().toLocaleDateString()}`,
        rawContent: rawContent,
        renderedContent: rawContent,
        format: outputFormat,
        status: 'draft',
        metadata: {
          author: 'AQUA V. AI Generator',
          created: new Date().toISOString(),
          repository: selectedRepository?.path || repositoryPath || 'local://documents/',
          version: nomenclatureData?.version || '1.0.0',
          lastModified: new Date().toISOString()
        }
      }

      setCurrentDocument(newDocument)
      setCurrentStep({ step: 'raw-review', progress: 100, message: 'Ready for review' })

    } catch (error) {
      toast.error(`Generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
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
          lastModified: new Date().toISOString(),
          repository: selectedRepository?.path || repositoryPath || 'local://documents/',
          repositoryId: selectedRepository?.id,
          reality: selectedRepository?.reality
        }
      }

      setGeneratedDocuments(current => [...current, finalDocument])
      
      if (selectedRepository) {
        toast.success(`Document published to ${selectedRepository.name} (${selectedRepository.reality})`)
      } else if (repositoryPath) {
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
              {documentationSections.map((section) => (
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
                  
                  {/* Child sections */}
                  {!sidebarCollapsed && section.children && selectedSection?.id === section.id && (
                    <div className="ml-6 mt-1 space-y-1">
                      {section.children.map((child) => (
                        <Button
                          key={child.id}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-xs"
                          onClick={() => setSelectedSection(child)}
                        >
                          <child.icon size={14} className="mr-2" />
                          {child.title}
                        </Button>
                      ))}
                    </div>
                  )}
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
                <Button variant="outline" size="sm" onClick={startQuiz}>
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
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-48">
                        <Filter size={16} className="mr-2" />
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="documentation">Documentation</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  <TabsTrigger value="ai-refinements">AI Refinements</TabsTrigger>
                  <TabsTrigger value="3d-models">3D Models</TabsTrigger>
                  <TabsTrigger value="repositories">Repositories</TabsTrigger>
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
                            <div className="text-2xl font-bold">{documentationSections.length}</div>
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
                              {complianceRequirements.filter(req => req.status === 'compliant').length}
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
                              {aiRefinements.filter(ref => ref.status === 'pending').length}
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
                            <div className="text-2xl font-bold">{activeCollaborators.length}</div>
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
                        {complianceRequirements.map((requirement) => (
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
                      <Button onClick={() => runAIAnalysis('Sample content for analysis')}>
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

                <TabsContent value="repositories" className="space-y-6">
                  <div className="grid gap-4">
                    {repositories.map((repo) => (
                      <Card key={repo.id}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3">
                            <FolderOpen size={20} />
                            {repo.name}
                            <Badge variant="outline" className={getRealityColor(repo.reality)}>
                              {repo.reality}
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(repo.status)}>
                              {repo.status}
                            </Badge>
                          </CardTitle>
                          <CardDescription>{repo.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              {repo.documentCount} documents • {repo.type} repository
                            </div>
                            <Button variant="outline" size="sm">
                              <Eye size={16} className="mr-2" />
                              Browse
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            // Selected Section Content
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
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
                {aiAnalysisRunning && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse ml-2" />
                )}
              </DialogTitle>
            </DialogHeader>
            
            {aiAnalysisRunning ? (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Brain size={48} className="mx-auto text-primary animate-pulse mb-4" />
                  <h3 className="text-lg font-medium mb-2">Analyzing Content</h3>
                  <p className="text-muted-foreground">
                    AI is analyzing the document for quality, compliance, and technical accuracy...
                  </p>
                </div>
                <Progress value={65} className="w-full" />
              </div>
            ) : currentAnalysis ? (
              <div className="space-y-6">
                {/* Quality Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{currentAnalysis.readabilityScore}</div>
                        <div className="text-sm text-muted-foreground">Readability Score</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{currentAnalysis.technicalAccuracy}</div>
                        <div className="text-sm text-muted-foreground">Technical Accuracy</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{currentAnalysis.complianceScore}</div>
                        <div className="text-sm text-muted-foreground">Compliance Score</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{currentAnalysis.suggestions.length}</div>
                        <div className="text-sm text-muted-foreground">Suggestions</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quality Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quality Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(currentAnalysis.qualityMetrics).map(([metric, score]) => (
                        <div key={metric} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{metric}</span>
                            <span>{score}%</span>
                          </div>
                          <Progress value={score} className="w-full" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-8">
                <Brain size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Ready for Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Select a document section to run AI-powered content analysis
                </p>
                <Button onClick={() => runAIAnalysis('Sample content')}>
                  <Lightning size={16} className="mr-2" />
                  Start Analysis
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )

          <TabsContent value="quiz" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Driven Prompting Quiz</h2>
                <p className="text-sm text-muted-foreground">Interactive guided questionnaire for AQUA V. nomenclature generation</p>
              </div>
              <Button onClick={startQuiz} className="flex items-center gap-2">
                <Compass size={16} />
                Start Guided Quiz
              </Button>
            </div>

            {/* Quiz Progress Indicator */}
            {quizState.isActive && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen size={20} />
                    Quiz Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={(quizState.currentStep / nomenclatureQuizSteps.length) * 100} className="w-full" />
                    <div className="text-sm text-muted-foreground">
                      Step {quizState.currentStep + 1} of {nomenclatureQuizSteps.length}: {getCurrentQuizStep()?.question}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quiz Results */}
            {quizState.completed && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-green-500" />
                    Nomenclature Generated
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <Label className="text-sm font-medium">Generated Code:</Label>
                      <code className="block mt-1 font-mono text-sm bg-background p-2 rounded border">
                        {nomenclatureInput}
                      </code>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {Object.entries(quizState.answers).map(([key, value]) => value && (
                        <div key={key}>
                          <span className="text-muted-foreground capitalize">{key}:</span>
                          <span className="ml-2 font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quiz Overview */}
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>How Driven Prompting Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-primary">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Interactive Guidance</h4>
                          <p className="text-sm text-muted-foreground">Step-by-step questions guide you through nomenclature creation</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-primary">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Real-time Validation</h4>
                          <p className="text-sm text-muted-foreground">Each input is validated against AQUA V. standards</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-primary">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Automatic Generation</h4>
                          <p className="text-sm text-muted-foreground">Complete nomenclature code generated automatically</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quiz Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-primary">For New Users</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Learn AQUA V. nomenclature structure</li>
                        <li>• Understand field relationships</li>
                        <li>• Avoid common mistakes</li>
                        <li>• Get contextual help and examples</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-primary">For Experienced Users</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Ensure compliance with latest standards</li>
                        <li>• Reduce manual typing errors</li>
                        <li>• Speed up nomenclature creation</li>
                        <li>• Maintain consistency across projects</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quiz Dialog */}
            <Dialog open={showQuizDialog} onOpenChange={setShowQuizDialog}>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Compass size={20} />
                    AQUA V. Nomenclature Quiz
                    <Badge variant="outline" className="ml-2">
                      Step {quizState.currentStep + 1} of {nomenclatureQuizSteps.length}
                    </Badge>
                  </DialogTitle>
                </DialogHeader>
                
                {quizState.isActive && getCurrentQuizStep() && (
                  <div className="space-y-6">
                    <Progress value={(quizState.currentStep / nomenclatureQuizSteps.length) * 100} className="w-full" />
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">{getCurrentQuizStep().question}</h3>
                        {getCurrentQuizStep().helpText && (
                          <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                            <HelpCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{getCurrentQuizStep().helpText}</p>
                          </div>
                        )}
                      </div>

                      {getCurrentQuizStep().type === 'select' && (
                        <div className="space-y-2">
                          {getFilteredQuizOptions().map((option) => (
                            <Card 
                              key={option.value}
                              className={`cursor-pointer transition-all hover:shadow-md ${
                                quizState.answers[getCurrentQuizStep().field] === option.value 
                                  ? 'border-primary bg-primary/5' 
                                  : ''
                              }`}
                              onClick={() => updateQuizAnswer(getCurrentQuizStep().field, option.value)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="font-medium">{option.label}</div>
                                    {option.description && (
                                      <div className="text-sm text-muted-foreground mt-1">{option.description}</div>
                                    )}
                                  </div>
                                  <div className="ml-4">
                                    <Badge variant="outline" className="font-mono text-xs">
                                      {option.value}
                                    </Badge>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}

                      {getCurrentQuizStep().type === 'input' && (
                        <div className="space-y-2">
                          <Input
                            value={quizState.answers[getCurrentQuizStep().field] || ''}
                            onChange={(e) => updateQuizAnswer(getCurrentQuizStep().field, e.target.value)}
                            placeholder={`Enter ${getCurrentQuizStep().field}...`}
                            className="font-mono"
                          />
                          {getCurrentQuizStep().validation && quizState.answers[getCurrentQuizStep().field] && !getCurrentQuizStep().validation!.test(quizState.answers[getCurrentQuizStep().field]!) && (
                            <div className="flex items-center gap-2 text-sm text-destructive">
                              <Warning size={14} />
                              Invalid format. Please check the help text above.
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <Button 
                        variant="outline" 
                        onClick={prevQuizStep}
                        disabled={quizState.currentStep === 0}
                      >
                        <ArrowLeft size={16} className="mr-2" />
                        Previous
                      </Button>
                      
                      <div className="text-sm text-muted-foreground">
                        {quizState.currentStep + 1} of {nomenclatureQuizSteps.length}
                      </div>
                      
                      <Button 
                        onClick={nextQuizStep}
                        disabled={!isQuizStepValid()}
                      >
                        {quizState.currentStep === nomenclatureQuizSteps.length - 1 ? (
                          <>
                            <CheckCircle size={16} className="mr-2" />
                            Complete
                          </>
                        ) : (
                          <>
                            Next
                            <ArrowRight size={16} className="ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

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
                  <Card className="h-full cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2 line-clamp-2">{template.name}</CardTitle>
                          <CardDescription className="text-sm line-clamp-3">
                            {template.description}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className={getCriticalityColor(template.criticality)}>
                          {template.criticality}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-mono bg-muted px-2 py-1 rounded text-xs">
                            {template.phase || 'N/A'}
                          </span>
                          <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                            {template.docCode || 'N/A'}
                          </span>
                          <span className="text-xs">{template.version || 'v1.0.0'}</span>
                        </div>

                        {/* Reality Compatibility */}
                        {template.compatibleRealities && template.compatibleRealities.length > 0 && (
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Reality Support
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {template.compatibleRealities.slice(0, 3).map(reality => (
                                <Badge key={reality} variant="secondary" className="text-xs px-2 py-0.5">
                                  {reality}
                                </Badge>
                              ))}
                              {template.compatibleRealities.length > 3 && (
                                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                  +{template.compatibleRealities.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Nomenclature Pattern Hint */}
                        {template.nomenclaturePattern && (
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Pattern
                            </div>
                            <code className="text-xs bg-muted/50 px-2 py-1 rounded block truncate">
                              {template.nomenclaturePattern.replace(/\*/g, '•')}
                            </code>
                          </div>
                        )}
                        
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              className="w-full" 
                              size="sm"
                              onClick={() => {
                                setSelectedTemplate(template)
                                setNomenclatureInput('')
                                setParsedNomenclature(null)
                                setCustomPrompt('')
                                setCurrentStep({ step: 'parsing', progress: 0 })
                              }}
                            >
                              <Lightning size={16} className="mr-2" />
                              Generate Template
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Robot size={20} />
                                Generate {selectedTemplate?.name || template.name}
                                {selectedTemplate && (
                                  <Badge variant="outline" className="ml-2">
                                    {selectedTemplate.phase} • {selectedTemplate.criticality}
                                  </Badge>
                                )}
                              </DialogTitle>
                            </DialogHeader>
                            
                            {!isGenerating ? (
                              <div className="space-y-6">
                                {/* Nomenclature Input Section */}
                                <div className="border rounded-lg p-4 bg-muted/50">
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <Hash size={18} className="text-primary" />
                                      <Label className="text-base font-medium">AQUA V. Nomenclature</Label>
                                      <Badge variant="secondary" className="text-xs">Enhanced Context</Badge>
                                    </div>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setIsDialogOpen(false)
                                        startQuiz()
                                      }}
                                    >
                                      <Compass size={14} className="mr-1" />
                                      Use Quiz
                                    </Button>
                                  </div>
                                  <div className="space-y-3">
                                    <Input
                                      placeholder="e.g., AMPEL3-BWB-Q100-0001-MNT-SE-AMM-TSG-TR-VF-E001-0001-AUGMT-07150000000-MUL-v2.0.0"
                                      value={nomenclatureInput}
                                      onChange={(e) => setNomenclatureInput(e.target.value)}
                                      className="font-mono text-sm"
                                    />
                                    {nomenclatureInput && (
                                      <div className="text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                          <Info size={14} />
                                          <span>Will be parsed to enhance document generation with specific context</span>
                                        </div>
                                      </div>
                                    )}
                                    {!nomenclatureInput && (
                                      <div className="text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                          <HelpCircle size={14} />
                                          <span>Optional: Use the guided quiz to build a valid nomenclature code, or enter manually</span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Configuration Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">Generation Settings</h4>
                                    <div className="space-y-3">
                                      <div>
                                        <Label htmlFor="format">Output Format</Label>
                                        <Select value={outputFormat} onValueChange={(value: 'markdown' | 'html' | 'docx') => setOutputFormat(value)}>
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="markdown">
                                              <div className="flex items-center gap-2">
                                                <Code size={16} />
                                                Markdown
                                              </div>
                                            </SelectItem>
                                            <SelectItem value="html">
                                              <div className="flex items-center gap-2">
                                                <FileText size={16} />
                                                HTML5
                                              </div>
                                            </SelectItem>
                                            <SelectItem value="docx">
                                              <div className="flex items-center gap-2">
                                                <FileText size={16} />
                                                Word Document
                                              </div>
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label htmlFor="repository">Repository Selection</Label>
                                        <Select value={selectedRepository?.id || ''} onValueChange={(value) => {
                                          const repo = repositories.find(r => r.id === value)
                                          setSelectedRepository(repo || null)
                                          setRepositoryPath(repo?.path || '')
                                        }}>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select repository..." />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {repositories.filter(r => r.status !== 'error' && r.status !== 'inactive').map(repo => (
                                              <SelectItem key={repo.id} value={repo.id}>
                                                <div className="flex items-center gap-2">
                                                  <Badge variant="outline" className={getRealityColor(repo.reality)}>
                                                    {repo.reality}
                                                  </Badge>
                                                  <span>{repo.name}</span>
                                                  <Badge variant="secondary" className="text-xs">
                                                    {repo.type}
                                                  </Badge>
                                                </div>
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        {selectedRepository && (
                                          <div className="mt-2 p-2 bg-muted/30 rounded text-xs">
                                            <div className="font-medium">{getRealityDescription(selectedRepository.reality)}</div>
                                            <div className="text-muted-foreground mt-1">{selectedRepository.description}</div>
                                          </div>
                                        )}
                                      </div>
                                      <div>
                                        <Label htmlFor="repository-path">Repository Path (optional override)</Label>
                                        <Input
                                          id="repository-path"
                                          placeholder="Override path if needed..."
                                          value={repositoryPath}
                                          onChange={(e) => setRepositoryPath(e.target.value)}
                                          className="font-mono text-sm"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">Template Info</h4>
                                    <div className="space-y-3 bg-muted/30 p-3 rounded-lg">
                                      <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Phase:</span>
                                        <Badge variant="outline">{selectedTemplate?.phase || template.phase}</Badge>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Document Code:</span>
                                        <code className="bg-muted px-1 rounded text-xs">{selectedTemplate?.docCode || template.docCode}</code>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Criticality:</span>
                                        <Badge variant="outline" className={getCriticalityColor(selectedTemplate?.criticality || template.criticality)}>
                                          {selectedTemplate?.criticality || template.criticality}
                                        </Badge>
                                      </div>
                                      {(selectedTemplate?.compatibleRealities || template.compatibleRealities) && (
                                        <div className="text-sm">
                                          <span className="text-muted-foreground">Compatible Realities:</span>
                                          <div className="flex flex-wrap gap-1 mt-1">
                                            {(selectedTemplate?.compatibleRealities || template.compatibleRealities)?.map(reality => (
                                              <Badge key={reality} variant="secondary" className="text-xs">{reality}</Badge>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Custom Prompt Section */}
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Label htmlFor="prompt">Custom Generation Instructions</Label>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setShowAdvanced(!showAdvanced)}
                                    >
                                      <Gear size={14} className="mr-1" />
                                      {showAdvanced ? 'Basic' : 'Advanced'}
                                    </Button>
                                  </div>
                                  <Textarea
                                    id="prompt"
                                    placeholder={showAdvanced ? 
                                      "Advanced instructions: Include specific sections, technical requirements, compliance standards, or formatting preferences..." :
                                      "Add specific requirements or context for this template..."
                                    }
                                    value={customPrompt}
                                    onChange={(e) => setCustomPrompt(e.target.value)}
                                    rows={showAdvanced ? 6 : 3}
                                  />
                                  {showAdvanced && (
                                    <div className="mt-2 text-xs text-muted-foreground">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <strong>Available variables:</strong>
                                          <ul className="list-disc list-inside mt-1">
                                            <li>{'{{nomenclature}}'} - Full nomenclature</li>
                                            <li>{'{{phase}}'} - Document phase</li>
                                            <li>{'{{reality}}'} - Reality context</li>
                                          </ul>
                                        </div>
                                        <div>
                                          <strong>Example instructions:</strong>
                                          <ul className="list-disc list-inside mt-1">
                                            <li>"Include DO-178C compliance sections"</li>
                                            <li>"Add AR implementation details"</li>
                                            <li>"Focus on quantum processing specs"</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <Button 
                                  onClick={() => handleGenerate(selectedTemplate || template)}
                                  className="w-full"
                                  size="lg"
                                >
                                  <Lightning size={18} className="mr-2" />
                                  Generate with AI
                                </Button>
                              </div>
                            ) : (
                              <div className="space-y-6">
                                {/* Progress Indicator */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      currentStep.step === 'parsing' ? 'bg-blue-500 text-white animate-pulse' : 
                                      ['generating', 'raw-review', 'preview', 'formatting', 'validating', 'complete'].includes(currentStep.step) ? 'bg-green-500 text-white' : 'bg-gray-200'
                                    }`}>
                                      <Hash size={16} />
                                    </div>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      currentStep.step === 'generating' ? 'bg-blue-500 text-white animate-pulse' : 
                                      ['raw-review', 'preview', 'formatting', 'validating', 'complete'].includes(currentStep.step) ? 'bg-green-500 text-white' : 'bg-gray-200'
                                    }`}>
                                      <Robot size={16} />
                                    </div>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      currentStep.step === 'raw-review' ? 'bg-blue-500 text-white animate-pulse' : 
                                      ['preview', 'formatting', 'validating', 'complete'].includes(currentStep.step) ? 'bg-green-500 text-white' : 'bg-gray-200'
                                    }`}>
                                      <Code size={16} />
                                    </div>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      currentStep.step === 'preview' ? 'bg-blue-500 text-white animate-pulse' : 
                                      ['formatting', 'validating', 'complete'].includes(currentStep.step) ? 'bg-green-500 text-white' : 'bg-gray-200'
                                    }`}>
                                      <Eye size={16} />
                                    </div>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      currentStep.step === 'validating' ? 'bg-blue-500 text-white animate-pulse' : 
                                      currentStep.step === 'complete' ? 'bg-green-500 text-white' : 'bg-gray-200'
                                    }`}>
                                      <CheckCircle size={16} />
                                    </div>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      currentStep.step === 'complete' ? 'bg-green-500 text-white' : 'bg-gray-200'
                                    }`}>
                                      <Share size={16} />
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm font-medium">
                                      {currentStep.step === 'parsing' && 'Parsing Nomenclature'}
                                      {currentStep.step === 'generating' && 'Generating Content'}
                                      {currentStep.step === 'raw-review' && 'Review Raw Code'}
                                      {currentStep.step === 'preview' && 'Preview Rendering'}
                                      {currentStep.step === 'formatting' && 'Formatting Document'}
                                      {currentStep.step === 'validating' && 'Validating Output'}
                                      {currentStep.step === 'complete' && 'Ready to Publish'}
                                    </div>
                                    {currentStep.message && (
                                      <div className="text-xs text-muted-foreground">{currentStep.message}</div>
                                    )}
                                  </div>
                                </div>

                                <Progress value={currentStep.progress} className="w-full" />

                                {/* Nomenclature Analysis */}
                                {currentStep.nomenclatureData && (
                                  <>
                                    <div className="bg-muted/50 border rounded-lg p-4 space-y-2">
                                      <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                        <CheckCircle size={16} />
                                        Nomenclature Analysis Complete
                                      </div>
                                      <div className="grid grid-cols-2 gap-4 text-xs">
                                        <div>
                                          <span className="text-muted-foreground">Line:</span> {currentStep.nomenclatureData.line}
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Product:</span> {currentStep.nomenclatureData.product}-{currentStep.nomenclatureData.variant}
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Phase:</span> {currentStep.nomenclatureData.phase}
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Reality:</span> {currentStep.nomenclatureData.reality}
                                        </div>
                                      </div>
                                    </div>

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
                                  </>
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
              <div>
                <h2 className="text-xl font-semibold">Reality Portal Management</h2>
                <p className="text-sm text-muted-foreground">Reality-aware document repositories classified by rendering context</p>
              </div>
              <div className="flex items-center gap-3">
                <Select value={repositoryFilter} onValueChange={setRepositoryFilter}>
                  <SelectTrigger className="w-48">
                    <Filter size={16} className="mr-2" />
                    <SelectValue placeholder="Filter by reality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Realities</SelectItem>
                    <SelectItem value="PHYSL">Physical</SelectItem>
                    <SelectItem value="VRTUL">Virtual</SelectItem>
                    <SelectItem value="AUGMT">Augmented</SelectItem>
                    <SelectItem value="MIXRL">Mixed</SelectItem>
                    <SelectItem value="SIMUL">Simulation</SelectItem>
                    <SelectItem value="EXTND">Extended</SelectItem>
                    <SelectItem value="HYBRD">Hybrid</SelectItem>
                    <SelectItem value="OPERT">Operational</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus size={16} className="mr-2" />
                  Add Portal
                </Button>
              </div>
            </div>

            {/* Reality Portals Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { reality: 'PHYSL', count: repositories.filter(r => r.reality === 'PHYSL').length, color: 'bg-blue-100 text-blue-800 border-blue-200' },
                { reality: 'VRTUL', count: repositories.filter(r => r.reality === 'VRTUL').length, color: 'bg-purple-100 text-purple-800 border-purple-200' },
                { reality: 'AUGMT', count: repositories.filter(r => r.reality === 'AUGMT').length, color: 'bg-green-100 text-green-800 border-green-200' },
                { reality: 'MIXRL', count: repositories.filter(r => r.reality === 'MIXRL').length, color: 'bg-orange-100 text-orange-800 border-orange-200' },
                { reality: 'SIMUL', count: repositories.filter(r => r.reality === 'SIMUL').length, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
                { reality: 'EXTND', count: repositories.filter(r => r.reality === 'EXTND').length, color: 'bg-pink-100 text-pink-800 border-pink-200' },
                { reality: 'HYBRD', count: repositories.filter(r => r.reality === 'HYBRD').length, color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
                { reality: 'OPERT', count: repositories.filter(r => r.reality === 'OPERT').length, color: 'bg-teal-100 text-teal-800 border-teal-200' }
              ].map((portal) => (
                <motion.div
                  key={portal.reality}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="cursor-pointer"
                  onClick={() => setRepositoryFilter(portal.reality)}
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4 text-center">
                      <Badge variant="outline" className={`${portal.color} mb-2`}>
                        {portal.reality}
                      </Badge>
                      <div className="text-2xl font-bold mb-1">{portal.count}</div>
                      <div className="text-sm text-muted-foreground">
                        {portal.count === 1 ? 'Portal' : 'Portals'}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {repositoryFilter !== 'all' && (
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className={getRealityColor(repositoryFilter as Repository['reality'])}>
                  {repositoryFilter}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {getRealityDescription(repositoryFilter as Repository['reality'])}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRepositoryFilter('all')}
                >
                  <X size={14} className="mr-1" />
                  Clear Filter
                </Button>
              </div>
            )}
            
            <div className="grid gap-4">
              {filteredRepositories.map((repo) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <FolderOpen size={20} />
                              {repo.name}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={getRealityColor(repo.reality)}>
                                {repo.reality}
                              </Badge>
                              <Badge variant="outline" className={getStatusColor(repo.status)}>
                                {repo.status}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {repo.type}
                              </Badge>
                            </div>
                          </CardTitle>
                          <CardDescription className="mt-2">
                            <div className="mb-1">{repo.description}</div>
                            <div className="text-xs font-mono bg-muted/50 px-2 py-1 rounded inline-block">
                              {repo.path}
                            </div>
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={
                            repo.securityLevel === 'classified' ? 'bg-red-50 text-red-700 border-red-200' :
                            repo.securityLevel === 'restricted' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                            repo.securityLevel === 'internal' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-green-50 text-green-700 border-green-200'
                          }>
                            {repo.securityLevel}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Reality Context Description */}
                        <div className="bg-muted/30 p-3 rounded-lg">
                          <div className="text-sm">
                            <div className="font-medium text-primary mb-1">Reality Context</div>
                            <div className="text-muted-foreground">{getRealityDescription(repo.reality)}</div>
                          </div>
                        </div>

                        {/* Repository Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Documents</div>
                            <div className="font-medium">{repo.documentCount}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Last Sync</div>
                            <div className="font-medium">
                              {new Date(repo.lastSync).toLocaleDateString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Formats</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {repo.supportedFormats.slice(0, 3).map(format => (
                                <Badge key={format} variant="secondary" className="text-xs">
                                  {format.toUpperCase()}
                                </Badge>
                              ))}
                              {repo.supportedFormats.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{repo.supportedFormats.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Capabilities</div>
                            <div className="text-xs text-primary">
                              {repo.capabilities.length} features
                            </div>
                          </div>
                        </div>

                        {/* Capabilities */}
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-2">Repository Capabilities</div>
                          <div className="flex flex-wrap gap-1">
                            {repo.capabilities.map(capability => (
                              <Badge key={capability} variant="outline" className="text-xs">
                                {capability.replace(/-/g, ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="text-xs text-muted-foreground">
                            {repo.status === 'syncing' && (
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                Syncing...
                              </div>
                            )}
                            {repo.status === 'active' && (
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                Ready
                              </div>
                            )}
                            {repo.status === 'readonly' && (
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                                Read Only
                              </div>
                            )}
                            {repo.status === 'inactive' && (
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-gray-500 rounded-full" />
                                Inactive
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleBrowseRepository(repo)}
                                  disabled={loadingRepository}
                                >
                                  <Eye size={16} className="mr-2" />
                                  {loadingRepository && browsingRepository?.id === repo.id ? 'Loading...' : 'Browse'}
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    <FolderOpen size={20} />
                                    Repository Browser: {browsingRepository?.name}
                                    <Badge variant="outline" className={browsingRepository ? getRealityColor(browsingRepository.reality) : ''}>
                                      {browsingRepository?.reality}
                                    </Badge>
                                  </DialogTitle>
                                </DialogHeader>
                                
                                {browsingRepository && (
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <span className="font-mono bg-muted px-2 py-1 rounded text-xs">
                                        {browsingRepository.path}
                                      </span>
                                      <Badge variant="secondary">{browsingRepository.type}</Badge>
                                      <Badge variant="outline" className={getStatusColor(browsingRepository.status)}>
                                        {browsingRepository.status}
                                      </Badge>
                                    </div>

                                    {/* Repository Search */}
                                    <div className="relative">
                                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                                      <Input
                                        placeholder="Search files and folders..."
                                        value={repositorySearchQuery}
                                        onChange={(e) => setRepositorySearchQuery(e.target.value)}
                                        className="pl-10"
                                      />
                                    </div>

                                    {/* Repository Contents */}
                                    <ScrollArea className="h-80 w-full border rounded-lg">
                                      {loadingRepository ? (
                                        <div className="flex items-center justify-center h-full">
                                          <div className="text-muted-foreground">Loading repository contents...</div>
                                        </div>
                                      ) : (
                                        <div className="space-y-2 p-4">
                                          {filteredRepositoryContents.map((item, index) => (
                                            <motion.div
                                              key={index}
                                              initial={{ opacity: 0, x: -10 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{ delay: index * 0.05 }}
                                              className={`flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${
                                                selectedFiles.includes(item.name) ? 'bg-primary/10 border border-primary/20' : ''
                                              }`}
                                              onClick={() => item.type === 'file' && handleFileSelection(item.name)}
                                            >
                                              <div>
                                                {item.type === 'folder' ? (
                                                  <Folder size={20} className="text-blue-500" />
                                                ) : (
                                                  <File size={20} className="text-gray-500" />
                                                )}
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <div className="font-medium text-sm truncate">{item.name}</div>
                                                <div className="text-xs text-muted-foreground truncate">
                                                  {item.description}
                                                </div>
                                              </div>
                                              <div className="text-right text-xs text-muted-foreground">
                                                {item.size && <div>{item.size}</div>}
                                                <div>{new Date(item.modified).toLocaleDateString()}</div>
                                              </div>
                                              <Badge variant="outline" className={getRealityColor(item.reality)}>
                                                {item.reality}
                                              </Badge>
                                              {item.type === 'file' && selectedFiles.includes(item.name) && (
                                                <Check size={16} className="text-primary" />
                                              )}
                                            </motion.div>
                                          ))}
                                          
                                          {filteredRepositoryContents.length === 0 && !loadingRepository && (
                                            <div className="text-center py-8 text-muted-foreground">
                                              {repositorySearchQuery ? 'No files match your search' : 'This repository is empty'}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </ScrollArea>

                                    <div className="flex items-center justify-between pt-4 border-t">
                                      <div className="text-sm text-muted-foreground">
                                        {filteredRepositoryContents.length} items 
                                        {selectedFiles.length > 0 && ` • ${selectedFiles.length} selected`}
                                        {' '} • Reality: {browsingRepository.reality}
                                      </div>
                                      <div className="flex gap-2">
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          onClick={handleDownloadSelected}
                                          disabled={selectedFiles.length === 0}
                                        >
                                          <Download size={16} className="mr-2" />
                                          Download ({selectedFiles.length})
                                        </Button>
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                        >
                                          <Plus size={16} className="mr-2" />
                                          Upload
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button variant="outline" size="sm">
                              <Gear size={16} className="mr-2" />
                              Configure
                            </Button>
                            {repo.status === 'active' && (
                              <Button variant="outline" size="sm">
                                <GitBranch size={16} className="mr-2" />
                                Sync
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {filteredRepositories.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FolderOpen size={48} className="text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No repositories found</h3>
                    <p className="text-muted-foreground text-center">
                      {repositoryFilter === 'all' 
                        ? 'No repositories have been configured yet'
                        : `No repositories found for ${repositoryFilter} reality context`
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App

// Helper functions needed for the quiz functionality
const parseNomenclature = (nomenclature: string): NomenclatureData | null => {
  try {
    const parts = nomenclature.trim().split('-')
    if (parts.length < 13) {
      throw new Error('Invalid nomenclature format')
    }

    const parsed: NomenclatureData = {
      line: parts[0],
      product: parts[1], 
      variant: parts[2],
      number: parts[3],
      phase: parts[4],
      criticality: parts[5],
      document: parts[6],
      application: parts[7],
      method: parts.slice(8, 12).join('-'),
      reality: parts[12],
      utcs: parts[13],
      regulatory: parts[14],
      version: parts[15] || 'v1.0.0',
      parsed: true,
      description: generateNomenclatureDescription(parts[0], parts[1], parts[4], parts[6])
    }

    return parsed
  } catch (error) {
    return null
  }
}

const generateNomenclatureDescription = (line: string, product: string, phase: string, doc: string): string => {
  const lineDescriptions: Record<string, string> = {
    'AMPEL3': 'AMPEL360 Aircraft',
    'GAIAIR': 'GAIA Air & Space',
    'ROBBBO': 'ROBBBO-T Robotics',
    'QSERVS': 'Quantum Services',
    'QPRODS': 'Quantum Products',
    'INFRAD': 'Digital Infrastructure',
    'AQUART': 'Cross-Program'
  }

  const phaseDescriptions: Record<string, string> = {
    'STR': 'Strategy',
    'CON': 'Conceptual',
    'DES': 'Design',
    'DEV': 'Development',
    'TST': 'Testing',
    'PRD': 'Production',
    'MNT': 'Maintenance',
    'OPS': 'Operations'
  }

  return `${lineDescriptions[line] || line} ${phaseDescriptions[phase] || phase} ${doc} Document`
}

const validateNomenclaturePattern = (nomenclature: NomenclatureData, template: Template): boolean => {
  if (!template.nomenclaturePattern) return true
  
  const pattern = template.nomenclaturePattern
  const actual = `${nomenclature.line}-${nomenclature.product}-${nomenclature.variant}-${nomenclature.number}-${nomenclature.phase}-${nomenclature.criticality}-${nomenclature.document}-${nomenclature.application}-${nomenclature.method}-${nomenclature.reality}-${nomenclature.utcs}-${nomenclature.regulatory}-${nomenclature.version}`
  
  // Simple wildcard matching
  const regexPattern = pattern.replace(/\*/g, '[^-]+')
  return new RegExp(`^${regexPattern}$`).test(actual)
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