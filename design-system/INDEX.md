# Design System Index

Quick navigation to all design system resources.

## 📚 Documentation

| File | Description | When to Use |
|------|-------------|-------------|
| [QUICK-START.md](QUICK-START.md) | 5-minute setup guide | First time using the system |
| [USAGE.md](USAGE.md) | Complete usage guide | Daily development reference |
| [PACKAGE-SUMMARY.md](PACKAGE-SUMMARY.md) | Overview & decisions | Understanding the system |
| [README.md](README.md) | Package introduction | Sharing with others |

## 🎨 Design Files

| File | Format | Use Case |
|------|--------|----------|
| [tailwind.config.js](tailwind.config.js) | JavaScript | React, Vue, Next.js projects |
| [styles.css](styles.css) | CSS | HTML, PHP, vanilla JS |
| [tokens.json](tokens.json) | JSON | Any framework, design tools |

## 🖼 Examples

| File | Description |
|------|-------------|
| [examples/showcase.html](examples/showcase.html) | Live component showcase |

## 🚀 Quick Links by Framework

### React / Vue / Next.js
1. Copy `tailwind.config.js`
2. See [USAGE.md - Tailwind section](USAGE.md#1-tailwind-css-recommended-for-reactvuenextjs)

### HTML / Vanilla JS / PHP
1. Link `styles.css`
2. See [USAGE.md - CSS Variables section](USAGE.md#2-css-variables-for-any-project)

### React Native / Flutter / Other
1. Import `tokens.json`
2. See [USAGE.md - Design Tokens section](USAGE.md#3-design-tokens-framework-agnostic)

### Figma / Sketch / Adobe XD
1. Import `tokens.json`
2. See [USAGE.md - Design Tools section](USAGE.md#-exporting-for-design-tools)

## 🎯 Quick Reference

### Colors
```
Primary:  #0263E0
Hover:    #014DB5
Success:  #10B981
Warning:  #F59E0B
Error:    #EF4444
```

### Components
- Buttons: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-destructive`
- Badges: `.badge`, `.badge-success`, `.badge-warning`, `.badge-error`
- Inputs: `.input`
- Tables: `.table`
- Cards: `.card`, `.card-selected`
- Tabs: `.tabs`, `.tab`, `.tab-active`

### Spacing
```
xs  = 4px   (0.25rem)
sm  = 8px   (0.5rem)
md  = 16px  (1rem)
lg  = 24px  (1.5rem)
xl  = 32px  (2rem)
2xl = 48px  (3rem)
```

## 📋 Common Tasks

| Task | File to Reference |
|------|-------------------|
| Set up new project | [QUICK-START.md](QUICK-START.md) |
| Find component example | [showcase.html](examples/showcase.html) |
| Get exact color values | [tokens.json](tokens.json) |
| Learn best practices | [USAGE.md](USAGE.md) |
| Understand decisions | [PACKAGE-SUMMARY.md](PACKAGE-SUMMARY.md) |
| Share with team | [README.md](README.md) |

## 🔍 Search Tips

**Looking for a specific component?**  
→ Open `showcase.html` in browser

**Need exact values?**  
→ Search `tokens.json`

**Want code examples?**  
→ Check `USAGE.md`

**First time here?**  
→ Start with `QUICK-START.md`

---

**Version:** 1.0.0  
**Last Updated:** 2025
