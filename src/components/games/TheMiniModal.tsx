import React, { useState, useEffect, useRef } from 'react';
import { X, RotateCcw, CheckCircle2, HelpCircle } from 'lucide-react';

interface TheMiniModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 5x5 Mini Crossword Grid layout
// Across:
// 1: P R E S S (Newspaper staff or printing machine)
// 6: R A D I O (Broadcast medium)
// 7: I N K E D (Permanently signed or marked)
// 8: N E W S Y (Full of gossip or reports)
// 9: T E X T S (Reads on a phone screen)
// Down:
// 1: P R I N T (Publish on paper)
// 2: R A N E E (Indian queen/princess)
// 3: E D K E X -> let's make a grid that works cleanly:

interface CellData {
  r: number;
  c: number;
  solution: string;
  isBlack: boolean;
  num?: number;
}

const SOLUTION_GRID: (string | null)[][] = [
  ['N', 'E', 'W', 'S', null],
  ['O', 'P', 'E', 'N', 'S'],
  ['T', 'I', 'M', 'E', 'S'],
  ['E', 'C', 'H', 'O', 'E'],
  [null, 'K', 'O', 'P', 'T'],
];

export const TheMiniModal: React.FC<TheMiniModalProps> = ({ isOpen, onClose }) => {
  // 5x5 grid
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
        // Move back
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

      // Advance
      if (direction === 'across') {
        if (c + 1 < 5 && !initialGrid[r][c + 1].isBlack) {
          setActiveCell({ r, c: c + 1 });
        }
      } else {
        if (r + 1 < 5 && !initialGrid[r + 1][c].isBlack) {
          setActiveCell({ r: r + 1, c });
        }
      }

      // Check solved
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div
        className="bg-white max-w-xl w-full rounded-md shadow-2xl border border-neutral-300 overflow-hidden flex flex-col max-h-[92vh] focus:outline-none"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-nyt bg-[#fbf9f5]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-sky-600 text-white text-xs font-bold rounded flex items-center justify-center">
              ⊞
            </span>
            <h3 className="font-serif font-black text-lg tracking-tight">The Mini Crossword</h3>
            <span className="text-xs font-mono font-bold bg-neutral-100 px-2 py-0.5 rounded text-neutral-700">
              {formatTimer(timerSeconds)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRevealAll}
              title="Reveal Puzzle"
              className="text-[11px] font-nyt-sans font-semibold text-neutral-600 hover:text-black hover:underline"
            >
              Reveal
            </button>
            <button
              onClick={handleReset}
              title="Reset"
              className="p-1 text-neutral-600 hover:text-black rounded transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1 text-neutral-600 hover:text-black rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col md:flex-row gap-5 overflow-y-auto">
          {/* Grid Container */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-5 gap-0.5 bg-neutral-900 border-2 border-neutral-900 p-0.5 rounded-xs w-64 h-64 select-none">
              {initialGrid.map((row, r) =>
                row.map((cell, c) => {
                  const isActive = activeCell.r === r && activeCell.c === c;
                  const isHighlighted =
                    direction === 'across' ? activeCell.r === r : activeCell.c === c;

                  if (cell.isBlack) {
                    return <div key={`${r}-${c}`} className="bg-black w-full h-full" />;
                  }

                  return (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className={`relative w-full h-full flex items-center justify-center cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-amber-300 font-bold'
                          : isHighlighted
                          ? 'bg-sky-100'
                          : 'bg-white hover:bg-neutral-50'
                      }`}
                    >
                      {cell.num && (
                        <span className="absolute top-0.5 left-1 text-[9px] font-sans font-semibold text-neutral-600">
                          {cell.num}
                        </span>
                      )}
                      <span className="font-sans font-bold text-lg text-neutral-900">
                        {userLetters[r][c]}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {isSolved && (
              <div className="mt-3 p-2.5 bg-emerald-100 text-emerald-900 text-xs font-semibold rounded flex items-center gap-1.5 w-64 text-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Solved in {formatTimer(timerSeconds)}! Great job!</span>
              </div>
            )}
          </div>

          {/* Clues Pane */}
          <div className="flex-1 space-y-4 text-xs font-nyt-sans">
            <div>
              <h4 className="font-bold uppercase tracking-wider text-neutral-900 border-b border-nyt pb-1 mb-2">
                Across
              </h4>
              <ul className="space-y-1.5 text-neutral-700">
                {clues.across.map((c) => (
                  <li key={c.num} className="leading-snug">
                    <strong className="text-black">{c.num}.</strong> {c.clue}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider text-neutral-900 border-b border-nyt pb-1 mb-2">
                Down
              </h4>
              <ul className="space-y-1.5 text-neutral-700">
                {clues.down.map((c) => (
                  <li key={c.num} className="leading-snug">
                    <strong className="text-black">{c.num}.</strong> {c.clue}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="p-3 bg-neutral-50 border-t border-nyt text-center text-[11px] text-neutral-500 font-nyt-sans">
          Click a cell or clue to toggle Across/Down • Type letters directly on your keyboard
        </div>
      </div>
    </div>
  );
};
