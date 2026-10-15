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

  // Keyboard rows
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'],
  ];

  const getTileStatus = (char: string, index: number, guess: string) => {
    if (guess[index] === solution[index]) return 'bg-emerald-600 text-white border-emerald-600';
    if (solution.includes(char)) return 'bg-amber-500 text-white border-amber-500';
    return 'bg-neutral-600 text-white border-neutral-600';
  };

  const getKeyStatus = (key: string) => {
    let status = 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white max-w-md w-full rounded-md shadow-2xl border border-neutral-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-nyt bg-[#fbf9f5]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-emerald-600 text-white text-xs font-bold rounded flex items-center justify-center">
              W
            </span>
            <h3 className="font-serif font-black text-lg tracking-tight">Wordle</h3>
            <span className="text-xs text-neutral-500 font-nyt-sans">No. 1214</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetGame}
              title="Play Again"
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

        {/* Message Toast */}
        {message && (
          <div className="bg-black text-white text-xs font-nyt-sans font-bold px-4 py-2 mx-auto mt-2 rounded shadow-lg text-center animate-bounce">
            {message}
          </div>
        )}

        {/* Wordle Grid */}
        <div className="p-4 flex-1 flex flex-col items-center justify-center overflow-y-auto">
          <div className="grid grid-rows-6 gap-1.5 w-64 max-w-full">
            {Array.from({ length: 6 }).map((_, rowIndex) => {
              const isCurrentRow = rowIndex === guesses.length;
              const guess = guesses[rowIndex] || '';
              return (
                <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
                  {Array.from({ length: 5 }).map((_, colIndex) => {
                    let char = '';
                    let statusClasses = 'border-2 border-neutral-200 text-neutral-800 bg-white';

                    if (rowIndex < guesses.length) {
                      char = guess[colIndex] || '';
                      statusClasses = getTileStatus(char, colIndex, guess);
                    } else if (isCurrentRow) {
                      char = currentGuess[colIndex] || '';
                      if (char) {
                        statusClasses = 'border-2 border-neutral-700 text-neutral-900 bg-white scale-105';
                      }
                    }

                    return (
                      <div
                        key={colIndex}
                        className={`aspect-square flex items-center justify-center font-bold text-xl uppercase transition-all duration-200 ${statusClasses}`}
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
            <div className="mt-4 p-3 bg-stone-100 rounded text-center w-full max-w-xs">
              <div className="flex items-center justify-center gap-1.5 font-bold text-sm mb-1">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>{hasWon ? 'Splendid!' : 'Next time!'}</span>
              </div>
              <p className="text-xs text-neutral-600">
                The word was <strong className="text-black font-serif">{solution}</strong>.
              </p>
              <button
                onClick={resetGame}
                className="mt-2 text-xs bg-black text-white font-bold py-1.5 px-3 rounded hover:bg-neutral-800 transition-colors"
              >
                Play Again
              </button>
            </div>
          )}
        </div>

        {/* On-Screen Keyboard */}
        <div className="p-2 border-t border-neutral-200 bg-neutral-50">
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
                      className={`h-11 rounded text-xs font-bold transition-colors select-none ${
                        isSpecial ? 'px-2.5 text-[10px]' : 'flex-1 min-w-[28px]'
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
