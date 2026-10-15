import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Article } from '../types/news';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('All');

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSection =
        selectedSection === 'All' || article.section.toLowerCase() === selectedSection.toLowerCase();
      const q = query.toLowerCase().trim();
      if (!q) return matchesSection;

      const inTitle = article.title.toLowerCase().includes(q);
      const inSummary = article.summary.toLowerCase().includes(q);
      const inByline = article.byline.toLowerCase().includes(q);
      const inContent = article.content.some((p) => p.toLowerCase().includes(q));

      return matchesSection && (inTitle || inSummary || inByline || inContent);
    });
  }, [articles, query, selectedSection]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-16 font-sans select-none">
      <div className="win95-raised max-w-xl w-full shadow-2xl p-1 flex flex-col max-h-[85vh]">
        {/* Windows 95 Title Bar */}
        <div className="win95-titlebar mb-1">
          <div className="flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-yellow-300" />
            <span>Search Text Archives - [NYTimes Find Utility v1.2]</span>
          </div>
          <button
            onClick={onClose}
            className="win95-btn w-4 h-4 flex items-center justify-center font-mono text-[9px] font-bold p-0 leading-none text-black"
          >
            ✕
          </button>
        </div>

        {/* Search Query Input */}
        <div className="p-3 bg-[#c0c0c0] border-b border-[#808080] space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold">Find What:</span>
            <input
              type="text"
              placeholder="e.g. Ukraine, Trump, AI, Texas..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="win95-sunken flex-1 px-2 py-1 font-typewriter text-xs text-black bg-white focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="win95-btn px-2 py-1 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Section Filter Buttons */}
          <div className="flex items-center gap-1 pt-1 overflow-x-auto text-[11px]">
            <span className="font-bold">In Section:</span>
            {['All', 'U.S.', 'World', 'Business', 'Opinion', 'Lifestyle'].map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSection(sec)}
                className={`win95-btn px-2 py-0.5 text-[10px] font-bold ${
                  selectedSection === sec ? 'win95-sunken bg-white text-[#000080]' : ''
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="p-3 bg-white flex-1 overflow-y-auto space-y-3 font-serif">
          <div className="font-typewriter text-[11px] text-gray-600 border-b border-gray-300 pb-1 flex justify-between">
            <span>Query Results: {filteredArticles.length} Document(s) Found</span>
            <span>Sort: Relevance</span>
          </div>

          <div className="space-y-3">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="border-b border-gray-200 pb-2 cursor-pointer hover:bg-yellow-50 p-1"
              >
                <div className="text-[10px] font-typewriter text-red-800 font-bold uppercase">
                  [{article.kicker || article.section}] · {article.readTime}
                </div>
                <h4 className="retro-link text-sm font-bold font-headline leading-tight mt-0.5">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-700 line-clamp-2 mt-1">
                  {article.summary}
                </p>
                <div className="text-[10px] font-typewriter text-gray-500 mt-1 flex justify-between">
                  <span>Author: {article.byline}</span>
                  <span className="retro-link font-bold">[Load Document →]</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dialogue Box Action Footer */}
        <div className="p-2 bg-[#c0c0c0] border-t border-[#808080] flex justify-end gap-2 text-xs">
          <button
            onClick={onClose}
            className="win95-btn px-4 py-1 font-bold text-black"
          >
            [Close Utility]
          </button>
        </div>
      </div>
    </div>
  );
};
