import React, { useState } from 'react';
import { Search, Bookmark, User, Compass, RotateCcw, ArrowLeft, ArrowRight, Printer, StopCircle, Globe, Home } from 'lucide-react';
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
  const [cometActive, setCometActive] = useState(false);

  const sections: { id: string; label: string }[] = [
    { id: 'All', label: 'Front Page' },
    { id: 'U.S.', label: 'National' },
    { id: 'World', label: 'World News' },
    { id: 'Business', label: 'Business' },
    { id: 'Opinion', label: 'Editorial/Op-Ed' },
    { id: 'Lifestyle', label: 'CyberTimes' },
    { id: 'Games', label: 'Puzzles & Games' },
    { id: 'Arts', label: 'Arts & Leisure' },
  ];

  const tempDisplay = temperatureUnit === 'F' ? '68°F' : '20°C';

  const triggerReload = () => {
    setCometActive(true);
    setTimeout(() => setCometActive(false), 800);
  };

  return (
    <header className="w-full win95-raised mb-4 select-none font-sans" data-purpose="retro-browser-header">
      {/* Windows 95 Window Title Bar */}
      <div className="win95-titlebar">
        <div className="flex items-center gap-1.5 truncate">
          <Globe className="w-3.5 h-3.5 text-yellow-300" />
          <span className="truncate">
            Netscape Navigator - [The New York Times on the Web - Official Edition 1.0]
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button className="win95-btn w-4 h-4 flex items-center justify-center font-mono text-[9px] font-bold p-0 leading-none">
            _
          </button>
          <button className="win95-btn w-4 h-4 flex items-center justify-center font-mono text-[9px] font-bold p-0 leading-none">
            □
          </button>
          <button
            onClick={() => alert('Windows 95: Cannot close primary shell.')}
            className="win95-btn w-4 h-4 flex items-center justify-center font-mono text-[9px] font-bold p-0 leading-none text-red-900"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Netscape 3.0 Menu Bar */}
      <div className="bg-[#c0c0c0] px-2 py-0.5 border-b border-[#808080] flex items-center gap-3 text-xs text-black">
        {['File', 'Edit', 'View', 'Go', 'Bookmarks', 'Options', 'Directory', 'Window', 'Help'].map((item) => (
          <span
            key={item}
            onClick={() => alert(`Netscape Navigator 3.0: ${item} menu`)}
            className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer"
          >
            <u>{item[0]}</u>{item.slice(1)}
          </span>
        ))}
      </div>

      {/* Netscape Navigation Toolbar Buttons */}
      <div className="bg-[#c0c0c0] p-1.5 border-b border-[#808080] flex items-center justify-between gap-1 overflow-x-auto text-[11px]">
        <div className="flex items-center gap-1">
          <button onClick={onGoHome} className="win95-btn px-2 py-1 flex flex-col items-center min-w-[48px]">
            <ArrowLeft className="w-3.5 h-3.5 text-[#000080]" />
            <span className="text-[10px]">Back</span>
          </button>

          <button onClick={() => alert('History: End of forward stream')} className="win95-btn px-2 py-1 flex flex-col items-center min-w-[48px]">
            <ArrowRight className="w-3.5 h-3.5 text-[#808080]" />
            <span className="text-[10px]">Forward</span>
          </button>

          <button onClick={onGoHome} className="win95-btn px-2 py-1 flex flex-col items-center min-w-[48px]">
            <Home className="w-3.5 h-3.5 text-[#008000]" />
            <span className="text-[10px]">Home</span>
          </button>

          <button onClick={triggerReload} className="win95-btn px-2 py-1 flex flex-col items-center min-w-[48px]">
            <RotateCcw className="w-3.5 h-3.5 text-[#000080]" />
            <span className="text-[10px]">Reload</span>
          </button>

          <button onClick={onOpenSearch} className="win95-btn px-2 py-1 flex flex-col items-center min-w-[48px]">
            <Search className="w-3.5 h-3.5 text-[#800000]" />
            <span className="text-[10px]">Find</span>
          </button>

          <button onClick={() => window.print()} className="win95-btn px-2 py-1 flex flex-col items-center min-w-[48px]">
            <Printer className="w-3.5 h-3.5 text-[#000000]" />
            <span className="text-[10px]">Print</span>
          </button>

          <button onClick={() => alert('Dial-Up transmission interrupted!')} className="win95-btn px-2 py-1 flex flex-col items-center min-w-[48px]">
            <StopCircle className="w-3.5 h-3.5 text-[#ff0000]" />
            <span className="text-[10px]">Stop</span>
          </button>
        </div>

        {/* Iconic Netscape Pulsing Comet Logo */}
        <div
          onClick={triggerReload}
          className="win95-sunken w-10 h-10 bg-black flex flex-col items-center justify-center p-1 cursor-pointer shrink-0"
          title="Netscape Communications Corp"
        >
          <div className={`font-serif font-black text-lg leading-none ${cometActive ? 'text-amber-400 animate-pulse' : 'text-cyan-400'}`}>
            N
          </div>
          <span className="text-[7px] text-green-400 font-mono leading-none">28.8k</span>
        </div>
      </div>

      {/* Netscape Location Address Bar */}
      <div className="bg-[#c0c0c0] px-2 py-1.5 border-b border-[#808080] flex items-center gap-2 text-xs">
        <span className="font-bold text-[#404040]">Netsite:</span>
        <div className="win95-sunken flex-1 px-2 py-0.5 font-typewriter text-xs text-black bg-white flex items-center justify-between">
          <span>http://www.nytimes.com/frontpage/1996/oct14/</span>
          <span className="text-gray-400 text-[10px]">Security: None</span>
        </div>
        <button
          onClick={onOpenSubscribe}
          className="win95-btn px-2 py-0.5 text-[11px] font-bold text-[#000080]"
        >
          Dial-Up Access ($1)
        </button>
        <button
          onClick={onOpenAccount}
          className="win95-btn px-2 py-0.5 text-[11px] font-bold"
        >
          {currentUser ? 'Login [OK]' : 'Login...'}
        </button>
        <button
          onClick={onOpenSaved}
          className="win95-btn px-2 py-0.5 text-[11px] font-bold flex items-center gap-1"
        >
          <Bookmark className="w-3 h-3 text-[#800000]" />
          <span>Hotlist ({savedCount})</span>
        </button>
      </div>

      {/* Web 1.0 Retro Masthead */}
      <div className="bg-[#ffffff] text-center py-4 border-b-2 border-black">
        <div className="inline-block">
          <button onClick={onGoHome} className="focus:outline-none cursor-pointer">
            <h1 className="font-masthead text-4xl sm:text-5xl md:text-6xl text-black tracking-tight leading-none">
              The New York Times
            </h1>
            <div className="bg-[#000080] text-yellow-300 font-pixel text-xl sm:text-2xl px-3 py-0.5 mt-1 tracking-widest font-bold uppercase shadow-sm">
              *** ON THE WEB · 1990s RETRO EDITION ***
            </div>
          </button>
        </div>

        {/* Vintage Sub-Masthead Utility Line */}
        <div className="max-w-4xl mx-auto mt-2 px-4 flex flex-wrap items-center justify-between text-xs font-serif text-black border-t border-b border-black py-1">
          <div>
            <b>Wednesday, October 14, 1996/2026</b> · Late City Edition
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTempUnit}
              className="hover:underline cursor-pointer"
            >
              Weather: <b>{tempDisplay}</b>, Clear in NY
            </button>
            <span>|</span>
            <span>Dow Jones: <b>6,012.44</b> <span className="text-green-800 font-bold">+24.12</span></span>
          </div>
        </div>
      </div>

      {/* 90s Beveled Category Buttons (Authentic Web 1.0 Table Style) */}
      <div className="bg-[#c0c0c0] p-1 border-b border-black overflow-x-auto">
        <div className="flex items-center justify-center gap-1 min-w-[720px] text-xs">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                if (sec.id === 'Games') {
                  onOpenGames();
                } else {
                  onSelectSection(sec.id);
                }
              }}
              className={`win95-btn px-2.5 py-1 text-xs font-bold whitespace-nowrap ${
                activeSection === sec.id
                  ? 'win95-sunken bg-white text-[#000080]'
                  : 'text-black'
              }`}
            >
              [{sec.label}]
            </button>
          ))}
        </div>
      </div>

      {/* Authentic 90s Scrolling Marquee Ticker */}
      <div className="bg-[#000080] text-yellow-300 py-1 px-2 overflow-hidden text-xs font-typewriter border-b-2 border-black">
        <div className="animate-marquee font-bold">
          ⚡ ⚡ ⚡ LATEST CYBERTIMES BULLETIN: UKRAINE CRISIS ESCALATES · SATELLITE COMMS THROTTLED · TEXAS SENATE RACE DEADLOCKED · DOW SURGES PAST 6,000 · WORDLE & THE MINI AVAILABLE IN DAILY PUZZLES ⚡ ⚡ ⚡
        </div>
      </div>
    </header>
  );
};
