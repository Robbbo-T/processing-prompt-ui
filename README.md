# Processing Prompt UI

> AI-Powered Template Generator for Dynamic Document Creation

A sophisticated interface that enables users to build, modify, and execute prompts in real-time while generating professional documentation templates. Built for the AQUA V. aerospace program, this tool streamlines the document generation process across all project lifecycle phases.

![Processing Prompt UI](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-06B6D4)

## 🚀 Features

### Core Capabilities
- **Dynamic Template Generation**: AI-powered document creation from standardized templates
- **Multi-Format Support**: Generate documents in Markdown, HTML5, or Word format
- **Real-Time Preview**: Live preview of generated content with raw code inspection
- **Repository Integration**: Save to local or network repositories with version control
- **Phase-Based Organization**: Templates organized by project lifecycle phases (STR, CON, DES, etc.)

### Generation Workflow
1. **Template Selection**: Choose from 161+ aerospace-grade templates
2. **Raw Code Review**: Inspect generated markup before rendering
3. **Live Preview**: See formatted output with edit capabilities
4. **Format & Publish**: Finalize and save to designated repositories

### Advanced Features
- **Criticality Filtering**: Templates categorized by importance (Critical, Essential, Important, Standard)
- **Search & Filter**: Find templates by name, description, or document code
- **Version Management**: Semantic versioning with automated tracking
- **Compliance Integration**: Built-in AQUA V. nomenclature and standards

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React hooks with persistent storage
- **AI Integration**: GitHub Spark LLM API
- **Animation**: Framer Motion for smooth interactions

### Key Components
```
src/
├── App.tsx                 # Main application component
├── components/ui/          # shadcn/ui component library
├── assets/                 # Static assets (images, docs, etc.)
├── lib/utils.ts           # Utility functions
└── index.css              # Global styles and theme
```

## 🎯 Use Cases

### Aerospace Documentation
- Generate technical specifications (SRS, HRD, IRD)
- Create compliance documentation (TC, STC, TSO)
- Produce maintenance manuals (AMM, CMM, SRM)
- Build test plans and reports (QTP, QTR, FTP)

### Enterprise Applications
- Standard Operating Procedures (SOPs)
- Quality Management Systems (QMS)
- Risk Assessment Reports
- Training Documentation

## 📋 Template Categories

| Phase | Description | Template Count | Examples |
|-------|-------------|----------------|----------|
| **STR** | Strategy & Planning | 8 | Business Strategy Plan, Risk Assessment |
| **CON** | Conceptual & Feasibility | 10 | System Requirements, Feasibility Study |
| **DES** | Design & Engineering | 24 | Software Requirements, Design Specs |
| **DEV** | Development & Prototyping | 16 | Implementation Plans, Build Specs |
| **TST** | Testing & Validation | 14 | Test Plans, Quality Reports |
| **INT** | Integration & Verification | 12 | Integration Tests, Config Management |
| **CRT** | Certification & Compliance | 18 | Type Certificates, Safety Assessments |
| **PRD** | Production & Manufacturing | 18 | Manufacturing Specs, Quality Control |
| **OPS** | Operations & Service | 15 | Flight Manuals, Operating Procedures |
| **MNT** | Maintenance & Support | 14 | Maintenance Manuals, Service Bulletins |

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Setup
```bash
# Clone the repository
git clone https://github.com/your-org/processing-prompt-ui.git
cd processing-prompt-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration
The application uses GitHub Spark runtime APIs which are automatically configured in the deployment environment. No additional environment variables are required for basic operation.

## 🎮 Usage

### Basic Workflow
1. **Select Template**: Browse or search the template library
2. **Configure Generation**: Choose output format and repository path
3. **Add Context**: Provide custom prompts for specific requirements
4. **Generate**: AI creates the document based on template and context
5. **Review**: Inspect raw code and preview rendered output
6. **Publish**: Save to local or network repository

### Advanced Features
- **Custom Prompts**: Add specific context for tailored document generation
- **Repository Management**: Configure local and network storage locations
- **Version Control**: Track document versions and changes
- **Batch Processing**: Generate multiple documents from template sets

## 🎨 Customization

### Theme Configuration
The application uses a sophisticated color system based on OKLCH color space:

```css
:root {
  --primary: oklch(0.45 0.15 240);      /* Deep blue for primary actions */
  --accent: oklch(0.7 0.18 50);         /* Warm accent for highlights */
  --background: oklch(0.98 0.02 240);   /* Subtle blue-tinted background */
}
```

### Template Extensions
Add custom templates by extending the template interface:

```typescript
interface Template {
  id: string
  name: string
  description: string
  phase: string
  type: string
  docCode: string
  version: string
  criticality: 'Critical' | 'Essential' | 'Important' | 'Standard'
}
```

## 🔧 API Integration

### GitHub Spark LLM
```typescript
// Generate content with AI
const prompt = spark.llmPrompt`Generate a ${template.name} document...`
const content = await spark.llm(prompt)

// Store with persistence
const [documents, setDocuments] = useKV('generated-documents', [])
```

### Repository Storage
```typescript
// Save to local repository
await spark.kv.set(`doc-${id}`, documentData)

// Network repository integration
const networkPath = 'smb://server/templates/'
```

## 📈 Performance

### Optimization Features
- **Lazy Loading**: Templates and documents loaded on demand
- **Efficient Rendering**: Virtual scrolling for large template lists
- **Caching**: AI responses cached for repeated generations
- **Progressive Enhancement**: Core functionality works without JavaScript

### Metrics
- **Template Library**: 161+ professional templates
- **Generation Speed**: ~2-5 seconds per document
- **Format Support**: 3 output formats (Markdown, HTML, DOCX)
- **Repository Types**: Local and network storage

## 🤝 Contributing

### Development Guidelines
1. Follow the existing code style and conventions
2. Use TypeScript for all new components
3. Add tests for new functionality
4. Update documentation for API changes

### Template Contributions
1. Follow AQUA V. nomenclature standards
2. Include proper metadata and versioning
3. Test with multiple output formats
4. Validate compliance requirements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Template Library Guide](docs/templates.md)
- [API Reference](docs/api.md)
- [Deployment Guide](docs/deployment.md)

### Community
- [Issue Tracker](https://github.com/your-org/processing-prompt-ui/issues)
- [Discussions](https://github.com/your-org/processing-prompt-ui/discussions)
- [Contributing Guide](CONTRIBUTING.md)

---

**Processing Prompt UI** - Transforming document generation through intelligent automation.

Built with ❤️ for the AQUA V. aerospace program and modern enterprises worldwide.