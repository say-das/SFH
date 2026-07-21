import React, { useState } from 'react';
import { MessageSquarePlus, Trash2, Reply, X, Check, ChevronLeft, ChevronRight } from 'lucide-react';

const CommentingSidebar = ({
  comments,
  activeCommentId,
  isSelecting,
  selectionData,
  onAddComment,
  onAddReply,
  onDeleteComment,
  onCommentClick,
  onStartSelection,
  onCancelSelection
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyText, setReplyText] = useState('');

  const handleAddComment = () => {
    if (!newCommentAuthor.trim() || !newCommentText.trim()) return;

    onAddComment(newCommentAuthor.trim(), newCommentText.trim());
    setNewCommentAuthor('');
    setNewCommentText('');
  };

  const handleAddReply = (commentId) => {
    if (!replyAuthor.trim() || !replyText.trim()) return;

    onAddReply(commentId, replyAuthor.trim(), replyText.trim());
    setReplyAuthor('');
    setReplyText('');
    setReplyingTo(null);
  };

  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleHighlightClick = (commentId) => {
    onCommentClick(commentId);
    // Scroll to comment in sidebar
    setTimeout(() => {
      const element = document.getElementById(`comment-${commentId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  // Update click handlers on highlights
  React.useEffect(() => {
    const highlights = document.querySelectorAll('[data-comment-anchor]');
    highlights.forEach(highlight => {
      const commentId = highlight.getAttribute('data-comment-anchor');
      highlight.onclick = () => handleHighlightClick(commentId);
    });
  }, [comments]);

  return (
    <aside className={`comment-sidebar border-l border-gray-200 bg-white flex flex-col overflow-hidden transition-all duration-300 relative ${
      isCollapsed ? 'w-12' : 'w-80'
    }`}>
      {/* Collapse/Expand Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 -left-3 z-50 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:text-[#0263E0] hover:border-[#0263E0] shadow-sm transition-all"
        title={isCollapsed ? 'Expand comments' : 'Collapse comments'}
      >
        {isCollapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {isCollapsed ? (
        /* Collapsed State - Vertical Tab */
        <div className="flex-1 flex flex-col items-center py-6 gap-4">
          <button
            onClick={() => setIsCollapsed(false)}
            className="writing-mode-vertical text-xs font-bold text-gray-500 hover:text-[#0263E0] transition-colors flex items-center gap-2"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            <MessageSquarePlus size={16} className="transform rotate-90" />
            <span>Comments ({comments.length})</span>
          </button>
        </div>
      ) : (
        /* Expanded State - Full Sidebar */
        <>
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Comments</h3>
              <span className="text-xs text-gray-500">{comments.length} total</span>
            </div>

        <button
          onClick={onStartSelection}
          disabled={isSelecting}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            isSelecting
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-[#0263E0] text-white hover:bg-[#014DB5] shadow-sm'
          }`}
        >
          <MessageSquarePlus size={16} />
          {isSelecting ? 'Select text...' : 'Add Comment'}
        </button>

        {isSelecting && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Select text on the page to add a comment
          </p>
        )}
      </div>

      {/* New Comment Form (when text is selected) */}
      {isSelecting && selectionData && (
        <div className="p-4 bg-blue-50 border-b border-blue-200 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">Your Name *</label>
              <input
                type="text"
                value={newCommentAuthor}
                onChange={(e) => setNewCommentAuthor(e.target.value)}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-[#0263E0] outline-none"
                autoFocus
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">Comment *</label>
              <textarea
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Add your comment"
                rows={3}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-[#0263E0] outline-none resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddComment}
                disabled={!newCommentAuthor.trim() || !newCommentText.trim()}
                className="flex-1 bg-[#0263E0] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#014DB5] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Comment
              </button>
              <button
                onClick={onCancelSelection}
                className="px-4 py-2 rounded text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquarePlus size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">No comments yet</p>
            <p className="text-xs text-gray-400 mt-1">Click "Add Comment" to get started</p>
          </div>
        ) : (
          comments.map(comment => (
            <CommentThread
              key={comment.id}
              comment={comment}
              isActive={activeCommentId === comment.id}
              onCommentClick={onCommentClick}
              onDelete={onDeleteComment}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              replyAuthor={replyAuthor}
              setReplyAuthor={setReplyAuthor}
              replyText={replyText}
              setReplyText={setReplyText}
              onAddReply={handleAddReply}
              formatTimestamp={formatTimestamp}
            />
          ))
        )}
      </div>
        </>
      )}
    </aside>
  );
};

const CommentThread = ({
  comment,
  isActive,
  onCommentClick,
  onDelete,
  replyingTo,
  setReplyingTo,
  replyAuthor,
  setReplyAuthor,
  replyText,
  setReplyText,
  onAddReply,
  formatTimestamp
}) => {
  return (
    <div
      id={`comment-${comment.id}`}
      className={`border rounded-lg p-3 transition-all ${
        isActive
          ? 'border-[#0263E0] bg-blue-50 shadow-sm'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Main Comment */}
      <div className="flex items-start gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 font-semibold text-sm flex-shrink-0">
          {comment.author[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-slate-900">{comment.author}</span>
            <button
              onClick={() => onDelete(comment.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Delete comment"
            >
              <Trash2 size={14} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mb-2">{formatTimestamp(comment.createdAt)}</p>
          <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>

          {/* Quoted Text */}
          {comment.selectedText && (
            <div
              className="mt-2 p-2 bg-yellow-50 border-l-2 border-yellow-400 rounded text-xs text-gray-600 italic cursor-pointer hover:bg-yellow-100 transition-colors"
              onClick={() => onCommentClick(comment.id)}
              title="Click to highlight on page"
            >
              "{comment.selectedText}"
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className="ml-11 mt-3 space-y-3 border-l-2 border-gray-200 pl-3">
          {comment.replies.map(reply => (
            <div key={reply.id} className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-green-600 font-semibold text-xs flex-shrink-0">
                {reply.author[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-slate-900">{reply.author}</span>
                  <span className="text-xs text-gray-400">{formatTimestamp(reply.createdAt)}</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">{reply.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply Form */}
      {replyingTo === comment.id ? (
        <div className="ml-11 mt-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <input
            type="text"
            value={replyAuthor}
            onChange={(e) => setReplyAuthor(e.target.value)}
            placeholder="Your name *"
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:ring-2 focus:ring-[#0263E0] outline-none"
          />
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Add a reply *"
            rows={2}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:ring-2 focus:ring-[#0263E0] outline-none resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => onAddReply(comment.id)}
              disabled={!replyAuthor.trim() || !replyText.trim()}
              className="flex-1 bg-[#0263E0] text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-[#014DB5] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Reply
            </button>
            <button
              onClick={() => setReplyingTo(null)}
              className="px-3 py-1.5 rounded text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setReplyingTo(comment.id)}
          className="ml-11 mt-2 flex items-center gap-1 text-xs text-[#0263E0] hover:text-[#014DB5] font-semibold transition-colors"
        >
          <Reply size={12} />
          Reply
        </button>
      )}
    </div>
  );
};

export default CommentingSidebar;
