import React from 'react';

interface InteractiveGamesBarProps {
  onOpenGame: (gameKey: string) => void;
}

export const InteractiveGamesBar: React.FC<InteractiveGamesBarProps> = ({ onOpenGame }) => {
  return (
    <section className="max-w-[1340px] mx-auto px-4 py-8" data-purpose="nyt-games-module">
      <div className="border-t-2 border-black pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="font-headline font-black text-2xl tracking-tight">Play NYT Games</span>
            <span className="font-nyt-sans text-[11px] bg-black text-white px-2 py-0.5 rounded uppercase font-bold tracking-wider">
              Daily Puzzles
            </span>
          </div>
          <button
            onClick={() => onOpenGame('wordle')}
            className="font-nyt-sans text-xs font-semibold text-neutral-600 hover:underline hover:text-black"
          >
            View All Games ›
          </button>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 font-nyt-sans">
          {/* Wordle */}
          <button
            onClick={() => onOpenGame('wordle')}
            className="p-3 border border-nyt hover:border-black rounded bg-white hover:shadow-xs transition-all text-center block w-full group cursor-pointer"
          >
            <div className="w-8 h-8 bg-emerald-600 group-hover:scale-105 transition-transform text-white font-bold flex items-center justify-center mx-auto mb-2 text-sm rounded">
              W
            </div>
            <span className="font-bold text-sm block group-hover:underline text-neutral-900">Wordle</span>
            <span className="text-[11px] text-neutral-500">6 chances to guess 5 letters</span>
          </button>

          {/* Connections */}
          <button
            onClick={() => onOpenGame('connections')}
            className="p-3 border border-nyt hover:border-black rounded bg-white hover:shadow-xs transition-all text-center block w-full group cursor-pointer"
          >
            <div className="w-8 h-8 bg-yellow-400 group-hover:scale-105 transition-transform text-black font-bold flex items-center justify-center mx-auto mb-2 text-sm rounded">
              ✦
            </div>
            <span className="font-bold text-sm block group-hover:underline text-neutral-900">Connections</span>
            <span className="text-[11px] text-neutral-500">Group words with shared links</span>
          </button>

          {/* Spelling Bee */}
          <button
            onClick={() => onOpenGame('spelling-bee')}
            className="p-3 border border-nyt hover:border-black rounded bg-white hover:shadow-xs transition-all text-center block w-full group cursor-pointer"
          >
            <div className="w-8 h-8 bg-amber-400 group-hover:scale-105 transition-transform text-amber-950 font-bold flex items-center justify-center mx-auto mb-2 text-sm rounded-full">
              ⬢
            </div>
            <span className="font-bold text-sm block group-hover:underline text-neutral-900">Spelling Bee</span>
            <span className="text-[11px] text-neutral-500">Form words with 7 letters</span>
          </button>

          {/* The Mini */}
          <button
            onClick={() => onOpenGame('mini')}
            className="p-3 border border-nyt hover:border-black rounded bg-white hover:shadow-xs transition-all text-center block w-full group cursor-pointer"
          >
            <div className="w-8 h-8 bg-sky-600 group-hover:scale-105 transition-transform text-white font-bold flex items-center justify-center mx-auto mb-2 text-sm rounded">
              ⊞
            </div>
            <span className="font-bold text-sm block group-hover:underline text-neutral-900">The Mini</span>
            <span className="text-[11px] text-neutral-500">Quick bite-sized crossword</span>
          </button>

          {/* Strands */}
          <button
            onClick={() => onOpenGame('connections')}
            className="p-3 border border-nyt hover:border-black rounded bg-white hover:shadow-xs transition-all text-center block w-full group cursor-pointer"
          >
            <div className="w-8 h-8 bg-indigo-600 group-hover:scale-105 transition-transform text-white font-bold flex items-center justify-center mx-auto mb-2 text-sm rounded">
              ∿
            </div>
            <span className="font-bold text-sm block group-hover:underline text-neutral-900">Strands</span>
            <span className="text-[11px] text-neutral-500">Find hidden themed words</span>
          </button>

          {/* The Crossword */}
          <button
            onClick={() => onOpenGame('mini')}
            className="p-3 border border-nyt hover:border-black rounded bg-white hover:shadow-xs transition-all text-center block w-full group cursor-pointer"
          >
            <div className="w-8 h-8 bg-neutral-800 group-hover:scale-105 transition-transform text-white font-bold flex items-center justify-center mx-auto mb-2 text-sm rounded">
              №
            </div>
            <span className="font-bold text-sm block group-hover:underline text-neutral-900">The Crossword</span>
            <span className="text-[11px] text-neutral-500">The iconic daily challenge</span>
          </button>
        </div>
      </div>
    </section>
  );
};
