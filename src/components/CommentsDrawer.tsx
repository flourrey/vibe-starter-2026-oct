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
        location: location.trim() || 'New York, NY',
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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col font-nyt-sans">
        {/* Header */}
        <div className="p-4 border-b border-nyt flex items-center justify-between bg-[#fbf9f5]">
          <div>
            <h3 className="font-serif font-black text-xl text-neutral-900">Comments</h3>
            <p className="text-xs text-neutral-500 truncate max-w-xs">{article.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-500 hover:text-black rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs: Editor's Picks vs All */}
        <div className="flex border-b border-nyt text-xs font-bold bg-neutral-50 px-4 pt-2">
          <button
            onClick={() => setTab('picks')}
            className={`pb-2 px-3 border-b-2 transition-colors ${
              tab === 'picks'
                ? 'border-black text-black'
                : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            NYT Picks ({article.comments.filter((c) => c.isEditorPick).length})
          </button>
          <button
            onClick={() => setTab('all')}
            className={`pb-2 px-3 border-b-2 transition-colors ${
              tab === 'all'
                ? 'border-black text-black'
                : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            All Comments ({article.comments.length})
          </button>
        </div>

        {/* Comment List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-neutral-100">
          {displayedComments.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 text-xs">
              No comments in this section yet. Be the first to share your perspective.
            </div>
          ) : (
            displayedComments.map((comment) => {
              const isUpvoted = upvotedIds.includes(comment.id);
              return (
                <div key={comment.id} className="pt-4 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-neutral-900">{comment.author}</span>
                      <span className="text-neutral-400 ml-1.5">{comment.location}</span>
                    </div>
                    <span className="text-[11px] text-neutral-400">{comment.timeAgo}</span>
                  </div>

                  {comment.isEditorPick && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>NYT Pick</span>
                    </div>
                  )}

                  <p className="font-serif text-sm text-neutral-800 leading-relaxed">
                    {comment.content}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-xs text-neutral-500">
                    <button
                      onClick={() => handleRecommend(comment.id)}
                      className={`flex items-center gap-1 text-[11px] hover:text-black transition-colors ${
                        isUpvoted ? 'font-bold text-black' : ''
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-current text-black' : ''}`} />
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
        <div className="p-4 border-t border-nyt bg-[#fbf9f5]">
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-800 mb-2">
            Share Your Thoughts
          </h4>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Your Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
                className="text-xs p-2 border border-neutral-300 rounded bg-white focus:outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="City, State"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-xs p-2 border border-neutral-300 rounded bg-white focus:outline-none focus:border-black"
              />
            </div>
            <textarea
              rows={2}
              placeholder="What are your thoughts on this story?"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              required
              className="w-full text-xs p-2 border border-neutral-300 rounded bg-white focus:outline-none focus:border-black resize-none"
            />
            <button
              type="submit"
              disabled={isSubmitting || !newCommentText.trim() || !authorName.trim()}
              className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded uppercase tracking-wider transition-colors disabled:opacity-40 flex items-center justify-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Comment</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
