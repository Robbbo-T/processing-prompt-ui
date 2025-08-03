# Contributing to Processing Prompt UI

Welcome to the Processing Prompt UI project! This document provides guidelines for contributing to our AI-powered template generation system.

## Table of Contents

- [Overview](#overview)
- [Development Setup](#development-setup)
- [Architecture Guidelines](#architecture-guidelines)
- [Code Standards](#code-standards)
- [Component Development](#component-development)
- [State Management](#state-management)
- [AI Integration](#ai-integration)
- [Testing Guidelines](#testing-guidelines)
- [UI/UX Guidelines](#ui-ux-guidelines)
- [Documentation Standards](#documentation-standards)
- [Git Workflow](#git-workflow)
- [Performance Considerations](#performance-considerations)
- [Security Guidelines](#security-guidelines)

## Overview

Processing Prompt UI is a modern React application that enables users to:
- Generate documents from AI-powered templates
- Review and validate generated content in multiple formats
- Manage template libraries and repositories
- Track document generation workflows with real-time progress

### Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animation**: Framer Motion
- **State**: React hooks + GitHub Spark KV storage
- **AI Integration**: GitHub Spark LLM API
- **Build Tool**: Vite
- **Icons**: Phosphor Icons

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- GitHub Spark development environment

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd processing-prompt-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration

The application runs within the GitHub Spark environment and uses:
- `spark.llm()` for AI generation
- `spark.kv` for persistent storage
- `useKV()` hook for reactive state management

## Architecture Guidelines

### Project Structure

```
src/
├── components/           # Reusable UI components
│   └── ui/              # shadcn/ui components (pre-installed)
├── lib/                 # Utility functions
├── assets/              # Static assets (images, fonts, etc.)
├── types/               # TypeScript type definitions
├── hooks/               # Custom React hooks (optional)
└── App.tsx              # Main application component
```

### Core Principles

1. **Component-First Design**: Build reusable, composable components
2. **Type Safety**: Use TypeScript for all new code
3. **Performance**: Optimize for fast rendering and minimal re-renders
4. **Accessibility**: Follow WCAG 2.1 AA standards
5. **Responsive Design**: Mobile-first approach using Tailwind

## Code Standards

### TypeScript Guidelines

```typescript
// ✅ Good: Explicit interfaces for complex objects
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

// ✅ Good: Union types for controlled values
type GenerationStep = 'generating' | 'raw-review' | 'preview' | 'formatting' | 'complete'

// ❌ Avoid: any types
const handleData = (data: any) => { ... }

// ✅ Better: Specific types
const handleData = (data: GeneratedDocument) => { ... }
```

### React Component Patterns

```typescript
// ✅ Good: Functional components with proper TypeScript
interface TemplateCardProps {
  template: Template
  onGenerate: (template: Template) => void
  className?: string
}

const TemplateCard: React.FC<TemplateCardProps> = ({ 
  template, 
  onGenerate, 
  className 
}) => {
  return (
    <Card className={cn("cursor-pointer", className)}>
      {/* Component content */}
    </Card>
  )
}

// ✅ Good: Custom hooks for complex logic
const useTemplateGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState<GenerationStep>('generating')
  
  const generateTemplate = useCallback(async (template: Template) => {
    // Generation logic
  }, [])
  
  return { isGenerating, currentStep, generateTemplate }
}
```

### Naming Conventions

- **Components**: PascalCase (`TemplateCard`, `GenerationDialog`)
- **Functions**: camelCase (`handleGenerate`, `formatDocument`)
- **Constants**: UPPER_SNAKE_CASE (`PHASES`, `DEFAULT_FORMAT`)
- **Files**: kebab-case (`template-card.tsx`, `generation-utils.ts`)

## Component Development

### Using shadcn/ui Components

```typescript
// ✅ Good: Import shadcn components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

// ✅ Good: Compose shadcn components
const MyComponent = () => (
  <Card>
    <CardHeader>
      <CardTitle>Template Generation</CardTitle>
    </CardHeader>
    <CardContent>
      <Button onClick={handleGenerate}>
        <Robot size={16} className="mr-2" />
        Generate
      </Button>
    </CardContent>
  </Card>
)
```

### Animation Guidelines

```typescript
// ✅ Good: Subtle, purposeful animations
import { motion } from 'framer-motion'

const AnimatedCard = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
  >
    {children}
  </motion.div>
)

// ❌ Avoid: Excessive or distracting animations
const OverAnimated = () => (
  <motion.div
    animate={{ 
      rotate: [0, 360], 
      scale: [1, 1.5, 1], 
      color: ['red', 'blue', 'green'] 
    }}
    transition={{ duration: 0.5, repeat: Infinity }}
  >
    Distracting content
  </motion.div>
)
```

## State Management

### Using useKV for Persistence

```typescript
// ✅ Good: Use useKV for data that should persist
const [generatedDocuments, setGeneratedDocuments] = useKV<GeneratedDocument[]>('generated-documents', [])
const [userPreferences, setUserPreferences] = useKV<UserPrefs>('user-preferences', defaultPrefs)

// ✅ Good: Functional updates to avoid stale closure issues
const addDocument = (newDoc: GeneratedDocument) => {
  setGeneratedDocuments(current => [...current, newDoc])
}

const updateDocument = (id: string, updates: Partial<GeneratedDocument>) => {
  setGeneratedDocuments(current => 
    current.map(doc => doc.id === id ? { ...doc, ...updates } : doc)
  )
}

// ✅ Good: Use useState for temporary UI state
const [isDialogOpen, setIsDialogOpen] = useState(false)
const [searchQuery, setSearchQuery] = useState('')
```

### Direct KV API Usage

```typescript
// ✅ Good: For non-React contexts or complex operations
const saveToRepository = async (document: GeneratedDocument) => {
  const repositoryKey = `repo-${document.metadata.repository}`
  const existingDocs = await spark.kv.get<GeneratedDocument[]>(repositoryKey) || []
  await spark.kv.set(repositoryKey, [...existingDocs, document])
}
```

## AI Integration

### LLM Prompt Construction

```typescript
// ✅ REQUIRED: Always use spark.llmPrompt for prompt construction
const generateDocument = async (template: Template, customPrompt: string) => {
  const prompt = spark.llmPrompt`Generate a ${template.name} document in ${outputFormat} format based on the following template requirements:
  
  Template: ${template.name}
  Description: ${template.description}
  Phase: ${template.phase || 'N/A'}
  Document Code: ${template.docCode || 'N/A'}
  Output Format: ${outputFormat}
  
  Additional context: ${customPrompt || 'Standard implementation for AQUA V. aerospace program'}
  
  Please create a comprehensive document following industry standards and best practices.`

  const response = await spark.llm(prompt)
  return response
}

// ❌ Never: Direct string concatenation for prompts
const badPrompt = `Generate a ${template.name} document...` // DON'T DO THIS
```

### Error Handling

```typescript
// ✅ Good: Comprehensive error handling
const handleGeneration = async (template: Template) => {
  try {
    setIsGenerating(true)
    const content = await generateDocument(template, customPrompt)
    
    // Process successful response
    setCurrentDocument(createDocument(content))
    
  } catch (error) {
    console.error('Generation error:', error)
    toast.error('Generation failed. Please try again.')
    
    // Reset state on error
    setIsGenerating(false)
    setIsDialogOpen(false)
    
  } finally {
    // Cleanup if needed
  }
}
```

## Testing Guidelines

### Component Testing

```typescript
// Example test structure (when testing framework is available)
describe('TemplateCard', () => {
  it('renders template information correctly', () => {
    const mockTemplate: Template = {
      id: '1',
      name: 'Test Template',
      description: 'Test description',
      // ... other properties
    }
    
    // Test implementation would go here
  })
  
  it('calls onGenerate when generate button is clicked', () => {
    // Test implementation
  })
})
```

### Manual Testing Checklist

- [ ] Template generation workflow (all steps)
- [ ] Document preview rendering (markdown, HTML)
- [ ] Search and filtering functionality
- [ ] Repository management
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Accessibility (keyboard navigation, screen readers)

## UI/UX Guidelines

### Design System

- **Colors**: Use CSS custom properties defined in `index.css`
- **Typography**: Inter for UI text, JetBrains Mono for code
- **Spacing**: Follow Tailwind's spacing scale
- **Shadows**: Subtle elevation using Tailwind shadow utilities

### Component Patterns

```typescript
// ✅ Good: Consistent badge usage
const getCriticalityColor = (criticality: Template['criticality']) => {
  switch (criticality) {
    case 'Critical': return 'bg-red-100 text-red-800 border-red-200'
    case 'Essential': return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'Important': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Standard': return 'bg-blue-100 text-blue-800 border-blue-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

// ✅ Good: Loading states with progress indication
<Progress value={currentStep.progress} className="w-full" />

// ✅ Good: Icon consistency
<Button>
  <Download size={16} className="mr-2" />
  Generate Template
</Button>
```

### Responsive Design

```typescript
// ✅ Good: Mobile-first responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Template cards */}
</div>

<div className="flex flex-col sm:flex-row gap-4 mb-6">
  {/* Search and filters */}
</div>
```

## Documentation Standards

### Code Comments

```typescript
// ✅ Good: Document complex business logic
/**
 * Handles the multi-step document generation process.
 * Steps: generating -> raw-review -> preview -> formatting -> complete
 */
const handleGenerate = async (template: Template) => {
  // Implementation
}

// ✅ Good: Explain non-obvious code
// Simple markdown to HTML conversion for preview
const htmlContent = content
  .replace(/^# (.*$)/gm, '<h1>$1</h1>')
  .replace(/^## (.*$)/gm, '<h2>$1</h2>')
  // ... more replacements
```

### README Updates

When adding new features:
1. Update the feature list in README.md
2. Add any new dependencies to the installation section
3. Update screenshots if UI changes significantly

## Git Workflow

### Commit Messages

```bash
# ✅ Good: Clear, descriptive commits
feat: add document preview with markdown rendering
fix: resolve stale closure issue in useKV updates
docs: update contributing guidelines for AI integration
style: improve responsive layout for template cards
refactor: extract template generation logic to custom hook

# ❌ Avoid: Vague commit messages
fix: stuff
update: changes
wip: working on it
```

### Branch Naming

- Feature branches: `feat/add-export-functionality`
- Bug fixes: `fix/template-preview-rendering`
- Documentation: `docs/update-contributing-guide`
- Refactoring: `refactor/extract-generation-hooks`

### Pull Request Guidelines

1. **Title**: Clear description of changes
2. **Description**: 
   - What was changed and why
   - Screenshots for UI changes
   - Testing performed
3. **Checklist**:
   - [ ] Code follows style guidelines
   - [ ] Manual testing completed
   - [ ] Documentation updated if needed
   - [ ] Breaking changes documented

## Performance Considerations

### React Optimization

```typescript
// ✅ Good: Memoize expensive computations
const filteredTemplates = useMemo(() => {
  return [...sampleTemplates, ...savedTemplates].filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPhase = selectedPhase === 'all' || template.phase === selectedPhase
    return matchesSearch && matchesPhase
  })
}, [sampleTemplates, savedTemplates, searchQuery, selectedPhase])

// ✅ Good: Callback memoization
const handleGenerate = useCallback(async (template: Template) => {
  // Generation logic
}, [customPrompt, outputFormat, repositoryPath])

// ✅ Good: Prevent unnecessary re-renders
const TemplateCard = React.memo<TemplateCardProps>(({ template, onGenerate }) => {
  // Component implementation
})
```

### Loading States

```typescript
// ✅ Good: Progressive loading with feedback
{isGenerating && (
  <div className="space-y-4">
    <Progress value={currentStep.progress} />
    <p className="text-sm text-muted-foreground">
      {currentStep.step === 'generating' && 'Generating content...'}
      {currentStep.step === 'raw-review' && 'Review raw code'}
      {/* ... other states */}
    </p>
  </div>
)}
```

## Security Guidelines

### Data Handling

```typescript
// ✅ Good: Sanitize user input for preview
const renderPreview = (content: string, format: string) => {
  if (!content || !format) {
    return <div className="text-muted-foreground">No content available</div>
  }
  
  // Safe HTML rendering with restricted content
  if (format === 'html') {
    return <div dangerouslySetInnerHTML={{ __html: content }} className="prose max-w-none" />
  }
  
  // ... other formats
}

// ❌ Avoid: Direct execution of user content
eval(userProvidedCode) // NEVER DO THIS
```

### API Usage

```typescript
// ✅ Good: Proper error handling for external APIs
try {
  const response = await spark.llm(prompt)
  return response
} catch (error) {
  // Log error securely (don't expose sensitive data)
  console.error('LLM API error:', error.message)
  throw new Error('Generation service unavailable')
}
```

---

## Questions?

If you have questions about contributing:

1. Check this CONTRIBUTING.md file first
2. Look at existing code for patterns and examples
3. Create an issue for discussion of new features
4. Reach out to maintainers for architecture questions

Thank you for contributing to Processing Prompt UI! 🚀