const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

const COMMENTS_FILE = path.join(__dirname, 'public', 'comments', 'sms-fraud-hub-comments.json');

// Ensure comments directory exists
const ensureCommentsDir = async () => {
  const dir = path.dirname(COMMENTS_FILE);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    console.error('Error creating comments directory:', error);
  }
};

// Read comments
app.get('/api/comments', async (req, res) => {
  try {
    const data = await fs.readFile(COMMENTS_FILE, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    // File doesn't exist yet, return empty
    res.json({ comments: [], lastModified: null });
  }
});

// Save comments
app.post('/api/comments', async (req, res) => {
  try {
    await ensureCommentsDir();
    await fs.writeFile(COMMENTS_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving comments:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`💬 Comments API server running on http://localhost:${PORT}`);
  console.log(`📝 Comments will be saved to: ${COMMENTS_FILE}`);
});
