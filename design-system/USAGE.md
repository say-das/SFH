# Design System Usage Guide

Complete guide for using the Twilio-inspired design system across different projects and frameworks.

## 🎯 Choose Your Integration Method

### 1. Tailwind CSS (Recommended for React/Vue/Next.js)

**Best for:** Modern JavaScript frameworks with build tools

```bash
# Copy the Tailwind config
cp design-system/tailwind.config.js ./

# Your project already has Tailwind? Merge the theme.extend section
```

**Usage in components:**
```jsx
// Primary Button
<button className="bg-[#0263E0] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#014DB5]">
  Click Me
</button>

// Success Badge
<span className="bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full text-xs font-bold">
  Active
</span>

// Input Field
<input className="border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#0263E0]" />
```

### 2. CSS Variables (For Any Project)

**Best for:** Vanilla HTML, PHP, plain JavaScript, or any framework

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="path/to/design-system/styles.css">
</head>
<body>
  <!-- Primary Button -->
  <button class="btn btn-primary">Click Me</button>
  
  <!-- Success Badge -->
  <span class="badge badge-success">Active</span>
  
  <!-- Input Field -->
  <input type="text" class="input" placeholder="Enter text">
  
  <!-- Table -->
  <table class="table">
    <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Data 1</td>
        <td>Data 2</td>
      </tr>
    </tbody>
  </table>
</body>
</html>
```

**Custom styling with CSS variables:**
```css
.my-custom-component {
  background-color: var(--color-primary);
  color: white;
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  font-family: var(--font-sans);
}

.my-custom-component:hover {
  background-color: var(--color-primary-hover);
}
```

### 3. Design Tokens (Framework Agnostic)

**Best for:** Design tools, documentation, or programmatic access

```javascript
// Import tokens
import tokens from './design-system/tokens.json';

// Access values
const primaryColor = tokens.colors.primary.base; // "#0263E0"
const buttonPadding = tokens.components.button.primary.padding; // "0.625rem 1.5rem"

// Use in your styling system
const styles = {
  backgroundColor: tokens.colors.primary.base,
  fontSize: tokens.typography.fontSize.sm,
  padding: tokens.spacing.md
};
```

## 📚 Component Examples

### Buttons

#### Primary Button
```html
<!-- Tailwind -->
<button class="bg-[#0263E0] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#014DB5] shadow-md transition-all">
  Primary Action
</button>

<!-- CSS Classes -->
<button class="btn btn-primary">Primary Action</button>

<!-- Custom CSS -->
<button style="background-color: var(--color-primary); color: white; padding: var(--spacing-md) var(--spacing-xl);">
  Primary Action
</button>
```

#### Secondary Button
```html
<!-- Tailwind -->
<button class="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-all">
  Secondary Action
</button>

<!-- CSS Classes -->
<button class="btn btn-secondary">Secondary Action</button>
```

#### Destructive Button
```html
<!-- Tailwind -->
<button class="bg-white border border-red-300 text-red-600 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-50">
  Delete
</button>

<!-- CSS Classes -->
<button class="btn btn-destructive">Delete</button>
```

### Badges

```html
<!-- Success -->
<span class="badge badge-success">Active</span>

<!-- Warning -->
<span class="badge badge-warning">Pending</span>

<!-- Error -->
<span class="badge badge-error">Failed</span>

<!-- Neutral -->
<span class="badge badge-neutral">Draft</span>
```

### Form Inputs

```html
<!-- Text Input -->
<input type="text" class="input" placeholder="Enter your name">

<!-- Disabled Input -->
<input type="text" class="input" disabled placeholder="Disabled">

<!-- With Label -->
<div>
  <label style="font-weight: var(--font-weight-semibold); color: var(--color-gray-700); display: block; margin-bottom: var(--spacing-sm);">
    Email Address
  </label>
  <input type="email" class="input" placeholder="email@example.com">
</div>
```

### Tables

```html
<table class="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td><span class="badge badge-success">Active</span></td>
      <td>
        <button class="btn btn-primary" style="padding: 0.375rem 0.75rem; font-size: 0.75rem;">Edit</button>
      </td>
    </tr>
  </tbody>
</table>
```

### Tabs

```html
<div class="tabs">
  <button class="tab tab-active">Overview</button>
  <button class="tab">Settings</button>
  <button class="tab">Analytics</button>
</div>
```

### Cards

```html
<!-- Regular Card -->
<div class="card">
  <h3 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); margin-bottom: var(--spacing-md);">
    Card Title
  </h3>
  <p style="color: var(--color-gray-600);">
    Card content goes here
  </p>
</div>

<!-- Selected Card -->
<div class="card card-selected">
  <h3>Selected Option</h3>
  <p>This card is selected</p>
</div>
```

## 🎨 Color Reference

### Using Colors in Code

**Tailwind:**
```jsx
// Primary
className="bg-[#0263E0] text-[#0263E0] border-[#0263E0]"
className="hover:bg-[#014DB5]"

