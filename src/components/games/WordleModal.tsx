import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';
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
      showToast('Error: Word must be 5 characters');
      return;
    }

    const nextGuesses = [...guesses, currentGuess];
    setGuesses(nextGuesses);
    setCurrentGuess('');

    if (currentGuess === solution) {
      setIsGameOver(true);
      setHasWon(true);
      showToast('SUCCESS! Target word resolved!');
    } else if (nextGuesses.length >= 6) {
      setIsGameOver(true);
      setHasWon(false);
      showToast(`FAILED: Solution was ${solution}`);
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
    if (guess[index] === solution[index]) return 'bg-[#008000] text-white border-2 border-black font-bold';
    if (solution.includes(char)) return 'bg-[#808000] text-white border-2 border-black font-bold';
    return 'bg-[#404040] text-white border-2 border-black font-bold';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-sans select-none">
      <div className="win95-raised max-w-md w-full shadow-2xl p-1 flex flex-col">
        {/* Title Bar */}
        <div className="win95-titlebar mb-1">
          <span>WORDLE.EXE - [16-Bit Word Guess Game]</span>
          <div className="flex items-center gap-1">
            <button
              onClick={resetGame}
              className="win95-btn px-1 text-[9px] font-bold text-black"
            >
              [Restart]
            </button>
            <button
              onClick={onClose}
              className="win95-btn w-4 h-4 flex items-center justify-center font-mono text-[9px] font-bold p-0 leading-none text-black"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Menu Strip */}
        <div className="bg-[#c0c0c0] px-2 py-0.5 border-b border-[#808080] text-xs flex gap-3 text-black">
          <span className="hover:underline cursor-pointer">Game</span>
          <span className="hover:underline cursor-pointer">Dictionary</span>
          <span className="hover:underline cursor-pointer">Help</span>
        </div>

        {/* Toast / Message Box */}
        {message && (
          <div className="bg-yellow-100 border border-black text-black text-xs font-typewriter font-bold px-3 py-1 m-2 text-center">
            {message}
          </div>
        )}

        {/* Game Grid in Sunken Frame */}
        <div className="p-3 bg-[#c0c0c0] flex flex-col items-center">
          <div className="win95-sunken p-3 bg-[#000000] w-64">
            <div className="grid grid-rows-6 gap-1.5">
              {Array.from({ length: 6 }).map((_, rowIndex) => {
                const isCurrentRow = rowIndex === guesses.length;
                const guess = guesses[rowIndex] || '';
                return (
                  <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
                    {Array.from({ length: 5 }).map((_, colIndex) => {
                      let char = '';
                      let statusClasses = 'border border-gray-600 text-green-400 bg-black font-pixel text-2xl';

                      if (rowIndex < guesses.length) {
                        char = guess[colIndex] || '';
                        statusClasses = getTileStatus(char, colIndex, guess) + ' font-pixel text-2xl';
                      } else if (isCurrentRow) {
                        char = currentGuess[colIndex] || '';
                        if (char) {
                          statusClasses = 'border-2 border-yellow-400 text-yellow-300 bg-black font-pixel text-2xl';
                        }
                      }

                      return (
                        <div
                          key={colIndex}
                          className={`aspect-square flex items-center justify-center uppercase select-none ${statusClasses}`}
                        >
                          {char}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Keyboard in 90s Bevel Buttons */}
        <div className="p-2 bg-[#c0c0c0] border-t border-[#808080]">
          <div className="flex flex-col gap-1 max-w-sm mx-auto">
            {keys.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-1">
                {row.map((k) => (
                  <button
                    key={k}
                    onClick={() => {
                      if (k === 'ENTER') handleEnter();
                      else if (k === 'DEL') handleDelete();
                      else handleCharInput(k);
                    }}
                    className={`win95-btn h-8 font-mono font-bold text-xs ${
                      k === 'ENTER' || k === 'DEL' ? 'px-2 text-[10px]' : 'flex-1 min-w-[24px]'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div className="win95-sunken px-2 py-0.5 text-[10px] font-typewriter text-black bg-[#c0c0c0] flex justify-between">
          <span>Tries: {guesses.length}/6</span>
          <span>Status: {isGameOver ? (hasWon ? 'SOLVED' : 'GAME OVER') : 'IN PROGRESS'}</span>
        </div>
      </div>
    </div>
  );
};
