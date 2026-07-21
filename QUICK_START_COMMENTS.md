# Quick Start: Commenting Feature

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd "/Users/saydas/Documents/CPM/Experiments/SMS Fraud Hub"
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 500 ms
➜  Local:   http://localhost:5173/

💬 Comments API server running on http://localhost:3001
📝 Comments will be saved to: /Users/saydas/Documents/CPM/Experiments/SMS Fraud Hub/public/comments/sms-fraud-hub-comments.json
```

### Step 3: Try It Out

**View-Only Mode (Original):**
- Open: http://localhost:5173/
- Click "Enable Comments" button → switches to editable mode

**Editable Mode (With Comments):**
- Open: http://localhost:5173/editable
- Click "Add Comment" button in right sidebar
- Select any text on the page
- Fill in your name and comment
- Click "Comment" → text gets highlighted in yellow
- Click "View Only" button → switches back to original mode

## 📋 Key Features Demo

### Adding a Comment
1. Go to `/editable`
2. Click **"Add Comment"** in right sidebar
3. Select text: "SMS pumping protection"
4. Enter name: "John Doe"
5. Enter comment: "Should we clarify what this means?"
6. Click **"Comment"**
7. ✅ Text highlighted, comment appears in sidebar

### Replying to a Comment
1. Click **"Reply"** under any comment
2. Enter name: "Jane Smith"  
3. Enter reply: "Good point! I'll add a tooltip."
4. Click **"Reply"**
5. ✅ Reply appears indented under original comment

### Clicking Highlights
1. Click a **yellow highlight** on the page
2. ✅ Sidebar scrolls to that comment
3. ✅ Comment card becomes blue (active state)

### Deleting Comments
1. Click **trash icon (🗑️)** on any comment
2. ✅ Comment removed from sidebar
3. ✅ Highlight removed from page

## 🎯 Where Comments Are Stored

**LocalStorage (Browser Cache):**
- Key: `sms-fraud-hub-comments-cache`
- Persists across page refreshes
- Lost if you clear browser cache

**JSON File (Persistent):**
- Path: `public/comments/sms-fraud-hub-comments.json`
- Auto-created on first comment
- Shared across all users
- Can be committed to git (or gitignored)

**To view saved comments:**
```bash
cat "public/comments/sms-fraud-hub-comments.json"
```

## 🔄 Two-Page Architecture

```
┌─────────────────────────────────────┐
│  Route: /                           │
│  Component: App.jsx                 │
│  Mode: View-Only (Original)         │
│  Features: No commenting            │
│  Button: "Enable Comments" →        │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│  Route: /editable                   │
│  Component: AppWithComments.jsx     │
│  Mode: Editable (With Comments)     │
│  Features: Full commenting          │
│  Button: "View Only" →              │
└─────────────────────────────────────┘
```

## 🛠️ Troubleshooting

### "Comments not saving"
**Check:** Is the server running?
```bash
curl http://localhost:3001/api/comments
```

**Expected:** `{"comments":[],"lastModified":null}` (if no comments yet)

**Fix:** Make sure you ran `npm run dev` (not just `vite`)

---

### "Port 3001 already in use"
**Error:** `Error: listen EADDRINUSE: address already in use :::3001`

**Fix:** Kill the process:
```bash
lsof -ti:3001 | xargs kill -9
```

Or change port in `server.js`:
```javascript
const PORT = 3002; // Use different port
```

---

### "Highlights not showing up"
**Possible cause:** Text content changed after comment was created.

**What happens:**
- Comment still visible in sidebar
- Quoted text shows what was originally selected
- Highlight doesn't appear on page (expected)

**This is normal** — highlights are best-effort, comments are permanent.

---

### "React Router errors"
**Error:** `Error: useNavigate() may be used only in the context of a <Router>`

**Fix:** Make sure you installed dependencies:
```bash
npm install
```

If error persists:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📦 What Was Added

**New Files:**
- `src/AppWithComments.jsx` - Editable mode page
- `src/hooks/useCommenting.js` - Comment state management
- `src/components/CommentingSidebar.jsx` - Sidebar UI
- `server.js` - Express API for saving comments

**Modified Files:**
- `src/main.jsx` - Added React Router
- `src/App.jsx` - Added "Enable Comments" button
- `package.json` - Added dependencies

**New Dependencies:**
- `react-router-dom` - Page routing
- `express` - Backend server
- `cors` - CORS support
- `concurrently` - Run Vite + Node together

## ✨ Next Steps

**Try these workflows:**

1. **Leave feedback on design decisions:**
   - Select text in "Advanced protection" section
   - Comment: "Should we reconsider this pricing?"

2. **Start a discussion thread:**
   - Comment on "DIY Fraud Prevention"
   - Reply to your own comment
   - See threaded conversation

3. **Mark completed items:**
   - Use comments to track TODOs
   - Delete when done

4. **Share with team:**
   - Send them the `/editable` URL
   - Everyone sees the same comments (shared JSON file)

---

**Full documentation:** See [COMMENTING_SETUP.md](./COMMENTING_SETUP.md)
