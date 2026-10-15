import React from 'react';
import { Gamepad2, Play } from 'lucide-react';

interface InteractiveGamesBarProps {
  onOpenGame: (gameKey: string) => void;
}

export const InteractiveGamesBar: React.FC<InteractiveGamesBarProps> = ({ onOpenGame }) => {
  return (
    <section className="max-w-[1360px] mx-auto px-2 sm:px-4 py-4 select-none" data-purpose="nyt-games-module">
      <div className="win95-raised p-2">
        {/* Windows 95 Entertainment Pack Titlebar */}
        <div className="win95-titlebar mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-yellow-300 font-bold">🎮</span>
            <span>The New York Times - Daily Entertainment Pack (16-Bit Edition)</span>
          </div>
          <span className="font-pixel text-yellow-300 text-xs">JAVA 1.1 APPLET READY</span>
        </div>

        {/* Retro Games Grid */}
        <div className="bg-[#c0c0c0] p-3 border border-black grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Wordle.exe */}
          <div
            onClick={() => onOpenGame('wordle')}
            className="win95-raised p-2 text-center cursor-pointer hover:bg-[#dfdfdf] flex flex-col items-center justify-between active:scale-98"
          >
            <div className="win95-sunken w-10 h-10 bg-black text-green-400 font-pixel text-2xl flex items-center justify-center font-bold mb-2">
              W
            </div>
            <div className="font-bold text-xs text-black">WORDLE.EXE</div>
            <span className="text-[10px] text-gray-600 font-typewriter">5-Letter Guess</span>
            <button className="win95-btn text-[10px] font-bold px-2 py-0.5 mt-2 w-full text-[#000080]">
              [Run App]
            </button>
          </div>

          {/* Connections.exe */}
          <div
            onClick={() => onOpenGame('connections')}
            className="win95-raised p-2 text-center cursor-pointer hover:bg-[#dfdfdf] flex flex-col items-center justify-between active:scale-98"
          >
            <div className="win95-sunken w-10 h-10 bg-black text-yellow-400 font-pixel text-2xl flex items-center justify-center font-bold mb-2">
              ✦
            </div>
            <div className="font-bold text-xs text-black">CONNECT.EXE</div>
            <span className="text-[10px] text-gray-600 font-typewriter">Group 4 Words</span>
            <button className="win95-btn text-[10px] font-bold px-2 py-0.5 mt-2 w-full text-[#000080]">
              [Run App]
            </button>
          </div>

          {/* SpellingBee.com */}
          <div
            onClick={() => onOpenGame('spelling-bee')}
            className="win95-raised p-2 text-center cursor-pointer hover:bg-[#dfdfdf] flex flex-col items-center justify-between active:scale-98"
          >
            <div className="win95-sunken w-10 h-10 bg-black text-amber-400 font-pixel text-2xl flex items-center justify-center font-bold mb-2">
              ⬢
            </div>
            <div className="font-bold text-xs text-black">SPELL_BEE.COM</div>
            <span className="text-[10px] text-gray-600 font-typewriter">Honeycomb Anagram</span>
            <button className="win95-btn text-[10px] font-bold px-2 py-0.5 mt-2 w-full text-[#000080]">
              [Run App]
            </button>
          </div>

          {/* TheMini.exe */}
          <div
            onClick={() => onOpenGame('mini')}
            className="win95-raised p-2 text-center cursor-pointer hover:bg-[#dfdfdf] flex flex-col items-center justify-between active:scale-98"
          >
            <div className="win95-sunken w-10 h-10 bg-black text-cyan-400 font-pixel text-2xl flex items-center justify-center font-bold mb-2">
              ⊞
            </div>
            <div className="font-bold text-xs text-black">MINIXWD.EXE</div>
            <span className="text-[10px] text-gray-600 font-typewriter">5x5 Quick Grid</span>
            <button className="win95-btn text-[10px] font-bold px-2 py-0.5 mt-2 w-full text-[#000080]">
              [Run App]
            </button>
          </div>

          {/* Strands */}
          <div
            onClick={() => onOpenGame('connections')}
            className="win95-raised p-2 text-center cursor-pointer hover:bg-[#dfdfdf] flex flex-col items-center justify-between active:scale-98"
          >
            <div className="win95-sunken w-10 h-10 bg-black text-purple-400 font-pixel text-2xl flex items-center justify-center font-bold mb-2">
              ∿
            </div>
            <div className="font-bold text-xs text-black">STRANDS.EXE</div>
            <span className="text-[10px] text-gray-600 font-typewriter">Word Grid Matrix</span>
            <button className="win95-btn text-[10px] font-bold px-2 py-0.5 mt-2 w-full text-[#000080]">
              [Run App]
            </button>
          </div>

          {/* Crossword.exe */}
          <div
            onClick={() => onOpenGame('mini')}
            className="win95-raised p-2 text-center cursor-pointer hover:bg-[#dfdfdf] flex flex-col items-center justify-between active:scale-98"
          >
            <div className="win95-sunken w-10 h-10 bg-black text-white font-pixel text-2xl flex items-center justify-center font-bold mb-2">
              №
            </div>
            <div className="font-bold text-xs text-black">CROSSWORD.EXE</div>
            <span className="text-[10px] text-gray-600 font-typewriter">Daily Challenge</span>
            <button className="win95-btn text-[10px] font-bold px-2 py-0.5 mt-2 w-full text-[#000080]">
              [Run App]
            </button>
          </div>
        </div>

        {/* Windows 95 Taskbar Status */}
        <div className="win95-sunken px-2 py-1 mt-2 text-[10px] font-typewriter text-gray-700 flex justify-between bg-white">
          <span>Sound Card: Sound Blaster 16 Detected</span>
          <span>Graphics: VGA 640x480x256 Colors</span>
        </div>
      </div>
    </section>
  );
};
