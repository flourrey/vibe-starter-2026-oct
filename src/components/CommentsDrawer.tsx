import React, { useState } from 'react';
import { X, ThumbsUp, Send, CheckCircle2 } from 'lucide-react';
import { Article, CommentItem } from '../types/news';

interface CommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article;
  onAddComment: (comment: CommentItem) => void;
}

export const CommentsDrawer: React.FC<CommentsDrawerProps> = ({
  isOpen,
  onClose,
  article,
  onAddComment,
}) => {
  const [tab, setTab] = useState<'all' | 'picks'>('picks');
  const [authorName, setAuthorName] = useState('');
  const [location, setLocation] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [upvotedIds, setUpvotedIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleRecommend = (id: string) => {
    if (upvotedIds.includes(id)) {
      setUpvotedIds(upvotedIds.filter((item) => item !== id));
    } else {
      setUpvotedIds([...upvotedIds, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !authorName.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newComment: CommentItem = {
        id: `c-user-${Date.now()}`,
        author: authorName.trim(),
        location: location.trim() || 'Cupertino, CA',
        timeAgo: 'Just now',
        content: newCommentText.trim(),
        upvotes: 1,
        isEditorPick: false,
      };

      onAddComment(newComment);
      setNewCommentText('');
      setIsSubmitting(false);
      setTab('all');
    }, 400);
  };

  const displayedComments =
    tab === 'picks'
      ? article.comments.filter((c) => c.isEditorPick)
      : article.comments;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-md">
      <div className="bg-white/95 backdrop-blur-2xl w-full max-w-md h-full shadow-2xl flex flex-col font-nyt-sans border-l border-black/10">
        {/* Apple Style Header */}
        <div className="p-5 border-b border-black/[0.06] flex items-center justify-between">
          <div>
            <h3 className="font-apple-display font-extrabold text-xl text-neutral-900 tracking-tight">
              Discussion
            </h3>
            <p className="text-xs text-neutral-400 truncate max-w-xs">{article.title}</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/[0.05] hover:bg-black/[0.09] flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Apple Segmented Pills for Tabs */}
        <div className="p-4 border-b border-black/[0.04] bg-[#f5f5f7]/60">
          <div className="flex bg-black/[0.05] p-0.5 rounded-full text-xs">
            <button
              onClick={() => setTab('picks')}
              className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                tab === 'picks'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              Curated Picks ({article.comments.filter((c) => c.isEditorPick).length})
            </button>
            <button
              onClick={() => setTab('all')}
              className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                tab === 'all'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              All Comments ({article.comments.length})
            </button>
          </div>
        </div>

        {/* Comment List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {displayedComments.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 text-xs">
              No comments in this section yet. Share your thoughts below.
            </div>
          ) : (
            displayedComments.map((comment) => {
              const isUpvoted = upvotedIds.includes(comment.id);
              return (
                <div
                  key={comment.id}
                  className="p-4 rounded-2xl bg-[#f5f5f7]/80 border border-black/[0.03] space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-neutral-900">{comment.author}</span>
                      <span className="text-neutral-400 ml-1.5">{comment.location}</span>
                    </div>
                    <span className="text-[11px] text-neutral-400">{comment.timeAgo}</span>
                  </div>

                  {comment.isEditorPick && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-[#0071e3] uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3]" />
                      <span>Curated by Editors</span>
                    </div>
                  )}

                  <p className="text-xs leading-relaxed text-neutral-800 font-nyt-sans">
                    {comment.content}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] text-xs text-neutral-500">
                    <button
                      onClick={() => handleRecommend(comment.id)}
                      className={`flex items-center gap-1 text-[11px] hover:text-black transition-colors ${
                        isUpvoted ? 'font-bold text-[#0071e3]' : ''
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-current text-[#0071e3]' : ''}`} />
                      <span>Recommend ({comment.upvotes + (isUpvoted ? 1 : 0)})</span>
                    </button>
                    <button className="hover:underline text-[11px] text-neutral-400">Reply</button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Add comment form */}
        <div className="p-4 border-t border-black/[0.06] bg-[#f5f5f7]">
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-800 mb-2">
            Add Your Voice
          </h4>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Your Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
                className="text-xs p-2.5 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/40"
              />
              <input
                type="text"
                placeholder="City, State"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-xs p-2.5 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/40"
              />
            </div>
            <textarea
              rows={2}
              placeholder="What are your thoughts on this story?"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              required
              className="w-full text-xs p-2.5 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/40 resize-none"
            />
            <button
              type="submit"
              disabled={isSubmitting || !newCommentText.trim() || !authorName.trim()}
              className="w-full py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold text-xs rounded-full uppercase tracking-wider transition-all disabled:opacity-40 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Comment</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
