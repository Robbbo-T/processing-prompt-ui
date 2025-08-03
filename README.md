# Processing Prompt UI

An AI-powered template generation interface that enables users to build, customize, and deploy document templates with real-time generation and multi-format support.

![Processing Prompt UI](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![GitHub Spark](https://img.shields.io/badge/GitHub_Spark-Enabled-181717?style=flat&logo=github&logoColor=white)

## ✨ Features

### 🤖 AI-Powered Document Generation
- **Smart Template Processing**: Generate comprehensive documents from structured templates using advanced AI
- **Multi-Format Support**: Output in Markdown, HTML5, or Word document formats
- **Context-Aware Generation**: Customize outputs with project-specific context and requirements

### 🔄 Interactive Generation Workflow
- **Step-by-Step Process**: Guided workflow from generation → raw review → preview → formatting → publishing
- **Real-Time Progress**: Visual progress tracking with detailed status updates
- **Content Validation**: Review and approve generated content before final output

### 📋 Template Library Management
- **Comprehensive Template Catalog**: Pre-built templates for aerospace documentation (AQUA V. standard)
- **Phase-Based Organization**: Templates organized by project lifecycle phases (STR, DES, TST, etc.)
- **Smart Search & Filtering**: Find templates by name, description, phase, or document code
- **Criticality Indicators**: Visual indicators for Critical, Essential, Important, and Standard templates

### 📁 Repository Integration
- **Local & Network Storage**: Save generated documents to local or network repositories
- **Version Control**: Track document versions and modifications
- **Metadata Management**: Comprehensive document metadata including author, creation date, and repository path

### 🎨 Modern User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme Support**: Elegant color scheme with OKLCH color space
- **Smooth Animations**: Subtle Framer Motion animations for enhanced interaction
- **Accessibility First**: WCAG 2.1 AA compliant interface

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- GitHub Spark development environment
- Modern web browser with ES2022 support

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/processing-prompt-ui.git
cd processing-prompt-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Architecture

### Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React hooks + GitHub Spark KV storage
- **AI Integration**: GitHub Spark LLM API
- **Animation**: Framer Motion
- **Icons**: Phosphor Icons
- **Build Tool**: Vite

### Project Structure

```
src/
├── components/
│   └── ui/              # shadcn/ui components (pre-installed)
├── lib/
│   └── utils.ts         # Utility functions
├── assets/              # Static assets
├── App.tsx              # Main application component
├── index.css            # Global styles and theme
└── main.tsx             # Application entry point
```

## 🎯 Usage

### Generating Documents

1. **Browse Templates**: Explore the template library organized by project phases
2. **Select Template**: Click "Generate Template" on any template card
3. **Configure Generation**:
   - Choose output format (Markdown, HTML5, or Word)
   - Set repository path (optional)
   - Add custom prompt context (optional)
4. **Review Process**:
   - **Raw Review**: Examine generated code before rendering
   - **Preview**: See how the document will appear when rendered
   - **Final Check**: Review formatting and metadata
5. **Publish**: Save the document to your specified repository

### Template Phases

The system supports templates across all project lifecycle phases:

| Phase | Description | Template Count |
|-------|-------------|----------------|
| **STR** | Strategy & Planning | 8 templates |
| **CON** | Conceptual & Feasibility | 10 templates |
| **DES** | Design & Engineering | 24 templates |
| **DEV** | Development & Prototyping | 16 templates |
| **TST** | Testing & Validation | 14 templates |
| **INT** | Integration & Verification | 12 templates |
| **CRT** | Certification & Compliance | 18 templates |
| **PRD** | Production & Manufacturing | 18 templates |
| **OPS** | Operations & Service | 15 templates |
| **MNT** | Maintenance & Support | 14 templates |

### Repository Management

- **Local Repository**: Documents saved to local file system
- **Network Repository**: Integration with SMB/network shares
- **Version Control**: Automatic versioning and change tracking
- **Metadata Tracking**: Author, creation date, modification history

## 🔧 Configuration

### Environment Variables

The application runs within GitHub Spark and automatically configures:

- `spark.llm()` - AI generation service
- `spark.kv()` - Persistent key-value storage
- `spark.user()` - User context and permissions

### Theme Customization

Modify the CSS custom properties in `src/index.css`:

```css
:root {
  --background: oklch(0.98 0.02 240);
  --foreground: oklch(0.2 0.02 240);
  --primary: oklch(0.45 0.15 240);
  --secondary: oklch(0.95 0.02 240);
  --accent: oklch(0.7 0.18 50);
  /* ... more theme variables */
}
```

## 🧪 Development

### Local Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Type checking
npm run type-check

# Linting (if configured)
npm run lint

# Format code (if configured)
npm run format
```

### Testing

The application includes manual testing workflows:

1. Template generation end-to-end flow
2. Document preview rendering accuracy
3. Repository integration functionality
4. Responsive design validation
5. Accessibility compliance verification

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for:

- Development setup and guidelines
- Code standards and best practices
- Component development patterns
- State management conventions
- AI integration guidelines
- UI/UX design principles

### Quick Contributing Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Follow the code standards in [CONTRIBUTING.md](CONTRIBUTING.md)
4. Commit your changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feat/amazing-feature`)
6. Open a Pull Request

## 📖 Documentation

- [Contributing Guidelines](CONTRIBUTING.md) - Development standards and practices
- [Component Documentation](docs/components.md) - UI component reference
- [API Reference](docs/api.md) - GitHub Spark integration details
- [Deployment Guide](docs/deployment.md) - Production deployment instructions

## 🔒 Security

- **Input Sanitization**: All user inputs are properly sanitized
- **Content Security**: Generated HTML is safely rendered with content restrictions
- **Data Privacy**: User data is stored locally using GitHub Spark KV
- **API Security**: Secure integration with GitHub Spark LLM services

Report security issues to: [security@example.com](mailto:security@example.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GitHub Spark** - AI integration and runtime environment
- **shadcn/ui** - Beautiful and accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Phosphor Icons** - Clean and consistent iconography

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/processing-prompt-ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/processing-prompt-ui/discussions)
- **Documentation**: [Project Wiki](https://github.com/your-username/processing-prompt-ui/wiki)

---

<div align="center">

**[Live Demo](https://processing-prompt-ui.example.com)** • **[Documentation](docs/)** • **[Contributing](CONTRIBUTING.md)**

Made with ❤️ for the aerospace documentation community

</div>