// Success
className="bg-green-50 text-green-700 border-green-100"

// Warning
className="bg-amber-50 text-amber-700 border-amber-100"

// Error
className="bg-red-50 text-red-700 border-red-100"
```

**CSS Variables:**
```css
.my-element {
  background-color: var(--color-primary);
  color: var(--color-success);
  border: 1px solid var(--color-gray-300);
}
```

**JavaScript:**
```javascript
// From tokens.json
import tokens from './tokens.json';
element.style.backgroundColor = tokens.colors.primary.base;

// Or inline
element.style.backgroundColor = '#0263E0';
```

## 📐 Spacing & Sizing

### Spacing Scale
```
xs  = 0.25rem (4px)
sm  = 0.5rem  (8px)
md  = 1rem    (16px)
lg  = 1.5rem  (24px)
xl  = 2rem    (32px)
2xl = 3rem    (48px)
```

**Usage:**
```css
padding: var(--spacing-md); /* 16px */
margin: var(--spacing-lg);  /* 24px */
gap: var(--spacing-sm);     /* 8px */
```

### Border Radius
```
sm   = 0.25rem  (4px)
md   = 0.375rem (6px)
lg   = 0.5rem   (8px)
xl   = 0.75rem  (12px)
2xl  = 1rem     (16px)
full = 9999px   (pill shape)
```

## 🔤 Typography

### Font Sizes
```
xs   = 0.75rem  (12px)
sm   = 0.875rem (14px)
base = 1rem     (16px)
lg   = 1.125rem (18px)
xl   = 1.25rem  (20px)
2xl  = 1.5rem   (24px)
```

### Font Weights
```
normal    = 400
medium    = 500
semibold  = 600
bold      = 700
```

**Usage:**
```css
font-family: var(--font-sans);
font-size: var(--font-size-sm);
font-weight: var(--font-weight-semibold);
```

## 🎭 Common Patterns

### Stacked Display (Channel + Direction)
```html
<div style="display: flex; flex-direction: column;">
  <span style="font-weight: var(--font-weight-bold); color: var(--color-gray-900);">
    SMS
  </span>
  <span style="font-size: var(--font-size-xs); color: var(--color-gray-500); margin-top: 0.125rem;">
    Outbound
  </span>
</div>
```

### Icon with Text
```html
<button class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem;">
  <svg width="16" height="16"><!-- icon --></svg>
  <span>Add New</span>
</button>
```

### Hover State with Transition
```css
.interactive-element {
  transition: all var(--transition-fast);
}

.interactive-element:hover {
  background-color: var(--color-gray-50);
  color: var(--color-primary);
}
```

## 🚀 Quick Start Templates

### HTML Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <link rel="stylesheet" href="design-system/styles.css">
</head>
<body>
  <div style="max-width: 1200px; margin: 0 auto; padding: var(--spacing-xl);">
    <h1 style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); margin-bottom: var(--spacing-lg);">
      Welcome
    </h1>
    <button class="btn btn-primary">Get Started</button>
  </div>
</body>
</html>
```

### React Component Template
```jsx
import React from 'react';

export default function MyComponent() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">
        My Dashboard
      </h1>
      
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <button className="bg-[#0263E0] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#014DB5]">
          Primary Action
        </button>
      </div>
    </div>
  );
}
```

## 🔧 Customization

### Extending Colors
```javascript
// In your tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0263E0', // Twilio blue
          // Add your own shades if needed
        },
        // Add your brand colors
        brand: {
          purple: '#7C3AED',
          orange: '#F97316',
        }
      }
    }
  }
}
```

### Adding New Components
```css
/* In your custom CSS */
.my-custom-alert {
  padding: var(--spacing-md);
  background-color: var(--color-primary-light);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-lg);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}
```

## 📦 Exporting for Design Tools

### Figma Variables
1. Open tokens.json
2. Copy color values
3. In Figma: Plugins → Variables → Import JSON

### Sketch
Use the Sketch plugin "Design Tokens" to import tokens.json

### Adobe XD
Manually create color swatches using values from tokens.json

## 🆘 Troubleshooting

**Colors not showing?**
- Check CSS file is imported correctly
- Verify path to design-system folder
- Check browser console for errors

**Tailwind classes not working?**
- Ensure tailwind.config.js is in root
- Check content paths include your files
- Restart dev server after config changes

**Variables not defined?**
- Import styles.css before your custom CSS
- Use var(--variable-name) syntax
- Check for typos in variable names

## 📚 Additional Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- Design Tokens: See tokens.json for all values
- Component Examples: See examples/ directory

## 🤝 Contributing

When adding to this design system:
1. Update tokens.json first
2. Reflect changes in all format (Tailwind, CSS, docs)
3. Add usage examples
4. Update version number
5. Document breaking changes
