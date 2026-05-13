# Twilio-Inspired Design System

A complete, reusable design system based on Twilio's design language. This package can be used across multiple projects to maintain visual consistency.

## 📦 What's Included

- **Tailwind Configuration** - Custom colors, spacing, typography
- **CSS Variables** - For non-Tailwind projects
- **Component Library** - Reusable React components
- **Design Tokens** - JSON format for any framework
- **Usage Guide** - Examples and best practices

## 🎨 Color Palette

### Primary Colors
- **Blue Primary**: `#0263E0` - Main brand color
- **Blue Dark**: `#014DB5` - Hover states, darker variant
- **Blue Light**: `#F0F6FF` - Backgrounds, selected states

### Status Colors
- **Success**: `#10B981` (green-500)
- **Warning**: `#F59E0B` (amber-500)
- **Error**: `#EF4444` (red-500)
- **Info**: `#3B82F6` (blue-500)

### Neutral Colors
- **Gray Scale**: 50 to 900 (Tailwind defaults)
- **Slate Scale**: 50 to 900 (Tailwind defaults)

## 🚀 Quick Start

### Option 1: Copy Tailwind Config
```bash
# Copy the tailwind config to your project
cp tailwind.config.js /path/to/your/project/
```

### Option 2: Import as NPM Package (if published)
```bash
npm install @yourorg/twilio-design-system
```

### Option 3: Use CSS Variables
```html
<link rel="stylesheet" href="design-system/styles.css">
```

## 📁 File Structure

```
design-system/
├── README.md                    # This file
├── tailwind.config.js          # Tailwind configuration
├── tokens.json                 # Design tokens (framework-agnostic)
├── styles.css                  # CSS variables version
├── components/                 # React component library
│   ├── Button.jsx
│   ├── Badge.jsx
│   ├── Table.jsx
│   ├── Form.jsx
│   └── index.js
├── examples/                   # Usage examples
│   └── showcase.html
└── docs/                       # Documentation
    ├── colors.md
    ├── typography.md
    └── components.md
```

## 📖 Usage Examples

See the `examples/` directory for:
- Component showcase
- Color palette reference
- Typography samples
- Layout patterns

## 🔄 Updates

When updating this design system:
1. Update version in tokens.json
2. Update CHANGELOG.md
3. Notify all projects using this system
4. Provide migration guide if breaking changes

## 📝 License

Private - Internal use only
