import React from 'react';
import { Gamepad2, ArrowRight } from 'lucide-react';

interface InteractiveGamesBarProps {
  onOpenGame: (gameKey: string) => void;
}

export const InteractiveGamesBar: React.FC<InteractiveGamesBarProps> = ({ onOpenGame }) => {
  return (
    <section className="max-w-[1360px] mx-auto px-4 sm:px-6 py-10" data-purpose="nyt-games-module">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-sm">
        {/* Apple News+ Games Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0071e3] to-[#42a5f5] text-white flex items-center justify-center shadow-xs">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-apple-display font-extrabold text-2xl tracking-tight text-[#1d1d1f]">
                  Apple News+ Puzzles
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-black/[0.05] text-neutral-700 px-2.5 py-0.5 rounded-full">
                  Daily Play
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-nyt-sans mt-0.5">
                Play iconic daily brain teasers, anagrams, and crosswords.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenGame('wordle')}
            className="text-xs font-semibold text-[#0071e3] hover:underline flex items-center gap-1 cursor-pointer font-nyt-sans"
          >
            <span>View All Games</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Apple Squircle Puzzles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 font-nyt-sans">
          {/* Wordle */}
          <button
            onClick={() => onOpenGame('wordle')}
            className="p-4 rounded-2xl bg-[#f5f5f7] hover:bg-white hover:shadow-md border border-black/[0.04] transition-all text-center flex flex-col items-center justify-between group cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-black text-xl rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              W
            </div>
            <div className="my-2">
              <span className="font-apple-display font-bold text-sm block text-[#1d1d1f]">Wordle</span>
              <span className="text-[11px] text-neutral-500 line-clamp-1">Guess 5 letters</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Play Now
            </span>
          </button>

          {/* Connections */}
          <button
            onClick={() => onOpenGame('connections')}
            className="p-4 rounded-2xl bg-[#f5f5f7] hover:bg-white hover:shadow-md border border-black/[0.04] transition-all text-center flex flex-col items-center justify-between group cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 text-amber-950 font-black text-xl rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              ✦
            </div>
            <div className="my-2">
              <span className="font-apple-display font-bold text-sm block text-[#1d1d1f]">Connections</span>
              <span className="text-[11px] text-neutral-500 line-clamp-1">Find common links</span>
            </div>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
              4 Groups
            </span>
          </button>

          {/* Spelling Bee */}
          <button
            onClick={() => onOpenGame('spelling-bee')}
            className="p-4 rounded-2xl bg-[#f5f5f7] hover:bg-white hover:shadow-md border border-black/[0.04] transition-all text-center flex flex-col items-center justify-between group cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-950 font-black text-xl rounded-full flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              ⬢
            </div>
            <div className="my-2">
              <span className="font-apple-display font-bold text-sm block text-[#1d1d1f]">Spelling Bee</span>
              <span className="text-[11px] text-neutral-500 line-clamp-1">Make 4+ letter words</span>
            </div>
            <span className="text-[10px] font-bold text-yellow-900 bg-yellow-50 px-2 py-0.5 rounded-full">
              Honey Hive
            </span>
          </button>

          {/* The Mini */}
          <button
            onClick={() => onOpenGame('mini')}
            className="p-4 rounded-2xl bg-[#f5f5f7] hover:bg-white hover:shadow-md border border-black/[0.04] transition-all text-center flex flex-col items-center justify-between group cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-700 text-white font-black text-xl rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              ⊞
            </div>
            <div className="my-2">
              <span className="font-apple-display font-bold text-sm block text-[#1d1d1f]">The Mini</span>
              <span className="text-[11px] text-neutral-500 line-clamp-1">5x5 Quick Crossword</span>
            </div>
            <span className="text-[10px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full">
              Bite-sized
            </span>
          </button>

          {/* Strands */}
          <button
            onClick={() => onOpenGame('connections')}
            className="p-4 rounded-2xl bg-[#f5f5f7] hover:bg-white hover:shadow-md border border-black/[0.04] transition-all text-center flex flex-col items-center justify-between group cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-black text-xl rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              ∿
            </div>
            <div className="my-2">
              <span className="font-apple-display font-bold text-sm block text-[#1d1d1f]">Strands</span>
              <span className="text-[11px] text-neutral-500 line-clamp-1">Thematic word search</span>
            </div>
            <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-full">
              Word Grid
            </span>
          </button>

          {/* The Crossword */}
          <button
            onClick={() => onOpenGame('mini')}
            className="p-4 rounded-2xl bg-[#f5f5f7] hover:bg-white hover:shadow-md border border-black/[0.04] transition-all text-center flex flex-col items-center justify-between group cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-neutral-800 to-black text-white font-black text-xl rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              №
            </div>
            <div className="my-2">
              <span className="font-apple-display font-bold text-sm block text-[#1d1d1f]">The Crossword</span>
              <span className="text-[11px] text-neutral-500 line-clamp-1">The iconic challenge</span>
            </div>
            <span className="text-[10px] font-bold text-neutral-800 bg-neutral-200 px-2 py-0.5 rounded-full">
              Daily Master
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
