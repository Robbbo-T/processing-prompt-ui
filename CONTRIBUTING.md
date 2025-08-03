# Contributing to Processing Prompt UI

Thank you for your interest in contributing to the Processing Prompt UI project! This document provides guidelines and information for developers who want to contribute to the project.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git for version control
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/processing-prompt-ui.git
   cd processing-prompt-ui
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to `http://localhost:5173`

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # shadcn/ui components
├── lib/                # Utility functions
├── assets/             # Static assets (images, icons, etc.)
├── App.tsx             # Main application component
├── index.css           # Global styles and theme
└── main.tsx            # Application entry point
```

## 🎨 Design System

### UI Components

We use **shadcn/ui** as our component library. All components are pre-installed in `src/components/ui/`. 

#### Available Components
- `Button`, `Card`, `Input`, `Textarea`
- `Dialog`, `Popover`, `Tabs`, `Badge`
- `ScrollArea`, `Separator`, `Progress`
- `Avatar`, `Select`, `Label`

#### Adding New Components
```bash
# If you need a new shadcn component
npx shadcn-ui@latest add [component-name]
```

### Styling Guidelines

1. **Use Tailwind CSS** for all styling
2. **Follow the design tokens** defined in `index.css`
3. **Maintain consistent spacing** using Tailwind's spacing scale
4. **Use semantic color names** (primary, secondary, muted, etc.)

#### Color Usage
```typescript
// ✅ Good - semantic colors
className="bg-primary text-primary-foreground"
className="text-muted-foreground"

// ❌ Avoid - hard-coded colors  
className="bg-blue-500 text-white"
```

#### Responsive Design
```typescript
// ✅ Mobile-first approach
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

## 🔧 Code Standards

### TypeScript

- **Use strict TypeScript** - all files should be `.tsx` or `.ts`
- **Define interfaces** for all data structures
- **Use proper typing** for props, state, and functions
- **Avoid `any`** - use proper types or `unknown`

#### Example Interface
```typescript
interface Template {
  id: string
  name: string
  description: string
  phase: string
  criticality: 'Critical' | 'Essential' | 'Important' | 'Standard'
  lastModified: string
}
```

### React Patterns

#### State Management
```typescript
// ✅ Persistent state (survives page refresh)
const [documents, setDocuments] = useKV<Document[]>('documents', [])

// ✅ Temporary state (UI state, form inputs)
const [isLoading, setIsLoading] = useState(false)
const [searchQuery, setSearchQuery] = useState('')
```

#### Component Organization
```typescript
// ✅ Group related state together
const [currentStep, setCurrentStep] = useState<GenerationStep>({ 
  step: 'generating', 
  progress: 0 
})

// ✅ Extract complex logic into custom hooks
const useCollaboration = (documentId: string) => {
  // ... collaboration logic
  return { session, comments, activeUsers }
}
```

### Performance Best Practices

1. **Use React.memo** for expensive components
2. **Implement proper key props** for lists
3. **Debounce search inputs** and API calls
4. **Lazy load heavy components** when appropriate

```typescript
// ✅ Memoized component
const ExpensiveComponent = React.memo(({ data }: Props) => {
  return <div>{/* complex rendering */}</div>
})

// ✅ Proper keys for dynamic lists
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

## 🎯 Feature Development

### Adding New Features

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Follow the development flow**
   - Design the interface (if UI changes)
   - Implement the functionality
   - Add proper TypeScript types
   - Test the feature thoroughly
   - Update documentation

3. **Collaboration Features**
   When adding collaboration features:
   - Use the existing `Collaborator` and `CollaborationSession` interfaces
   - Implement real-time updates with proper state management
   - Consider offline scenarios and error handling
   - Add proper loading states and feedback

### AI Integration

#### LLM Prompt Construction
```typescript
// ✅ Always use spark.llmPrompt for prompt creation
const prompt = spark.llmPrompt`Generate a ${templateName} document with the following requirements: ${requirements}`

