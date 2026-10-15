import React from 'react';

interface SiteFooterProps {
  onSelectSection: (section: string) => void;
  onOpenSubscribe: () => void;
  onOpenGames: (gameKey?: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  onSelectSection,
  onOpenSubscribe,
  onOpenGames,
}) => {
  return (
    <footer
      className="max-w-[1360px] mx-auto px-2 sm:px-4 py-6 font-typewriter text-xs text-black select-none"
      data-purpose="retro-footer"
    >
      <div className="win95-raised p-3">
        {/* Top Directory Bar */}
        <div className="bg-[#000080] text-yellow-300 font-bold px-2 py-1 text-xs flex justify-between items-center mb-3">
          <span>THE NEW YORK TIMES ON THE WEB · SYSTEM DIRECTORY</span>
          <span className="font-pixel text-sm">SERVER: SPARC-01.NYT.NET</span>
        </div>

        {/* 90s HTML Table-style Site Directory */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 p-3 bg-white border border-black text-xs">
          <div>
            <b className="border-b border-black pb-0.5 block mb-1">News Desk</b>
            <ul className="space-y-0.5">
              <li><button onClick={() => onSelectSection('All')} className="retro-link text-xs">Front Page</button></li>
              <li><button onClick={() => onSelectSection('U.S.')} className="retro-link text-xs">National</button></li>
              <li><button onClick={() => onSelectSection('World')} className="retro-link text-xs">World Affairs</button></li>
              <li><button onClick={() => onSelectSection('Business')} className="retro-link text-xs">Wall Street</button></li>
            </ul>
          </div>

          <div>
            <b className="border-b border-black pb-0.5 block mb-1">Opinion</b>
            <ul className="space-y-0.5">
              <li><button onClick={() => onSelectSection('Opinion')} className="retro-link text-xs">Editorials</button></li>
              <li><button onClick={() => onSelectSection('Opinion')} className="retro-link text-xs">Op-Ed Columns</button></li>
              <li><button onClick={() => onSelectSection('Opinion')} className="retro-link text-xs">Letters to Editor</button></li>
            </ul>
          </div>

          <div>
            <b className="border-b border-black pb-0.5 block mb-1">CyberTimes</b>
            <ul className="space-y-0.5">
              <li><button onClick={() => onSelectSection('Lifestyle')} className="retro-link text-xs">CyberTimes</button></li>
              <li><button onClick={() => onSelectSection('Lifestyle')} className="retro-link text-xs">Silicon Valley</button></li>
              <li><button onClick={() => onSelectSection('Lifestyle')} className="retro-link text-xs">Web Culture</button></li>
            </ul>
          </div>

          <div>
            <b className="border-b border-black pb-0.5 block mb-1">Puzzles</b>
            <ul className="space-y-0.5">
              <li><button onClick={() => onOpenGames('wordle')} className="retro-link text-xs font-bold text-red-700">WORDLE.EXE</button></li>
              <li><button onClick={() => onOpenGames('mini')} className="retro-link text-xs">The Mini Crossword</button></li>
              <li><button onClick={() => onOpenGames('connections')} className="retro-link text-xs">Connections</button></li>
              <li><button onClick={() => onOpenGames('spelling-bee')} className="retro-link text-xs">Spelling Bee</button></li>
            </ul>
          </div>

          <div>
            <b className="border-b border-black pb-0.5 block mb-1">Services</b>
            <ul className="space-y-0.5">
              <li><button onClick={onOpenSubscribe} className="retro-link text-xs">Dial-Up Subscriptions</button></li>
              <li><button onClick={() => alert('Search Archives: Indexed back to 1851.')} className="retro-link text-xs">Text Archives</button></li>
              <li><button onClick={() => alert('FTP Download mirror.')} className="retro-link text-xs">FTP Mirrors</button></li>
            </ul>
          </div>

          <div>
            <b className="border-b border-black pb-0.5 block mb-1">Web Info</b>
            <ul className="space-y-0.5">
              <li><span className="text-[10px]">HTML 3.2 Strict</span></li>
              <li><span className="text-[10px]">Netscape 3.0 Gold</span></li>
              <li><span className="text-[10px]">28.8k Baud Rate</span></li>
            </ul>
          </div>
        </div>

        {/* Vintage 1990s Web Badges & Hit Counter */}
        <div className="mt-3 p-3 bg-[#e8e8e8] border border-black flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Authentic Hit Counter */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold">YOU ARE VISITOR:</span>
            <div className="win95-sunken bg-black text-green-400 font-pixel text-xl tracking-widest px-2 py-0.5 shadow-inner">
              0 4 8 2 9 1
            </div>
          </div>

          {/* 90s Internet Badges */}
          <div className="flex flex-wrap items-center gap-2 text-[10px]">
            <span className="win95-raised px-2 py-1 font-bold bg-[#c0c0c0] text-[#000080]">
              [BEST VIEWED AT 800x600]
            </span>
            <span className="win95-raised px-2 py-1 font-bold bg-[#c0c0c0] text-[#008000]">
              [NETSCAPE NOW! 3.0]
            </span>
            <span className="win95-raised px-2 py-1 font-bold bg-[#c0c0c0] text-black">
              [MADE WITH NOTEPAD]
            </span>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="mt-2 text-center text-[10px] text-gray-700 font-typewriter">
          Copyright © 1996–2026 The New York Times Company · All rights reserved · Reproduction in whole or in part without permission is prohibited.
        </div>
      </div>
    </footer>
  );
};
