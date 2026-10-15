import React, { useState, useEffect, useCallback } from 'react';
import { X, RotateCcw, Award } from 'lucide-react';
import { WORDLE_SOLUTION, WORDLE_VALID_WORDS } from '../../data/gamesData';

interface WordleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WordleModal: React.FC<WordleModalProps> = ({ isOpen, onClose }) => {
  const [solution] = useState<string>(WORDLE_SOLUTION);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2500);
  };

  const handleCharInput = useCallback(
    (char: string) => {
      if (isGameOver || currentGuess.length >= 5) return;
      setCurrentGuess((prev) => prev + char.toUpperCase());
    },
    [isGameOver, currentGuess.length]
  );

  const handleDelete = useCallback(() => {
    if (isGameOver) return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, [isGameOver]);

  const handleEnter = useCallback(() => {
    if (isGameOver) return;
    if (currentGuess.length !== 5) {
      showToast('Not enough letters');
      return;
    }

    const nextGuesses = [...guesses, currentGuess];
    setGuesses(nextGuesses);
    setCurrentGuess('');

    if (currentGuess === solution) {
      setIsGameOver(true);
      setHasWon(true);
      showToast('Splendid! You guessed today’s word!');
    } else if (nextGuesses.length >= 6) {
      setIsGameOver(true);
      setHasWon(false);
      showToast(`Game Over! The word was ${solution}`);
    }
  }, [isGameOver, currentGuess, guesses, solution]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleEnter();
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleCharInput(e.key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleEnter, handleDelete, handleCharInput]);

  const resetGame = () => {
    setGuesses([]);
    setCurrentGuess('');
    setIsGameOver(false);
    setHasWon(false);
    setMessage('');
  };

  if (!isOpen) return null;

  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'],
  ];

  const getTileStatus = (char: string, index: number, guess: string) => {
    if (guess[index] === solution[index]) return 'bg-emerald-600 text-white border-emerald-600 shadow-xs';
    if (solution.includes(char)) return 'bg-amber-500 text-white border-amber-500 shadow-xs';
    return 'bg-neutral-600 text-white border-neutral-600';
  };

  const getKeyStatus = (key: string) => {
    let status = 'bg-[#f5f5f7] hover:bg-neutral-200 text-neutral-800';
    for (const guess of guesses) {
      for (let i = 0; i < 5; i++) {
        if (guess[i] === key) {
          if (solution[i] === key) {
            return 'bg-emerald-600 text-white';
          } else if (solution.includes(key)) {
            status = 'bg-amber-500 text-white';
          } else if (status !== 'bg-amber-500 text-white') {
            status = 'bg-neutral-500 text-white';
          }
        }
      }
    }
    return status;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div className="bg-white/95 backdrop-blur-2xl max-w-md w-full rounded-3xl shadow-2xl border border-black/10 overflow-hidden flex flex-col max-h-[92vh] font-nyt-sans">
        {/* Apple Style Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center justify-center shadow-xs">
              W
            </span>
            <div>
              <h3 className="font-apple-display font-extrabold text-lg tracking-tight text-[#1d1d1f]">
                Wordle
              </h3>
              <span className="text-[10px] text-neutral-400 font-medium">Daily Puzzle No. 1214</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={resetGame}
              title="Reset Puzzle"
              className="w-7 h-7 rounded-full bg-black/[0.05] hover:bg-black/[0.09] flex items-center justify-center text-neutral-600 hover:text-black transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-black/[0.05] hover:bg-black/[0.09] flex items-center justify-center text-neutral-600 hover:text-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Toast */}
        {message && (
          <div className="bg-black/90 backdrop-blur-md text-white text-xs font-medium px-4 py-2 mx-auto mt-2 rounded-full shadow-lg text-center animate-bounce">
            {message}
          </div>
        )}

        {/* Wordle Grid */}
        <div className="p-4 flex-1 flex flex-col items-center justify-center overflow-y-auto">
          <div className="grid grid-rows-6 gap-2 w-64 max-w-full">
            {Array.from({ length: 6 }).map((_, rowIndex) => {
              const isCurrentRow = rowIndex === guesses.length;
              const guess = guesses[rowIndex] || '';
              return (
                <div key={rowIndex} className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 5 }).map((_, colIndex) => {
                    let char = '';
                    let statusClasses = 'border border-black/[0.08] text-neutral-800 bg-[#f5f5f7]';

                    if (rowIndex < guesses.length) {
                      char = guess[colIndex] || '';
                      statusClasses = getTileStatus(char, colIndex, guess);
                    } else if (isCurrentRow) {
                      char = currentGuess[colIndex] || '';
                      if (char) {
                        statusClasses = 'border-2 border-neutral-900 text-neutral-900 bg-white scale-105';
                      }
                    }

                    return (
                      <div
                        key={colIndex}
                        className={`aspect-square rounded-xl flex items-center justify-center font-bold text-xl uppercase transition-all duration-200 ${statusClasses}`}
                      >
                        {char}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {isGameOver && (
            <div className="mt-4 p-4 bg-[#f5f5f7] rounded-2xl text-center w-full max-w-xs border border-black/[0.05]">
              <div className="flex items-center justify-center gap-1.5 font-bold text-sm mb-1 text-neutral-900">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>{hasWon ? 'Splendid!' : 'Next time!'}</span>
              </div>
              <p className="text-xs text-neutral-600">
                The word was <strong className="text-black font-semibold">{solution}</strong>.
              </p>
              <button
                onClick={resetGame}
                className="mt-2 text-xs bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold py-1.5 px-4 rounded-full transition-all cursor-pointer shadow-xs"
              >
                Play Again
              </button>
            </div>
          )}
        </div>

        {/* On-Screen Keyboard */}
        <div className="p-3 border-t border-black/[0.04] bg-[#f5f5f7]/70">
          <div className="flex flex-col gap-1.5 max-w-md mx-auto">
            {keys.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-1">
                {row.map((k) => {
                  const isSpecial = k === 'ENTER' || k === 'DEL';
                  return (
                    <button
                      key={k}
                      onClick={() => {
                        if (k === 'ENTER') handleEnter();
                        else if (k === 'DEL') handleDelete();
                        else handleCharInput(k);
                      }}
                      className={`h-11 rounded-xl text-xs font-bold transition-all select-none shadow-xs cursor-pointer ${
                        isSpecial ? 'px-3 text-[10px]' : 'flex-1 min-w-[28px]'
                      } ${getKeyStatus(k)}`}
                    >
                      {k}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