// ✅ Handle LLM responses properly
try {
  const response = await spark.llm(prompt)
  // Process response
} catch (error) {
  toast.error('Generation failed. Please try again.')
  console.error('LLM Error:', error)
}
```

#### Data Persistence
```typescript
// ✅ Use useKV for persistent data
const [templates, setTemplates] = useKV<Template[]>('custom-templates', [])

// ✅ Use functional updates to avoid stale closures
setTemplates(current => [...current, newTemplate])
```

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR, ensure:

- [ ] **Template Generation**: All formats (Markdown, HTML, DOCX) work correctly
- [ ] **Collaborative Editing**: Real-time features function properly
- [ ] **Comments System**: Adding, resolving, and displaying comments
- [ ] **Document Management**: Saving, loading, and version tracking
- [ ] **Responsive Design**: Works on desktop, tablet, and mobile
- [ ] **Error Handling**: Graceful handling of API failures
- [ ] **Performance**: No significant performance regressions

### Browser Testing

Test in the following browsers:
- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)

### Accessibility Testing

- [ ] **Keyboard Navigation**: All features accessible via keyboard
- [ ] **Screen Reader**: Test with screen reader software
- [ ] **Color Contrast**: Ensure WCAG AA compliance
- [ ] **Focus Management**: Proper focus handling in dialogs and modals

## 📝 Documentation

### Code Documentation

```typescript
/**
 * Starts a collaborative editing session for a document
 * @param document - The document to edit collaboratively
 * @returns Promise that resolves when session is established
 */
const startCollaborativeEditing = async (document: GeneratedDocument) => {
  // Implementation
}
```

### Component Documentation

For complex components, include JSDoc comments:

```typescript
/**
 * Real-time collaborative editor component
 * 
 * Features:
 * - Live cursor tracking
 * - Comment system integration
 * - Auto-save functionality
 * - Conflict resolution
 */
interface CollaborativeEditorProps {
  document: GeneratedDocument
  onSave: (content: string) => void
  collaborators: Collaborator[]
}
```

## 🚀 Deployment

### Build Process

```bash
# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

### Environment Variables

Document any new environment variables in `.env.example`:

```env
# Example configuration
VITE_APP_TITLE="Processing Prompt UI"
VITE_DEFAULT_REPOSITORY_PATH="/local/templates/"
VITE_MAX_COLLABORATORS=10
```

## 🐛 Bug Reports

When reporting bugs, include:

1. **Steps to reproduce**
2. **Expected behavior**
3. **Actual behavior**
4. **Browser and version**
5. **Screenshots or video** (if applicable)
6. **Console errors** (if any)

## 💡 Feature Requests

For new features, provide:

1. **Use case description**
2. **Proposed solution**
3. **Alternative solutions considered**
4. **Impact on existing functionality**

## 📋 Pull Request Process

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test thoroughly**
5. **Update documentation**
6. **Submit pull request**

### PR Checklist

- [ ] Code follows project standards
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No breaking changes (or properly documented)
- [ ] Responsive design maintained
- [ ] Accessibility requirements met

## 🤝 Code Review

### What We Look For

- **Code Quality**: Clean, readable, maintainable code
- **TypeScript Usage**: Proper typing and interfaces
- **Performance**: No unnecessary re-renders or expensive operations
- **Accessibility**: Keyboard navigation and screen reader support
- **User Experience**: Intuitive interactions and proper feedback
- **Error Handling**: Graceful degradation and user-friendly error messages

### Review Process

1. **Automated Checks**: CI/CD pipeline runs tests and linting
2. **Code Review**: Team members review for quality and standards
3. **Testing**: Manual testing of new features
4. **Approval**: At least one maintainer approval required
5. **Merge**: Squash and merge to main branch

## 📞 Getting Help

- **Documentation**: Check existing docs and README
- **Issues**: Search existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions
- **Code Review**: Ask for feedback during development

## 🙏 Recognition

Contributors will be recognized in:
- Project README
- Release notes
- Contributor list

Thank you for contributing to Processing Prompt UI! 🎉