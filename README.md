# SMS Fraud Hub

A comprehensive fraud protection configuration interface for messaging services, built with React and designed to match Twilio's design system.

## 🎯 Overview

SMS Fraud Hub is a full-featured fraud prevention dashboard that allows users to configure protection rules, monitor alerts, manage block lists, and customize fraud detection settings for SMS, RCS, WhatsApp, and MMS channels.

## 🛠 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server with HMR (Hot Module Replacement)
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Twilio Design System** - Brand colors and design language

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📁 Project Structure

```
SMS Fraud Hub/
├── src/
│   ├── App.jsx              # Main application with all components
│   ├── App.jsx.backup       # Backup of previous version
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles with Tailwind directives
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── README.md                # This file
```

## 🎨 Design System

### Colors (Twilio Brand)
- **Primary Blue**: `#0263E0` - Main brand color for buttons, links, active states
- **Primary Blue Hover**: `#014DB5` - Darker shade for hover states
- **Light Blue Background**: `#F0F6FF` - Selected tabs and highlights
- **Success Green**: Standard green shades for success states
- **Warning Amber**: Standard amber shades for warnings
- **Error Red**: Standard red shades for errors and destructive actions
- **Neutral Grays**: Gray-50 to Gray-900 for backgrounds and text

### Typography
- **Font Family**: Inter (system-ui fallback)
- **Headers**: Bold, various sizes (text-xl to text-2xl)
- **Body**: Regular weight, text-sm to text-base
- **Labels**: Semibold, text-xs to text-sm
- **Uppercase Labels**: Bold, text-[10px] to text-[11px], tracking-widest

## ✨ Features & Sections

### 1. Main Dashboard (Settings View)
- **Protection Plans**: 
  - Basic (Free) - Automatic high-risk blocking
  - Advanced (Paid) - Fine-tuned controls with pricing
- **Tab Navigation**: General, Geo Permissions, SMS Pumping Protection
- **Breadcrumb**: Settings navigation path

### 2. Advanced Setup View
Navigation sidebar with scrollable sections:

#### a. Default Protection
- Low, Medium, High protection levels
- Radio button selection with descriptions
- Applies to countries without specific overrides

#### b. Country-Specific Protection
- Override default protection per country
- Four levels: Low, Medium, High, No protection
- Multi-select country dropdowns
- 30+ countries available

#### c. Messaging Use Case
- AI Classification: Consent-based intelligent detection
- Custom Classification: Manual traffic categorization
  - Options: Verification/2FA, Transactional, Promotional, Others

#### d. DIY Fraud Prevention
**Rules Management:**
- View/Create/Edit custom fraud detection rules
- Table columns: Channel, Alert Type, Threshold, Frequency, Scope, Notification, Action
- Sample rules with different configurations

**Alerts View:**
- Comprehensive alert logging
- Filter section with 8 filters:
  - Channel, Date Range (From/To), Volume threshold
  - Notification sent, Alert Type, Actions, Scope
- Alerts table showing triggered events with:
  - Channel/Direction (stacked), Scope (with flags), Volume
  - Date/Time, Action badges, Notification status, Alert Type

