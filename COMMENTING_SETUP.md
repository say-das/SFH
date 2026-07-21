# SMS Fraud Hub - Commenting Feature Setup

## Overview

The SMS Fraud Hub now has two modes:
- **View-Only Mode** (`/`) - Original page, no commenting
- **Editable Mode** (`/editable`) - Full Google Docs-style commenting

## Features

✅ Text selection and highlighting  
✅ Add comments with name (mandatory)  
✅ Reply to comments (threaded)  
✅ Delete comments  
✅ Persistent storage (JSON file + localStorage)  
✅ Click highlight → scroll to comment  
✅ Click comment → highlight text on page  
✅ Relative timestamps ("2h ago")  
✅ No breaking changes to existing page

## Installation

### 1. Install Dependencies

```bash
cd "/Users/saydas/Documents/CPM/Experiments/SMS Fraud Hub"
npm install
```

New packages added:
- `react-router-dom` - Page routing
- `express` - Backend API server
- `cors` - CORS support
- `concurrently` - Run Vite + Node together

### 2. Start Development Server

```bash
npm run dev
```

This starts:
- Vite dev server on `http://localhost:5173`
- Comments API server on `http://localhost:3001`

### 3. Access the Application

- **View-Only Mode:** http://localhost:5173/
- **Editable Mode:** http://localhost:5173/editable

## Usage

### Adding a Comment

1. Go to http://localhost:5173/editable
2. Click "Add Comment" button in right sidebar
3. Select any text on the page
4. Enter your name and comment in the form
5. Click "Comment" button
6. Selected text will be highlighted in yellow

### Replying to a Comment

1. Click "Reply" button under any comment
2. Enter your name and reply text
3. Click "Reply" button
4. Reply appears indented under original comment

### Deleting a Comment

1. Click trash icon (🗑️) on any comment
2. Comment and highlight are removed

### Navigating Comments

- Click a **highlight** on the page → scrolls sidebar to that comment
- Click a **comment** in sidebar → (highlight stays visible)
- Click **quoted text** in comment → scrolls to highlight

## File Structure

```
/Experiments/SMS Fraud Hub/
├── src/
│   ├── App.jsx                          # Original view-only page
│   ├── AppWithComments.jsx              # New editable page with comments
│   ├── main.jsx                         # Router setup
│   ├── hooks/
│   │   └── useCommenting.js             # Comment state management
│   └── components/
│       └── CommentingSidebar.jsx        # Comments sidebar UI
├── server.js                            # Express API for saving comments
├── public/
│   └── comments/
│       └── sms-fraud-hub-comments.json  # Stored comments (auto-created)
└── package.json
```

## Data Storage

### LocalStorage (Cache)
- Comments cached in browser: `sms-fraud-hub-comments-cache`
- Fast loading on page refresh
- Survives browser refresh, lost on cache clear

### JSON File (Persistent)
- File: `public/comments/sms-fraud-hub-comments.json`
- Shared across all users
- Survives server restart
- Can be committed to git

### JSON Format

```json
{
  "comments": [
    {
      "id": "comment_1234567890_abc123",
      "author": "John Doe",
      "text": "Should we add email alerts here?",
      "selectedText": "Notification: Email, Webhook, or None",
      "createdAt": "2026-05-16T14:23:10.000Z",
      "resolved": false,
      "replies": [
        {
          "id": "comment_1234567891_def456",
          "author": "Jane Smith",
          "text": "Yes, good idea!",
          "createdAt": "2026-05-16T15:10:22.000Z"
        }
      ]
    }
  ],
  "lastModified": "2026-05-16T15:10:22.000Z"
}
```

## API Endpoints

### GET `/api/comments`
Load all comments from JSON file.

**Response:**
```json
{
  "comments": [...],
  "lastModified": "2026-05-16T15:10:22.000Z"
}
```

### POST `/api/comments`
Save comments to JSON file.

**Request Body:**
```json
{
  "comments": [...],
  "lastModified": "2026-05-16T15:10:22.000Z"
}
```

## How It Works

### 1. Text Selection
- User clicks "Add Comment" button → enters selection mode
- User selects text on page
- `window.getSelection()` captures the range
- Form appears with name + comment fields

### 2. Creating Highlight
```javascript
// Wrap selected text in <mark> element
const highlight = document.createElement('mark');
highlight.setAttribute('data-comment-anchor', commentId);
highlight.className = 'comment-highlight bg-yellow-100...';
range.surroundContents(highlight);
```

### 3. Persisting Comments
- Comment saved with `selectedText` (for restoration)
- On page load, find text and re-create highlights
- If text moved/changed, comment shows in sidebar without highlight

### 4. Click Handlers
```javascript
// Highlight click → scroll sidebar to comment
highlight.onclick = () => {
  setActiveCommentId(commentId);
  scrollToCommentInSidebar(commentId);
};
```

## Limitations & Known Issues

### ⚠️ DOM Changes Break Highlights
**Problem:** If page content changes, highlights may not restore.

**Solution:** Comments still visible in sidebar with quoted text. User can see what was commented even if highlight missing.

### ⚠️ Concurrent Edits
**Problem:** Two users commenting simultaneously may overwrite each other.

**Current:** Last write wins (acceptable for small teams).

**Future:** Add file locking with `proper-lockfile` package.

### ⚠️ Large Selections
**Problem:** Selecting across multiple paragraphs/sections may fail.

**Workaround:** Select smaller text chunks (single paragraph works best).

## Production Deployment

### Option 1: Keep JSON File
- Deploy Vite build + Node.js server
- Comments persist in `public/comments/` directory
- Simple, no database needed

### Option 2: Upgrade to Database
When you need:
- 10+ concurrent users
- 1000+ comments
- User authentication
- Audit trails

Switch to PostgreSQL:
```sql
CREATE TABLE comments (
  id TEXT PRIMARY KEY,
  author TEXT NOT NULL,
  text TEXT NOT NULL,
  selected_text TEXT,
  created_at TIMESTAMP,
  resolved BOOLEAN
);

CREATE TABLE replies (
  id TEXT PRIMARY KEY,
  comment_id TEXT REFERENCES comments(id),
  author TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP
);
```

## Troubleshooting

### Comments not saving
1. Check server is running: `http://localhost:3001/api/comments`
2. Check browser console for errors
3. Check `public/comments/` directory exists and is writable

### Highlights not restoring
1. Check localStorage: `localStorage.getItem('sms-fraud-hub-comments-cache')`
2. Open DevTools → Find `<mark data-comment-anchor="...">` elements
3. If text changed, highlights won't restore (expected behavior)

### Port already in use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or change port in server.js
const PORT = 3002; // Use different port
```

## Future Enhancements

- [ ] Resolve/unresolve comments workflow
- [ ] Filter: Show all / Show resolved / Show unresolved
- [ ] Search comments
- [ ] Export comments to PDF
- [ ] Email notifications on replies
- [ ] User authentication (assign comments to logged-in user)
- [ ] Mobile responsive sidebar (bottom sheet)
- [ ] Hover tooltip preview on highlights
- [ ] Conflict resolution for concurrent edits

## Development Timeline

Built in ~2-3 weeks:
- Text selection & highlighting: 3-4 days
- Comment state management: 2 days
- UI components (sidebar, forms): 3-4 days
- Backend API: 1 day
- Testing & polish: 2-3 days

**Total:** 13-17 days (2.5-3.5 weeks, 1 engineer)
