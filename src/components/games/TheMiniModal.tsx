import React, { useState, useEffect } from 'react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-sans select-none">
      <div
        className="win95-raised max-w-xl w-full shadow-2xl p-1 flex flex-col focus:outline-none"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* Title Bar */}
        <div className="win95-titlebar mb-1">
          <span>MINIXWD.EXE - [Crossword Puzzle Player 1.0]</span>
          <div className="flex items-center gap-1">
            <span className="font-mono text-yellow-300 text-xs px-1">
              Time: {formatTimer(timerSeconds)}
            </span>
            <button
              onClick={onClose}
              className="win95-btn w-4 h-4 flex items-center justify-center font-mono text-[9px] font-bold p-0 leading-none text-black"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="bg-[#c0c0c0] px-2 py-0.5 border-b border-[#808080] text-xs flex justify-between text-black">
          <div className="flex gap-2">
            <span className="hover:underline cursor-pointer">Game</span>
            <button onClick={handleRevealAll} className="hover:underline text-[#000080] font-bold">
              Reveal Answers
            </button>
            <button onClick={handleReset} className="hover:underline">
              Clear Board
            </button>
          </div>
          <span className="font-typewriter text-[11px]">5x5 Broadsheet Grid</span>
        </div>

        {/* Content */}
        <div className="p-3 bg-[#c0c0c0] flex flex-col md:flex-row gap-4">
          {/* Grid Container */}
          <div className="flex flex-col items-center">
            <div className="win95-sunken p-1 bg-black w-60 h-60">
              <div className="grid grid-cols-5 gap-0.5 bg-black h-full">
                {initialGrid.map((row, r) =>
                  row.map((cell, c) => {
                    const isActive = activeCell.r === r && activeCell.c === c;
                    const isHighlighted =
                      direction === 'across' ? activeCell.r === r : activeCell.c === c;

                    if (cell.isBlack) {
                      return <div key={`${r}-${c}`} className="bg-neutral-900 w-full h-full" />;
                    }

                    return (
                      <div
                        key={`${r}-${c}`}
                        onClick={() => handleCellClick(r, c)}
                        className={`relative w-full h-full flex items-center justify-center cursor-pointer font-bold font-mono text-lg ${
                          isActive
                            ? 'bg-yellow-300 text-black'
                            : isHighlighted
                            ? 'bg-blue-100 text-black'
                            : 'bg-white text-black'
                        }`}
                      >
                        {cell.num && (
                          <span className="absolute top-0.5 left-1 text-[8px] font-sans font-bold text-gray-700 leading-none">
                            {cell.num}
                          </span>
                        )}
                        <span>{userLetters[r][c]}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {isSolved && (
              <div className="mt-2 p-1.5 bg-yellow-200 border border-black text-black text-xs font-bold text-center w-60">
                *** PUZZLE COMPLETED IN {formatTimer(timerSeconds)}! ***
              </div>
            )}
          </div>

          {/* Clues Pane */}
          <div className="flex-1 space-y-2 text-xs font-serif bg-white p-2 border border-black overflow-y-auto max-h-60">
            <div>
              <b className="font-sans text-[11px] text-[#000080] border-b border-black block pb-0.5 mb-1">
                ACROSS
              </b>
              <ul className="space-y-1 text-black text-xs">
                {clues.across.map((c) => (
                  <li key={c.num}>
                    <b>{c.num}.</b> {c.clue}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <b className="font-sans text-[11px] text-[#000080] border-b border-black block pb-0.5 mb-1">
                DOWN
              </b>
              <ul className="space-y-1 text-black text-xs">
                {clues.down.map((c) => (
                  <li key={c.num}>
                    <b>{c.num}.</b> {c.clue}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="win95-sunken px-2 py-0.5 text-[10px] font-typewriter text-black bg-[#c0c0c0] flex justify-between">
          <span>Click box to select · Type letters on keyboard</span>
          <span>Mode: {direction.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};
