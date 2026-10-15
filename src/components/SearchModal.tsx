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

  const trendingTopics = [
    'Ukraine War',
    'Trump Administration',
    'Artificial Intelligence',
    'Texas Senate',
    'Pope Leo',
    'Cornell',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-md p-4 pt-16">
      <div className="bg-white/95 backdrop-blur-2xl max-w-2xl w-full rounded-3xl shadow-2xl border border-black/10 overflow-hidden flex flex-col max-h-[80vh] font-nyt-sans">
        {/* Apple Spotlight Style Search Input */}
        <div className="p-4 px-5 border-b border-black/[0.06] flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            placeholder="Search stories, dispatches, topics, authors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-base font-medium font-apple-display bg-transparent border-none focus:outline-none placeholder:text-neutral-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-black font-semibold"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/[0.05] hover:bg-black/[0.09] flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section Filters */}
        <div className="px-5 py-2.5 border-b border-black/[0.04] flex items-center gap-2 overflow-x-auto text-xs bg-[#f5f5f7]/60">
          {['All', 'U.S.', 'World', 'Business', 'Opinion', 'Lifestyle'].map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-3 py-1 rounded-full font-medium transition-all shrink-0 ${
                selectedSection === sec
                  ? 'bg-neutral-900 text-white shadow-xs font-semibold'
                  : 'bg-white/80 border border-black/[0.06] text-neutral-600 hover:text-black'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Results / Trending */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {!query && (
            <div className="mb-4">
              <span className="text-[11px] uppercase font-bold tracking-wider text-neutral-400 block mb-2">
                Trending In Spotlight
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setQuery(topic)}
                    className="text-xs bg-[#f5f5f7] hover:bg-black/[0.06] text-neutral-800 px-3.5 py-1.5 rounded-full font-medium transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            {filteredArticles.length} Result{filteredArticles.length === 1 ? '' : 's'}
          </div>

          <div className="space-y-2">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="p-3.5 rounded-2xl hover:bg-black/[0.04] cursor-pointer group transition-colors border border-transparent hover:border-black/[0.04]"
              >
                <div className="flex items-center gap-2 text-[11px] text-neutral-500 mb-1">
                  <span className="font-bold uppercase tracking-wider text-[#0071e3]">
                    {article.kicker || article.section}
                  </span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
                <h4 className="font-apple-display text-base font-bold text-neutral-900 group-hover:text-[#0071e3] transition-colors leading-snug">
                  {article.title}
                </h4>
                <p className="text-xs text-neutral-500 line-clamp-2 mt-1 font-nyt-sans">
                  {article.summary}
                </p>
                <div className="text-[11px] text-neutral-400 mt-2 flex items-center justify-between">
                  <span>By {article.byline}</span>
                  <span className="flex items-center gap-1 font-semibold text-[#0071e3]">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
