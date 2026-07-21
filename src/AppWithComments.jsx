import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Code2,
  Share2,
  Mail,
  Settings,
  Search,
  HelpCircle,
  Bell,
  User,
  ChevronDown,
  X,
  Check,
  ExternalLink,
  Menu,
  MessageSquarePlus,
  Eye
} from 'lucide-react';
import CommentingSidebar from './components/CommentingSidebar';
import { useCommenting } from './hooks/useCommenting';
// Import the view components from App.jsx
import { SettingsView, SetupView } from './App';

const AppWithComments = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('settings');
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState('SMS PUMPING PROTECTION');

  const {
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
  } = useCommenting();

  const handleSave = () => {
    setCurrentView('settings');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleCancel = () => {
    setCurrentView('settings');
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-slate-900 overflow-hidden">
      {/* Primary Sidebar */}
      <aside className="w-16 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col items-center py-4 z-20">
        <div className="mb-8">
          <div className="w-8 h-8 bg-[#0263E0] rounded-full flex items-center justify-center p-1.5">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-6 text-gray-400">
          <button className="hover:text-[#0263E0] transition-colors"><LayoutDashboard size={20} /></button>
          <button className="hover:text-[#0263E0] transition-colors"><Code2 size={20} /></button>
          <button className="hover:text-[#0263E0] transition-colors"><Share2 size={20} /></button>
          <button className="hover:text-[#0263E0] transition-colors"><Mail size={20} /></button>
          <button className="text-[#0263E0]"><Settings size={20} /></button>
        </nav>

        <div className="mt-auto">
           <button className="text-gray-400 hover:text-gray-600 transform rotate-180"><Menu size={20} /></button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-[#0263E0] text-sm font-semibold transition-colors"
              title="Switch to view-only mode"
            >
              <Eye size={16} />
              View Only
            </button>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2 text-[#0263E0] text-sm font-semibold">
              <MessageSquarePlus size={16} />
              Editable Mode
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-500">
            <Search size={18} className="cursor-pointer hover:text-gray-800" />
            <HelpCircle size={18} className="cursor-pointer hover:text-gray-800" />
            <Bell size={18} className="cursor-pointer hover:text-gray-800" />
            <Settings size={18} className="cursor-pointer hover:text-gray-800" />
            <div className="w-7 h-7 bg-purple-100 border border-purple-200 rounded-full flex items-center justify-center text-purple-600 cursor-pointer">
              <User size={14} />
            </div>
            <ChevronDown size={14} className="cursor-pointer" />
          </div>
        </header>

        {showToast && (
          <div className="absolute top-4 right-4 z-50 bg-white border border-gray-200 shadow-xl rounded-md p-3 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-300 w-96">
            <div className="bg-green-100 p-1 rounded-full">
              <Check size={16} className="text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-900">SMS pumping protection has been updated</p>
              <p className="text-[11px] text-gray-500">You have selected Advanced protection</p>
            </div>
            <button onClick={() => setShowToast(false)} className="text-[#0263E0] text-xs font-bold hover:underline">Undo</button>
          </div>
        )}

        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-white" id="commentable-content">
            {currentView === 'settings' ? (
              <SettingsView
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onEdit={() => setCurrentView('setup')}
              />
            ) : (
              <SetupView onSave={handleSave} onCancel={handleCancel} />
            )}
          </main>

          {/* Comments Sidebar */}
          <CommentingSidebar
            comments={comments}
            activeCommentId={activeCommentId}
            isSelecting={isSelecting}
            selectionData={selectionData}
            onAddComment={addComment}
            onAddReply={addReply}
            onDeleteComment={deleteComment}
            onCommentClick={setActiveCommentId}
            onStartSelection={startSelection}
            onCancelSelection={cancelSelection}
          />
        </div>
      </div>
    </div>
  );
};

export default AppWithComments;
