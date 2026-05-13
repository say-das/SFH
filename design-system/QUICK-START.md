# Design System Quick Start

Get up and running with the Twilio design system in minutes!

## 🎯 For New React Projects

1. **Copy the Tailwind config:**
```bash
cp design-system/tailwind.config.js ./
```

2. **Use in your components:**
```jsx
// Primary button
<button className="bg-[#0263E0] hover:bg-[#014DB5] text-white px-6 py-2.5 rounded-lg font-semibold">
  Click Me
</button>

// Badge
<span className="bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full text-xs font-bold">
  Active
</span>
```

## 🌐 For HTML/Vanilla JS Projects

1. **Link the CSS file:**
```html
<link rel="stylesheet" href="path/to/design-system/styles.css">
```

2. **Use the classes:**
```html
<button class="btn btn-primary">Click Me</button>
<span class="badge badge-success">Active</span>
<input type="text" class="input" placeholder="Enter text">
```

## 📦 For Any Framework

1. **Import design tokens:**
```javascript
import tokens from './design-system/tokens.json';

const primaryColor = tokens.colors.primary.base; // "#0263E0"
```

2. **Apply to your styles:**
```javascript
const buttonStyle = {
  backgroundColor: tokens.colors.primary.base,
  padding: tokens.components.button.primary.padding
};
```

## 🎨 Essential Colors

```
Primary:  #0263E0 (Twilio blue)
Hover:    #014DB5 (Darker blue)
Success:  #10B981 (Green)
Warning:  #F59E0B (Amber)
Error:    #EF4444 (Red)
```

## 📁 Files You'll Need

**For Tailwind projects:**
- `tailwind.config.js` - Copy to your project root

**For CSS/HTML projects:**
- `styles.css` - Link in your HTML

**For design tools:**
- `tokens.json` - Import into Figma/Sketch

**For reference:**
- `USAGE.md` - Complete usage guide
- `examples/showcase.html` - Live component examples

## 🔗 What's Next?

1. Browse `examples/showcase.html` to see all components
2. Read `USAGE.md` for detailed documentation
3. Check `tokens.json` for all available values
4. Customize `tailwind.config.js` for your brand

## 💡 Quick Tips

- Always use `#0263E0` for primary actions (buttons, links)
- Use `#014DB5` for hover states
- Keep success = green, warning = amber, error = red
- Use gray-50 to gray-900 for neutral elements
- Border radius: `0.5rem` (lg) for most components

## 🆘 Need Help?

- Check `USAGE.md` for detailed examples
- View `showcase.html` in browser for live preview
- See `tokens.json` for all available values
- Review the main project's README for context

---

**Version:** 1.0.0  
**Compatible with:** React, Vue, Angular, HTML, any modern framework  
**License:** Private - Internal use only
