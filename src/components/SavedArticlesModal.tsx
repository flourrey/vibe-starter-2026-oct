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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white max-w-lg w-full rounded-md shadow-2xl border border-neutral-300 overflow-hidden flex flex-col max-h-[85vh] font-nyt-sans">
        {/* Header */}
        <div className="p-4 border-b border-nyt flex items-center justify-between bg-[#fbf9f5]">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-neutral-900 fill-current" />
            <h3 className="font-serif font-black text-xl text-neutral-900">Your Reading List</h3>
            <span className="text-xs bg-neutral-200 text-neutral-800 font-bold px-2 py-0.5 rounded-full">
              {savedArticles.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-500 hover:text-black rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {savedArticles.length === 0 ? (
            <div className="text-center py-12 text-neutral-400">
              <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">You haven't saved any stories yet.</p>
              <p className="text-xs text-neutral-500 mt-1">
                Click the bookmark icon on any article to save it for offline reading.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="p-3 border border-nyt rounded hover:border-black transition-colors flex items-start justify-between gap-3 group bg-white"
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                >
                  <span className="text-[10px] uppercase font-bold text-red-800 tracking-wider">
                    {article.section}
                  </span>
                  <h4 className="font-headline font-bold text-base leading-tight group-hover:underline text-neutral-900 mt-0.5">
                    {article.title}
                  </h4>
                  <p className="text-xs text-neutral-500 font-serif line-clamp-1 mt-1">
                    {article.summary}
                  </p>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    {article.readTime} • By {article.byline}
                  </div>
                </div>

                <button
                  onClick={() => onRemoveSave(article.id)}
                  title="Remove from saved"
                  className="p-1.5 text-neutral-400 hover:text-red-700 transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {savedArticles.length > 0 && (
          <div className="p-3 bg-neutral-50 border-t border-nyt text-right">
            <span className="text-xs text-neutral-500">
              Saved articles persist in your browser session.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
