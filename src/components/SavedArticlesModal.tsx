import React from 'react';
import { Bookmark, Trash2 } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-sans select-none">
      <div className="win95-raised max-w-lg w-full shadow-2xl p-1 flex flex-col max-h-[85vh]">
        {/* Windows 95 Title Bar */}
        <div className="win95-titlebar mb-1">
          <div className="flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-yellow-300" />
            <span>Netscape Navigator - [Bookmarks / Hotlist Manager]</span>
          </div>
          <button
            onClick={onClose}
            className="win95-btn w-4 h-4 flex items-center justify-center font-mono text-[9px] font-bold p-0 leading-none text-black"
          >
            ✕
          </button>
        </div>

        {/* Directory Path Ribbon */}
        <div className="p-2 bg-[#c0c0c0] border-b border-[#808080] text-xs font-typewriter">
          <span>Folder: C:\NETSCAPE\BOOKMARK.HTM ({savedArticles.length} entries)</span>
        </div>

        {/* Bookmarks List */}
        <div className="p-3 bg-white flex-1 overflow-y-auto space-y-2 font-serif">
          {savedArticles.length === 0 ? (
            <div className="text-center py-8 text-gray-500 font-typewriter text-xs">
              [EMPTY HOTLIST] No articles bookmarked. Use "Add to Hotlist" on any story.
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="p-2 border border-gray-300 bg-gray-50 flex items-start justify-between gap-2 hover:bg-yellow-50"
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                >
                  <span className="font-typewriter text-[10px] text-red-800 font-bold block">
                    [{article.section.toUpperCase()}]
                  </span>
                  <h4 className="retro-link text-sm font-bold font-headline leading-tight mt-0.5">
                    {article.title}
                  </h4>
                  <div className="text-[10px] font-typewriter text-gray-500 mt-1">
                    {article.readTime} · By {article.byline}
                  </div>
                </div>

                <button
                  onClick={() => onRemoveSave(article.id)}
                  title="Remove bookmark"
                  className="win95-btn px-1.5 py-0.5 text-[10px] text-red-700 font-bold shrink-0"
                >
                  [Delete]
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2 bg-[#c0c0c0] border-t border-[#808080] flex justify-end gap-2 text-xs">
          <button
            onClick={onClose}
            className="win95-btn px-4 py-1 font-bold text-black"
          >
            [Close Manager]
          </button>
        </div>
      </div>
    </div>
  );
};
