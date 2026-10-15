import React, { useState, useMemo } from 'react';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 pt-16">
      <div className="bg-white max-w-2xl w-full rounded-md shadow-2xl border border-neutral-300 overflow-hidden flex flex-col max-h-[80vh] font-nyt-sans">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-nyt flex items-center gap-3 bg-[#fbf9f5]">
          <Search className="w-5 h-5 text-neutral-500 shrink-0" />
          <input
            type="text"
            placeholder="Search all stories, opinion, topics, and authors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-base font-serif bg-transparent border-none focus:outline-none placeholder:font-nyt-sans placeholder:text-neutral-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-black"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-neutral-500 hover:text-black rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Filters */}
        <div className="px-4 py-2 border-b border-nyt flex items-center gap-2 overflow-x-auto text-xs bg-neutral-50">
          {['All', 'U.S.', 'World', 'Business', 'Opinion', 'Lifestyle'].map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-2.5 py-1 rounded-full font-semibold transition-colors shrink-0 ${
                selectedSection === sec
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:border-black'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Results / Trending */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {!query && (
            <div className="mb-4">
              <span className="text-xs uppercase font-extrabold tracking-wider text-neutral-400 block mb-2">
                Trending Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setQuery(topic)}
                    className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-3 py-1.5 rounded-full font-medium transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            {filteredArticles.length} Result{filteredArticles.length === 1 ? '' : 's'}
          </div>

          <div className="space-y-4 divide-y divide-neutral-100">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="pt-3 first:pt-0 cursor-pointer group"
              >
                <div className="flex items-center gap-2 text-[11px] text-neutral-500 mb-1">
                  <span className="font-bold uppercase tracking-wider text-red-800">
                    {article.kicker || article.section}
                  </span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h4 className="font-headline text-lg font-bold group-hover:underline text-neutral-900 leading-snug">
                  {article.title}
                </h4>
                <p className="font-body-serif text-xs text-neutral-600 line-clamp-2 mt-1">
                  {article.summary}
                </p>
                <div className="text-[11px] text-neutral-400 mt-1 flex items-center justify-between">
                  <span>By {article.byline}</span>
                  <span className="flex items-center gap-1 group-hover:text-black">
                    Read Story <ArrowRight className="w-3 h-3" />
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
