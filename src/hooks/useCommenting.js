import { useState, useEffect } from 'react';

const COMMENTS_API = 'http://localhost:3002/api/comments';
const STORAGE_KEY = 'sms-fraud-hub-comments-cache';

export const useCommenting = () => {
  const [comments, setComments] = useState([]);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionData, setSelectionData] = useState(null);

  // Load comments on mount
  useEffect(() => {
    loadComments();
  }, []);

  // Save to localStorage whenever comments change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    }
  }, [comments]);

  const loadComments = async () => {
    // Try loading from localStorage first (cache)
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setComments(parsed);
        restoreHighlights(parsed);
      } catch (e) {
        console.error('Error parsing cached comments:', e);
      }
    }

    // Then try loading from server/file
    try {
      const response = await fetch('/comments/sms-fraud-hub-comments.json');
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
        restoreHighlights(data.comments || []);
      }
    } catch (error) {
      console.log('No comments file yet:', error);
    }
  };

  const saveComments = async (updatedComments) => {
    setComments(updatedComments);

    // Save to server
    try {
      await fetch(COMMENTS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comments: updatedComments,
          lastModified: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Error saving comments to server:', error);
    }
  };

  const restoreHighlights = (commentsToRestore) => {
    // Wait for DOM to be ready
    setTimeout(() => {
      commentsToRestore.forEach(comment => {
        try {
          const element = document.querySelector(`[data-comment-anchor="${comment.id}"]`);
          if (!element && comment.selectedText) {
            // Try to find and highlight the text
            highlightTextInDOM(comment);
          }
        } catch (e) {
          console.warn(`Could not restore highlight for comment ${comment.id}`, e);
        }
      });
    }, 100);
  };

  const highlightTextInDOM = (comment) => {
    const content = document.getElementById('commentable-content');
    if (!content) return;

    const walker = document.createTreeWalker(
      content,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    while (node = walker.nextNode()) {
      const text = node.textContent;
      const index = text.indexOf(comment.selectedText);

      if (index !== -1) {
        const range = document.createRange();
        range.setStart(node, index);
        range.setEnd(node, index + comment.selectedText.length);

        const highlight = document.createElement('mark');
        highlight.setAttribute('data-comment-anchor', comment.id);
        highlight.className = 'comment-highlight bg-yellow-100 border-b-2 border-yellow-400 cursor-pointer hover:bg-yellow-200 transition-colors';
        highlight.onclick = () => setActiveCommentId(comment.id);

        try {
          range.surroundContents(highlight);
          break; // Found and highlighted, stop searching
        } catch (e) {
          console.warn('Could not wrap text:', e);
        }
      }
    }
  };

  const startSelection = () => {
    setIsSelecting(true);

    const handleMouseUp = (e) => {
      // Ignore clicks inside the comment sidebar
      if (e.target.closest('.comment-sidebar')) {
        return;
      }

      setTimeout(() => {
        const selection = window.getSelection();
        if (!selection.rangeCount || selection.isCollapsed) {
          return;
        }

        const range = selection.getRangeAt(0);
        const selectedText = range.toString().trim();

        if (selectedText.length < 3) {
          return;
        }

        // Check if selection is in commentable content area
        const content = document.getElementById('commentable-content');
        if (!content || !content.contains(range.commonAncestorContainer)) {
          return;
        }

        // Get bounding box for popover positioning
        const rect = range.getBoundingClientRect();

        setSelectionData({
          text: selectedText,
          range: range.cloneRange(), // Clone to preserve it
          position: {
            x: rect.right + 10,
            y: rect.top
          }
        });
      }, 50); // Small delay to ensure selection is complete
    };

    document.addEventListener('mouseup', handleMouseUp, { once: true });
  };

  const cancelSelection = () => {
    setIsSelecting(false);
    setSelectionData(null);
    window.getSelection().removeAllRanges();
  };

  const addComment = (author, text) => {
    if (!selectionData) return;

    const commentId = generateId();
    const { text: selectedText, range } = selectionData;

    // Create highlight
    const highlight = document.createElement('mark');
    highlight.setAttribute('data-comment-anchor', commentId);
    highlight.className = 'comment-highlight bg-yellow-100 border-b-2 border-yellow-400 cursor-pointer hover:bg-yellow-200 transition-colors';
    highlight.onclick = () => setActiveCommentId(commentId);

    try {
      range.surroundContents(highlight);
    } catch (e) {
      console.error('Could not create highlight:', e);
      // Fallback: just add comment without highlight
    }

    const newComment = {
      id: commentId,
      author,
      text,
      selectedText,
      createdAt: new Date().toISOString(),
      resolved: false,
      replies: []
    };

    const updatedComments = [...comments, newComment];
    saveComments(updatedComments);

    setActiveCommentId(commentId);
    setIsSelecting(false);
    setSelectionData(null);
    window.getSelection().removeAllRanges();
  };

  const addReply = (commentId, author, text) => {
    const updatedComments = comments.map(comment =>
      comment.id === commentId
        ? {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: generateId(),
                author,
                text,
                createdAt: new Date().toISOString()
              }
            ]
          }
        : comment
    );

    saveComments(updatedComments);
  };

  const deleteComment = (commentId) => {
    // Remove highlight from DOM
    const highlight = document.querySelector(`[data-comment-anchor="${commentId}"]`);
    if (highlight) {
      const parent = highlight.parentNode;
      while (highlight.firstChild) {
        parent.insertBefore(highlight.firstChild, highlight);
      }
      parent.removeChild(highlight);
    }

    const updatedComments = comments.filter(c => c.id !== commentId);
    saveComments(updatedComments);

    if (activeCommentId === commentId) {
      setActiveCommentId(null);
    }
  };

  return {
    comments,
    activeCommentId,
    isSelecting,
    selectionData,
    addComment,
    addReply,
    deleteComment,
    setActiveCommentId,
    startSelection,
    cancelSelection
  };
};

// Simple ID generator
const generateId = () => {
  return `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
