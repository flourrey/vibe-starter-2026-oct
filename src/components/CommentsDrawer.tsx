import React, { useState } from 'react';
import { ThumbsUp, Send } from 'lucide-react';
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
        location: location.trim() || 'Internet Node',
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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 select-none font-sans">
      <div className="win95-raised w-full max-w-md h-full shadow-2xl p-1 flex flex-col">
        {/* Title Bar */}
        <div className="win95-titlebar mb-1">
          <span>Usenet Reader - [alt.journalism.nytimes.forum]</span>
          <button
            onClick={onClose}
            className="win95-btn w-4 h-4 flex items-center justify-center font-mono text-[9px] font-bold p-0 leading-none text-black"
          >
            ✕
          </button>
        </div>

        {/* Newsgroup Header */}
        <div className="p-2 bg-[#c0c0c0] border-b border-[#808080] text-xs font-typewriter space-y-1">
          <div><b>Thread:</b> RE: {article.title}</div>
          <div className="flex gap-2">
            <button
              onClick={() => setTab('picks')}
              className={`win95-btn px-2 py-0.5 text-[11px] font-bold ${
                tab === 'picks' ? 'win95-sunken bg-white text-[#000080]' : ''
              }`}
            >
              [Editor's Selected Postings]
            </button>
            <button
              onClick={() => setTab('all')}
              className={`win95-btn px-2 py-0.5 text-[11px] font-bold ${
                tab === 'all' ? 'win95-sunken bg-white text-[#000080]' : ''
              }`}
            >
              [All Postings ({article.comments.length})]
            </button>
          </div>
        </div>

        {/* Message Thread List */}
        <div className="flex-1 overflow-y-auto p-3 bg-white space-y-3 font-typewriter text-xs">
          {displayedComments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              [NO POSTINGS YET IN THIS NEWSGROUP THREAD]
            </div>
          ) : (
            displayedComments.map((comment) => {
              const isUpvoted = upvotedIds.includes(comment.id);
              return (
                <div
                  key={comment.id}
                  className="p-2.5 bg-gray-50 border border-gray-400 space-y-1.5"
                >
                  <div className="flex items-center justify-between border-b border-gray-300 pb-1 text-[11px]">
                    <div>
                      <b>From:</b> <span className="text-[#000080]">{comment.author}</span> ({comment.location})
                    </div>
                    <span className="text-gray-500">{comment.timeAgo}</span>
                  </div>

                  {comment.isEditorPick && (
                    <div className="text-[10px] text-red-700 font-bold">
                      *** MODERATOR'S SPECIAL RECOGNITION ***
                    </div>
                  )}

                  <p className="text-black font-serif text-xs leading-relaxed pt-1">
                    {comment.content}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-dashed border-gray-300 text-[10px]">
                    <button
                      onClick={() => handleRecommend(comment.id)}
                      className={`win95-btn px-1.5 py-0.2 ${isUpvoted ? 'font-bold text-[#000080]' : ''}`}
                    >
                      [+1 Endorse: {comment.upvotes + (isUpvoted ? 1 : 0)}]
                    </button>
                    <span className="text-gray-400">Message-ID: &lt;{comment.id}@nyt.net&gt;</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Post Message Box */}
        <div className="p-3 bg-[#c0c0c0] border-t border-[#808080] font-sans text-xs">
          <b className="block mb-1.5">Post Reply to Usenet Board:</b>
          <form onSubmit={handleSubmit} className="space-y-1.5">
            <div className="grid grid-cols-2 gap-1.5">
              <input
                type="text"
                placeholder="Name / Handle"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
                className="win95-sunken p-1 font-typewriter text-xs bg-white text-black"
              />
              <input
                type="text"
                placeholder="City, State"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="win95-sunken p-1 font-typewriter text-xs bg-white text-black"
              />
            </div>
            <textarea
              rows={2}
              placeholder="Type your public dispatch..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              required
              className="win95-sunken w-full p-1 font-typewriter text-xs bg-white text-black resize-none"
            />
            <div className="flex justify-end gap-1.5">
              <button
                type="button"
                onClick={onClose}
                className="win95-btn px-3 py-1 font-bold"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !newCommentText.trim() || !authorName.trim()}
                className="win95-btn px-3 py-1 font-bold text-[#000080] disabled:opacity-50"
              >
                [Post Reply]
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