**Rule Creation Form:**
- Channel: SMS, RCS, WhatsApp, MMS
- Direction: Inbound, Outbound, Both
- Alert Type: Fraud Alert, Volume(#) Alert, Usage($) Alert
- Threshold: Intelligent (AI-based) or Numeric (manual value)
- Frequency: Hourly, Daily, Weekly, Monthly
- Scope: Global, NAMER, EMEA, LATAM, APAC, or specific countries
- Notification: 
  - None checkbox (disables inputs)
  - Email input field
  - Webhook URL input field
- Action: None, Increase protection, Block Traffic

#### e. Block List
**Network Blocks:**
- Block by Country + Network (auto-fills MCC-MNC)
- Block by MCC-MNC code (auto-fills Country + Network)
- Bidirectional mapping for major carriers:
  - US: Verizon, AT&T, T-Mobile
  - Germany: Deutsche Telekom, Vodafone, O2
  - India: Airtel, Vodafone Idea, Jio
  - UK: EE, O2, Vodafone

**Phone Number Blocks:**
- Full phone number blocking
- Prefix blocking (auto-converts last 3 digits to 'xxx')
- Example: +919611531234 → +919611531xxx

**Common Block Parameters:**
- Channel: SMS, RCS, WhatsApp, MMS
- Direction: Inbound, Outbound, Both
- TTL: Days (1-999) or Permanent
- Reason: Optional documentation field
- Archive functionality for active blocks

### 3. UI Components

**Tables:**
- Compact design with hover states
- Channel + Direction merged column (stacked display)
- Color-coded action badges
- Edit/Delete actions per row
- Horizontal scroll for overflow

**Forms:**
- Modal-style with overlay effect
- Slide-in animation
- Two-column grid layout
- Clear Cancel/Submit actions
- Validation and required fields
- Auto-fill and smart defaults

**Buttons:**
- Primary: Twilio blue with white text
- Secondary: White with gray border
- Destructive: Red border for delete actions
- Hover states with smooth transitions

**Badges:**
- Rounded pills with border
- Color-coded by type:
  - Green: Active status, success
  - Red: Block Traffic, errors
  - Amber: Increase protection, warnings
  - Gray: None action, neutral
  - Purple: Review status

## 🔄 State Management

All state is managed locally within components using React hooks:
- `useState` - Component state
- `useEffect` - Side effects (if needed)
- Props drilling for parent-child communication

## 📊 Data Structure Examples

### Rule Object
```javascript
{
  id: 1,
  channel: 'SMS',
  direction: 'Outbound',
  alertType: 'Volume(#) Alert',
  threshold: '1000',
  frequency: 'Hourly',
  scope: 'Global',
  notification: 'email@example.com',
  action: 'Block Traffic'
}
```

### Alert Object
```javascript
{
  id: 1,
  channel: 'SMS',
  direction: 'Outbound',
  scope: 'Thailand (+66)',
  flag: '🇹🇭',
  volume: 2515,
  dateTime: '2025.03.27 20:55:43',
  action: 'None',
  notification: 'Yes',
  alertType: 'Volume(#) Alert'
}
```

### Block Object
```javascript
{
  id: 1,
  type: 'network',
  country: 'Germany',
  network: 'Vodafone',
  mccMnc: '262-02',
  channel: 'SMS',
  direction: 'Outbound',
  ttl: 'Permanent',
  reason: 'High fraud rate detected',
  createdAt: '2025.03.15 14:22:10',
  status: 'Active'
}
```

## 🎯 Key Features for Context

1. **No Database**: All data is mock data stored in component state
2. **Single Page App**: All components in one App.jsx file
3. **Responsive Design**: Works on desktop and tablet sizes
4. **Hot Reload**: Changes reflect instantly during development
5. **Backup System**: App.jsx.backup maintained for rollback
6. **Design Consistency**: Twilio brand colors throughout
7. **Accessibility**: Semantic HTML, clear labels, keyboard navigation
8. **Performance**: Optimized with React best practices

## 🔧 Development Notes

### Adding New Features
1. Always backup before changes: `cp src/App.jsx src/App.jsx.backup`
2. Add new components before the `export default App` line
3. Maintain Twilio color scheme: `#0263E0` primary, `#014DB5` hover
4. Follow existing patterns for tables, forms, badges
5. Test all workflows after changes

### Color Reference
```css
/* Primary Actions */
bg-[#0263E0]          /* Buttons, selected states */
hover:bg-[#014DB5]    /* Button hover */
text-[#0263E0]        /* Links, active text */
border-[#0263E0]      /* Selected borders */
bg-[#F0F6FF]          /* Light blue backgrounds */

/* Status Colors */
bg-green-50 text-green-700    /* Success/Active */
bg-red-50 text-red-700        /* Error/Block */
bg-amber-50 text-amber-700    /* Warning/Alert */
bg-gray-50 text-gray-500      /* Neutral/None */
```

### Common Patterns

**Stacked Display (Channel + Direction):**
```jsx
<div className="flex flex-col">
  <span className="font-bold text-slate-900">{channel}</span>
  <span className="text-xs text-gray-500 mt-0.5">{direction}</span>
</div>
```

**Action Badges:**
```jsx
<span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-[color]">
  <Icon size={10} />
  {actionText}
</span>
```

**Primary Button:**
```jsx
<button className="bg-[#0263E0] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#014DB5] shadow-md transition-all active:scale-[0.98]">
  Action
</button>
```

## 📝 Version History

- **v1.0**: Initial setup with React + Vite + Tailwind
- **v1.1**: Added rules management and alerts view
- **v1.2**: Added block list with network and phone number blocking
- **v1.3**: Updated to Twilio design system (colors, typography)
- **Current**: Full-featured fraud prevention dashboard

## 🤝 Contributing

This is an internal project. When making changes:
1. Always backup files before editing
2. Test all workflows after changes
3. Maintain design consistency
4. Update README if structure changes
5. Keep App.jsx.backup current

## 📄 License

Private - Internal use only

## 🆘 Troubleshooting

**Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
npm run dev -- --port 3001
```

**Changes not reflecting:**
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Clear browser cache
- Restart dev server

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For questions about this codebase, refer to:
- This README for structure and context
- App.jsx.backup for previous working version
- Inline comments in code for component-specific details
