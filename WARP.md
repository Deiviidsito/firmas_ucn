# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a React + TypeScript application for generating professional email signatures for Universidad Católica del Norte (UCN). The application allows users to input their contact information and generates HTML email signatures that can be copied and pasted into Gmail.

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

### Development Workflow
- Development server runs on `http://localhost:5173` (Vite default)
- Hot reload is enabled for rapid development
- TypeScript compilation happens on-the-fly during development

## Architecture Overview

### Core Application Structure
- **Single Page Application**: Built with React and centered around a signature generation workflow
- **State Management**: Uses a custom hook (`useSignatureGenerator`) for centralized state management
- **Component Architecture**: Clean separation between form input, preview, and utility components
- **Styling**: Tailwind CSS for consistent, utility-first styling

### Key Components & Responsibilities
- `App.tsx`: Main orchestrator, handles layout and component composition
- `useSignatureGenerator.ts`: Core business logic hook managing signature data, clipboard operations, and HTML generation
- `SignatureForm.tsx`: Form interface for user input with validation
- `SignaturePreview.tsx`: Real-time preview of the generated signature
- `CopyButton.tsx`: Handles clipboard operations with fallback mechanisms
- `Header.tsx`: Application header and branding

### Data Flow
1. User inputs data through `SignatureForm`
2. State is managed in `useSignatureGenerator` hook
3. `SignaturePreview` shows real-time preview
4. `CopyButton` generates HTML and copies to clipboard
5. HTML includes table-based layout for email client compatibility

## Technical Stack Details

### Frontend
- **React 18**: Functional components with hooks
- **TypeScript**: Full type safety throughout the application
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Icon library for consistent UI elements

### Email Signature Generation
- **HTML Table Layout**: Uses table-based structure for maximum email client compatibility
- **Inline Styles**: All styles are inlined to ensure proper rendering across email clients
- **Clipboard API**: Modern clipboard API with fallback for copying HTML content
- **Logo Integration**: References `/disc.svg` (UCN logo) with absolute positioning

### Browser Compatibility
- Modern browsers with Clipboard API support
- Fallback mechanisms for older browsers
- Responsive design for various screen sizes

## Key Patterns & Conventions

### Component Patterns
- Functional components with TypeScript interfaces
- Props are explicitly typed with interfaces
- Custom hooks for business logic separation
- Consistent naming conventions (PascalCase for components, camelCase for functions)

### State Management Pattern
- Single source of truth in `useSignatureGenerator`
- Immutable state updates using spread operators
- Centralized clipboard operations with error handling
- Form validation logic integrated into state management

### Styling Approach
- Tailwind utility classes for rapid development
- Consistent color scheme using UCN brand colors (#6B88A3, #B65A2C, #2C3E50)
- Responsive grid layout for form and preview sections
- Professional, accessibility-friendly design patterns

### HTML Generation Strategy
- Template literal for HTML signature generation
- Conditional rendering based on filled fields
- Email-safe HTML structure (tables, inline styles)
- UCN branding and contact information templating

## Development Guidelines

### Code Organization
- Keep components focused on single responsibilities
- Extract business logic into custom hooks
- Maintain TypeScript interfaces for all data structures
- Use descriptive variable and function names

### Styling Guidelines
- Follow Tailwind utility-first approach
- Maintain consistent spacing and sizing patterns
- Use semantic color classes from the established palette
- Ensure responsive design across all screen sizes

### Email Signature Constraints
- HTML must be email-client compatible (primarily table-based layout)
- All styles must be inline for maximum compatibility
- Logo path must be absolute and accessible from email clients
- Structure must maintain visual consistency across different email platforms

## Bolt Integration Notes

This project was initially scaffolded with Bolt.new and includes:
- `.bolt/` directory with configuration and prompt settings
- Optimized for beautiful, production-ready designs
- JSX syntax with Tailwind CSS classes as default
- Lucide React for icons (avoid installing additional icon packages)
- Focus on clean, professional UI suitable for institutional use
