import React from 'react';
import { Search, Bookmark, ChevronDown, User } from 'lucide-react';
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
    <header className="max-w-[1340px] mx-auto px-4 pt-2.5" data-purpose="global-header">
      {/* Top Utility & Navigation Row */}
      <div className="flex items-center justify-between pb-2 text-[11px] font-nyt-sans font-medium text-[#333] border-b border-nyt">
        {/* Left: Navigation Drawer & Edition Switcher */}
        <div className="flex items-center space-x-4">
          {/* Search icon & button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className="p-1 hover:text-black flex items-center gap-1.5 focus:outline-none cursor-pointer"
          >
            <Search className="w-4 h-4 text-black stroke-[2.2]" />
            <span className="hidden md:inline uppercase text-[10px] tracking-widest font-semibold">
              Search
            </span>
          </button>

          <div className="h-3 w-px bg-gray-300 hidden sm:block"></div>

          {/* Edition Selector Links */}
          <nav aria-label="Editions" className="hidden sm:flex items-center space-x-3 text-[11px] text-[#555]">
            {[
              { id: 'US', label: 'U.S.' },
              { id: 'International', label: 'International' },
              { id: 'Canada', label: 'Canada' },
              { id: 'Espanol', label: 'Español' },
              { id: 'Chinese', label: '中文' },
            ].map((ed) => (
              <button
                key={ed.id}
                onClick={() => onSelectEdition(ed.id)}
                className={`hover:text-black transition-colors ${
                  currentEdition === ed.id
                    ? 'font-bold text-black border-b border-black pb-0.5'
                    : ''
                }`}
              >
                {ed.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: Subscriptions, Saved & Log In CTA */}
        <div className="flex items-center space-x-2.5">
          {/* Saved Articles Shortcut */}
          <button
            onClick={onOpenSaved}
            className="flex items-center gap-1 text-[11px] font-bold text-neutral-700 hover:text-black px-2 py-1 transition-colors"
            title="View Saved Stories"
          >
            <Bookmark className={`w-3.5 h-3.5 ${savedCount > 0 ? 'fill-current text-black' : ''}`} />
            <span className="hidden sm:inline">Saved</span>
            {savedCount > 0 && (
              <span className="text-[10px] bg-neutral-900 text-white rounded-full px-1.5 py-0.2">
                {savedCount}
              </span>
            )}
          </button>

          {/* Subscribe CTA */}
          <button
            onClick={onOpenSubscribe}
            className="bg-[#567b95] hover:bg-[#326891] text-white px-3 py-1.5 rounded-sm uppercase tracking-wider text-[10px] font-bold transition-colors cursor-pointer"
          >
            {currentUser?.isSubscribed ? 'Subscribed' : 'Subscribe for $1/week'}
          </button>

          {/* Log In / User Account */}
          <button
            onClick={onOpenAccount}
            className="border border-[#121212] hover:bg-neutral-100 text-black px-3 py-1.5 rounded-sm uppercase tracking-wider text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
          >
            <User className="w-3 h-3" />
            <span>{currentUser ? currentUser.email.split('@')[0] : 'Log In'}</span>
          </button>
        </div>
      </div>

      {/* Date, Weather and Today's Paper Banner */}
      <div className="flex items-center justify-between py-2 text-[11px] font-nyt-sans text-[#555] border-b border-nyt">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-[#121212]">Wednesday, October 14, 2026</span>
          <button
            onClick={onGoHome}
            className="hover:text-black hover:underline cursor-pointer"
          >
            Today’s Paper
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-[11px]">
          <button
            onClick={onToggleTempUnit}
            title="Click to toggle Celsius / Fahrenheit"
            className="flex items-center gap-1.5 hover:text-black cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 20 20">
              <circle cx="10" cy="10" fill="#f59e0b" r="5" />
            </svg>
            <strong>{tempDisplay}</strong> New York
          </button>
          <span className="text-neutral-400">|</span>
          <span className="font-medium text-black">
            Markets: S&P 500 <span className="text-emerald-700 font-semibold">+0.42%</span>
          </span>
        </div>
      </div>

      {/* Primary Iconic Newspaper Brand Masthead */}
      <div className="text-center py-4 md:py-6">
        <button
          onClick={onGoHome}
          title="The New York Times"
          className="inline-block cursor-pointer focus:outline-none"
        >
          <h1 className="font-masthead text-5xl sm:text-6xl md:text-7xl lg:text-[80px] tracking-tight leading-none text-black select-none">
            The New York Times
          </h1>
        </button>
      </div>

      {/* Horizontal Category Sub-navigation Menu */}
      <nav aria-label="Main Sections" className="border-t border-b border-nyt py-2 px-1 overflow-x-auto">
        <ul className="flex items-center justify-between min-w-[780px] text-[12px] font-nyt-sans tracking-tight text-[#121212] font-semibold">
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
                className={`flex items-center gap-0.5 hover:text-[#567b95] transition-colors pb-0.5 cursor-pointer ${
                  activeSection === section ? 'text-[#326891] border-b-2 border-[#326891]' : ''
                }`}
              >
                <span>{section}</span>
                <span className="text-[9px] text-neutral-400">▾</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Urgent / Free to Read Alert Ribbon */}
      <div className="py-2 border-b border-black text-center text-xs font-nyt-sans bg-stone-50 font-medium">
        <span className="uppercase tracking-widest text-[10px] text-red-700 font-bold mr-2">
          Top Stories
        </span>
        <span>
          These major breaking developments are{' '}
          <strong
            onClick={onOpenSubscribe}
            className="underline decoration-1 cursor-pointer hover:text-red-700"
          >
            free to read
          </strong>{' '}
          with an account.
        </span>
      </div>
    </header>
  );
};
