import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { Article } from '../types/news';

interface SavedArticlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticleIds: string[];
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveSave: (articleId: string) => void;
}

export const SavedArticlesModal: React.FC<SavedArticlesModalProps> = ({
  isOpen,
  onClose,
  savedArticleIds,
  articles,
  onSelectArticle,
  onRemoveSave,
}) => {
  if (!isOpen) return null;

  const savedArticles = articles.filter((a) => savedArticleIds.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div className="bg-white/95 backdrop-blur-2xl max-w-lg w-full rounded-3xl shadow-2xl border border-black/10 overflow-hidden flex flex-col max-h-[85vh] font-nyt-sans">
        {/* Apple Style Header */}
        <div className="p-5 border-b border-black/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-apple-display font-bold text-lg text-neutral-900">
                Reading List
              </h3>
              <p className="text-[11px] text-neutral-400">
                {savedArticles.length} offline {savedArticles.length === 1 ? 'story' : 'stories'} saved
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/[0.05] hover:bg-black/[0.09] flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-2.5">
          {savedArticles.length === 0 ? (
            <div className="text-center py-12 text-neutral-400">
              <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">Your Reading List is empty</p>
              <p className="text-xs text-neutral-400 mt-1">
                Save stories to read anytime, even while disconnected.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="p-4 rounded-2xl bg-[#f5f5f7]/80 hover:bg-white hover:shadow-xs border border-black/[0.04] transition-all flex items-start justify-between gap-3 group"
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                >
                  <span className="text-[10px] uppercase font-bold text-[#0071e3] tracking-wider">
                    {article.section}
                  </span>
                  <h4 className="font-apple-display font-bold text-base leading-snug text-neutral-900 group-hover:text-[#0071e3] transition-colors mt-0.5">
                    {article.title}
                  </h4>
                  <p className="text-xs text-neutral-500 line-clamp-1 mt-1">
                    {article.summary}
                  </p>
                  <div className="text-[11px] text-neutral-400 mt-2">
                    {article.readTime} · By {article.byline}
                  </div>
                </div>

                <button
                  onClick={() => onRemoveSave(article.id)}
                  title="Remove from reading list"
                  className="p-1.5 rounded-full text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
