import React, { useState, useEffect } from 'react';
import { X, RotateCcw, CheckCircle2 } from 'lucide-react';

interface TheMiniModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CellData {
  r: number;
  c: number;
  solution: string;
  isBlack: boolean;
  num?: number;
}

export const TheMiniModal: React.FC<TheMiniModalProps> = ({ isOpen, onClose }) => {
  const initialGrid: CellData[][] = [
    [
      { r: 0, c: 0, solution: 'N', isBlack: false, num: 1 },
      { r: 0, c: 1, solution: 'E', isBlack: false, num: 2 },
      { r: 0, c: 2, solution: 'W', isBlack: false, num: 3 },
      { r: 0, c: 3, solution: 'S', isBlack: false, num: 4 },
      { r: 0, c: 4, solution: '', isBlack: true },
    ],
    [
      { r: 1, c: 0, solution: 'O', isBlack: false, num: 5 },
      { r: 1, c: 1, solution: 'P', isBlack: false },
      { r: 1, c: 2, solution: 'E', isBlack: false },
      { r: 1, c: 3, solution: 'N', isBlack: false },
      { r: 1, c: 4, solution: 'S', isBlack: false, num: 6 },
    ],
    [
      { r: 2, c: 0, solution: 'T', isBlack: false, num: 7 },
      { r: 2, c: 1, solution: 'I', isBlack: false },
      { r: 2, c: 2, solution: 'M', isBlack: false },
      { r: 2, c: 3, solution: 'E', isBlack: false },
      { r: 2, c: 4, solution: 'S', isBlack: false },
    ],
    [
      { r: 3, c: 0, solution: 'E', isBlack: false, num: 8 },
      { r: 3, c: 1, solution: 'C', isBlack: false },
      { r: 3, c: 2, solution: 'H', isBlack: false },
      { r: 3, c: 3, solution: 'O', isBlack: false },
      { r: 3, c: 4, solution: 'S', isBlack: false },
    ],
    [
      { r: 4, c: 0, solution: '', isBlack: true },
      { r: 4, c: 1, solution: 'K', isBlack: false, num: 9 },
      { r: 4, c: 2, solution: 'S', isBlack: false },
      { r: 4, c: 3, solution: 'P', isBlack: false },
      { r: 4, c: 4, solution: 'Y', isBlack: false },
    ],
  ];

  const clues = {
    across: [
      { num: 1, clue: 'Breaking reports and journalism (4 letters)', answer: 'NEWS' },
      { num: 5, clue: 'Unlocks, or begins business hours (5 letters)', answer: 'OPENS' },
      { num: 7, clue: 'Iconic broadsheet daily (5 letters)', answer: 'TIMES' },
      { num: 8, clue: 'Reverberating sound effects (5 letters)', answer: 'ECHOS' },
      { num: 9, clue: 'Secret agent or operative (3 letters)', answer: 'SPY' },
    ],
    down: [
      { num: 1, clue: 'Jot down in a reporter’s pad (4 letters)', answer: 'NOTE' },
      { num: 2, clue: 'Heroic narrative or grand poem (4 letters)', answer: 'EPIC' },
      { num: 3, clue: 'Large and hefty, like a Sunday edition (4 letters)', answer: 'WEMH' },
      { num: 4, clue: 'Demeanour of the air or wind (4 letters)', answer: 'SNEP' },
      { num: 6, clue: 'Plural suffix for journalists (4 letters)', answer: 'SSSY' },
    ],
  };

  const [userLetters, setUserLetters] = useState<string[][]>([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);

  const [activeCell, setActiveCell] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [isSolved, setIsSolved] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    if (!isOpen || isSolved) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isSolved]);

  const handleCellClick = (r: number, c: number) => {
    if (initialGrid[r][c].isBlack) return;
    if (activeCell.r === r && activeCell.c === c) {
      setDirection((prev) => (prev === 'across' ? 'down' : 'across'));
    } else {
      setActiveCell({ r, c });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { r, c } = activeCell;
    if (e.key === 'Backspace') {
      const next = [...userLetters.map((row) => [...row])];
      if (next[r][c] !== '') {
        next[r][c] = '';
        setUserLetters(next);
      } else {
        if (direction === 'across' && c > 0 && !initialGrid[r][c - 1].isBlack) {
          setActiveCell({ r, c: c - 1 });
        } else if (direction === 'down' && r > 0 && !initialGrid[r - 1][c].isBlack) {
          setActiveCell({ r: r - 1, c });
        }
      }
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      const char = e.key.toUpperCase();
      const next = [...userLetters.map((row) => [...row])];
      next[r][c] = char;
      setUserLetters(next);

      if (direction === 'across') {
        if (c + 1 < 5 && !initialGrid[r][c + 1].isBlack) {
          setActiveCell({ r, c: c + 1 });
        }
      } else {
        if (r + 1 < 5 && !initialGrid[r + 1][c].isBlack) {
          setActiveCell({ r: r + 1, c });
        }
      }

      let allCorrect = true;
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          if (!initialGrid[row][col].isBlack) {
            const val = row === r && col === c ? char : next[row][col];
            if (val !== initialGrid[row][col].solution) {
              allCorrect = false;
            }
          }
        }
      }
      if (allCorrect) {
        setIsSolved(true);
      }
    } else if (e.key === 'ArrowRight' && c < 4 && !initialGrid[r][c + 1].isBlack) {
      setActiveCell({ r, c: c + 1 });
    } else if (e.key === 'ArrowLeft' && c > 0 && !initialGrid[r][c - 1].isBlack) {
      setActiveCell({ r, c: c - 1 });
    } else if (e.key === 'ArrowDown' && r < 4 && !initialGrid[r + 1][c].isBlack) {
      setActiveCell({ r: r + 1, c });
    } else if (e.key === 'ArrowUp' && r > 0 && !initialGrid[r - 1][c].isBlack) {
      setActiveCell({ r: r - 1, c });
    }
  };

  const handleRevealAll = () => {
    const revealed = initialGrid.map((row) =>
      row.map((cell) => (cell.isBlack ? '' : cell.solution))
    );
    setUserLetters(revealed);
    setIsSolved(true);
  };

  const handleReset = () => {
    setUserLetters([
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ]);
    setActiveCell({ r: 0, c: 0 });
    setIsSolved(false);
    setTimerSeconds(0);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div
        className="bg-white/95 backdrop-blur-2xl max-w-xl w-full rounded-3xl shadow-2xl border border-black/10 overflow-hidden flex flex-col max-h-[92vh] font-nyt-sans focus:outline-none"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* Apple Style Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 bg-sky-600 text-white text-xs font-bold rounded-xl flex items-center justify-center shadow-xs">
              ⊞
            </span>
            <div>
              <h3 className="font-apple-display font-extrabold text-lg tracking-tight text-[#1d1d1f]">
                The Mini Crossword
              </h3>
              <span className="text-[10px] text-neutral-400 font-medium">Bite-sized daily grid</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold bg-[#f5f5f7] px-3 py-1 rounded-full text-neutral-700">
              {formatTimer(timerSeconds)}
            </span>
            <button
              onClick={handleRevealAll}
              className="text-xs font-semibold text-[#0071e3] hover:underline cursor-pointer px-2"
            >
              Reveal
            </button>
            <button
              onClick={handleReset}
              className="w-7 h-7 rounded-full bg-black/[0.05] hover:bg-black/[0.09] flex items-center justify-center text-neutral-600 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-black/[0.05] hover:bg-black/[0.09] flex items-center justify-center text-neutral-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col md:flex-row gap-6 overflow-y-auto">
          {/* Grid Container */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-5 gap-1 bg-neutral-200 p-1.5 rounded-2xl w-64 h-64 select-none shadow-xs">
              {initialGrid.map((row, r) =>
                row.map((cell, c) => {
                  const isActive = activeCell.r === r && activeCell.c === c;
                  const isHighlighted =
                    direction === 'across' ? activeCell.r === r : activeCell.c === c;

                  if (cell.isBlack) {
                    return <div key={`${r}-${c}`} className="bg-neutral-800 rounded-lg w-full h-full" />;
                  }

                  return (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className={`relative w-full h-full rounded-lg flex items-center justify-center cursor-pointer transition-all shadow-xs ${
                        isActive
                          ? 'bg-[#0071e3] text-white font-bold scale-105 z-10'
                          : isHighlighted
                          ? 'bg-[#0071e3]/15 text-neutral-900'
                          : 'bg-white text-neutral-900 hover:bg-neutral-50'
                      }`}
                    >
                      {cell.num && (
                        <span
                          className={`absolute top-1 left-1.5 text-[9px] font-bold ${
                            isActive ? 'text-white/80' : 'text-neutral-400'
                          }`}
                        >
                          {cell.num}
                        </span>
                      )}
                      <span className="font-apple-display font-bold text-lg">
                        {userLetters[r][c]}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {isSolved && (
              <div className="mt-4 p-3 bg-emerald-50 text-emerald-900 text-xs font-semibold rounded-2xl flex items-center gap-2 border border-emerald-100 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Solved in {formatTimer(timerSeconds)}! Splendid!</span>
              </div>
            )}
          </div>

          {/* Clues Pane */}
          <div className="flex-1 space-y-4 text-xs font-nyt-sans">
            <div>
              <h4 className="font-apple-display font-bold text-neutral-900 pb-1.5 border-b border-black/[0.06] mb-2">
                Across
              </h4>
              <ul className="space-y-1.5 text-neutral-600">
                {clues.across.map((c) => (
                  <li key={c.num} className="leading-snug">
                    <strong className="text-black font-semibold">{c.num}.</strong> {c.clue}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-apple-display font-bold text-neutral-900 pb-1.5 border-b border-black/[0.06] mb-2">
                Down
              </h4>
              <ul className="space-y-1.5 text-neutral-600">
                {clues.down.map((c) => (
                  <li key={c.num} className="leading-snug">
                    <strong className="text-black font-semibold">{c.num}.</strong> {c.clue}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#f5f5f7]/60 border-t border-black/[0.04] text-center text-[11px] text-neutral-400 font-nyt-sans">
          Click a cell or clue to toggle Across/Down · Type letters on your keyboard
        </div>
      </div>
    </div>
  );
};
