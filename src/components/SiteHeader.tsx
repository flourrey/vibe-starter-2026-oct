import React from 'react';
import { Search, Bookmark, User, Compass, Newspaper } from 'lucide-react';
import { NewsSection } from '../types/news';

interface SiteHeaderProps {
  currentEdition: string;
  onSelectEdition: (edition: string) => void;
  activeSection: string;
  onSelectSection: (section: string) => void;
  onOpenSearch: () => void;
  onOpenSubscribe: () => void;
  onOpenAccount: () => void;
  onOpenSaved: () => void;
  savedCount: number;
  currentUser: { email: string; isSubscribed: boolean } | null;
  temperatureUnit: 'F' | 'C';
  onToggleTempUnit: () => void;
  onGoHome: () => void;
  onOpenGames: (gameKey?: string) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  currentEdition,
  onSelectEdition,
  activeSection,
  onSelectSection,
  onOpenSearch,
  onOpenSubscribe,
  onOpenAccount,
  onOpenSaved,
  savedCount,
  currentUser,
  temperatureUnit,
  onToggleTempUnit,
  onGoHome,
  onOpenGames,
}) => {
  const sections: NewsSection[] = [
    'U.S.',
    'World',
    'Business',
    'Arts',
    'Lifestyle',
    'Opinion',
    'Audio',
    'Games',
    'Cooking',
    'Wirecutter',
    'The Athletic',
  ];

  const tempDisplay = temperatureUnit === 'F' ? '68°F' : '20°C';

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-black/[0.06] transition-all">
      {/* Top Utility & Control Row */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 text-[13px] font-nyt-sans">
        {/* Left: Search & Segmented Edition Control */}
        <div className="flex items-center gap-3">
          {/* Apple-style search pill */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 bg-black/[0.04] hover:bg-black/[0.07] text-[#1d1d1f] px-3.5 py-1.5 rounded-full transition-all text-xs font-medium cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-neutral-500" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline text-[10px] bg-white/80 border border-black/10 px-1.5 py-0.2 rounded text-neutral-400 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Apple segmented edition pill */}
          <div className="hidden lg:flex items-center bg-black/[0.04] p-0.5 rounded-full text-xs">
            {[
              { id: 'US', label: 'U.S.' },
              { id: 'International', label: 'World' },
              { id: 'Canada', label: 'Canada' },
              { id: 'Espanol', label: 'Español' },
              { id: 'Chinese', label: '中文' },
            ].map((ed) => (
              <button
                key={ed.id}
                onClick={() => onSelectEdition(ed.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                  currentEdition === ed.id
                    ? 'bg-white text-black shadow-xs font-semibold'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                {ed.label}
              </button>
            ))}
          </div>
        </div>

        {/* Center: Live Date & Weather Pills (Apple subtle capsule style) */}
        <div className="hidden md:flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 bg-black/[0.03] px-3 py-1 rounded-full text-neutral-600">
            <span className="font-semibold text-neutral-800">Wednesday, Oct 14</span>
            <span className="text-neutral-400">·</span>
            <button
              onClick={onGoHome}
              className="hover:text-black hover:underline cursor-pointer"
            >
              Today’s Edition
            </button>
          </div>

          <button
            onClick={onToggleTempUnit}
            title="Click to toggle temperature scale"
            className="flex items-center gap-1 bg-black/[0.03] hover:bg-black/[0.06] px-2.5 py-1 rounded-full text-neutral-700 transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
            <span className="font-semibold">{tempDisplay}</span>
            <span className="text-neutral-500">NYC</span>
          </button>

          <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-1 rounded-full text-[11px] font-medium">
            <span>S&P 500</span>
            <span className="font-bold">+0.42%</span>
          </div>
        </div>

        {/* Right: Apple Actions (Saved, Subscribe, Account) */}
        <div className="flex items-center gap-2">
          {/* Saved Articles */}
          <button
            onClick={onOpenSaved}
            className="flex items-center gap-1.5 bg-black/[0.04] hover:bg-black/[0.07] px-3 py-1.5 rounded-full text-xs font-medium text-neutral-800 transition-all cursor-pointer"
            title="Your Reading List"
          >
            <Bookmark className={`w-3.5 h-3.5 ${savedCount > 0 ? 'fill-current text-black' : ''}`} />
            <span className="hidden sm:inline">Saved</span>
            {savedCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* Apple Blue Pill CTA */}
          <button
            onClick={onOpenSubscribe}
            className="bg-[#0071e3] hover:bg-[#0077ed] text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap"
          >
            {currentUser?.isSubscribed ? 'Subscribed' : 'Subscribe $1/wk'}
          </button>

          {/* Account */}
          <button
            onClick={onOpenAccount}
            className="w-8 h-8 rounded-full bg-black/[0.05] hover:bg-black/[0.08] flex items-center justify-center text-neutral-700 transition-all cursor-pointer shrink-0"
            title="Account Profile"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Brand Masthead Hero Row */}
      <div className="border-t border-black/[0.04] bg-white/60">
        <div className="max-w-[1360px] mx-auto px-4 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={onGoHome}
              className="text-left focus:outline-none cursor-pointer group"
            >
              <h1 className="font-masthead text-3xl sm:text-4xl md:text-5xl text-[#1d1d1f] tracking-tight leading-none group-hover:opacity-85 transition-opacity">
                The New York Times
              </h1>
            </button>
            <span className="hidden lg:inline text-[10px] font-bold uppercase tracking-widest text-neutral-400 border border-black/[0.08] px-2 py-0.5 rounded-full">
              Apple News+
            </span>
          </div>

          {/* Category Bar embedded right beside or below */}
          <nav className="w-full md:w-auto overflow-x-auto py-1">
            <ul className="flex items-center gap-1 text-[13px] font-nyt-sans font-medium">
              {sections.map((section) => (
                <li key={section}>
                  <button
                    onClick={() => {
                      if (section === 'Games') {
                        onOpenGames();
                      } else {
                        onSelectSection(section);
                      }
                    }}
                    className={`px-3 py-1 rounded-full transition-all whitespace-nowrap cursor-pointer text-xs ${
                      activeSection === section
                        ? 'bg-neutral-900 text-white font-semibold'
                        : 'text-neutral-600 hover:text-black hover:bg-black/[0.04]'
                    }`}
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Apple News Breaking Pill Notification */}
      <div className="bg-[#f0f0f2]/90 border-t border-b border-black/[0.04] py-1.5 px-4 text-center text-xs font-nyt-sans text-neutral-700">
        <span className="inline-flex items-center gap-1.5">
          <span className="bg-[#ff3b30] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.2 rounded-full">
            Top Story
          </span>
          <span className="text-neutral-600">Major breaking developments are curated for you ·</span>
          <button
            onClick={onOpenSubscribe}
            className="text-[#0071e3] font-semibold hover:underline cursor-pointer"
          >
            Explore All Features
          </button>
        </span>
      </div>
    </header>
  );
};
