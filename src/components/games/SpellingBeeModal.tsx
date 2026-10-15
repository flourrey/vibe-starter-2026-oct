import React, { useState } from 'react';
import { X, RotateCcw, Shuffle, Delete, Award } from 'lucide-react';
import { SPELLING_BEE_DATA } from '../../data/gamesData';

interface SpellingBeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpellingBeeModal: React.FC<SpellingBeeModalProps> = ({ isOpen, onClose }) => {
  const { centerLetter, outerLetters: initialOuter, validWords, pangram } = SPELLING_BEE_DATA;
  const [outerLetters, setOuterLetters] = useState<string[]>(initialOuter);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2200);
  };

  const handleShuffle = () => {
    setOuterLetters([...outerLetters].sort(() => Math.random() - 0.5));
  };

  const handleAddLetter = (letter: string) => {
    setCurrentInput((prev) => prev + letter);
  };

  const handleDelete = () => {
    setCurrentInput((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    const word = currentInput.toUpperCase();
    if (word.length < 4) {
      showToast('Too short (minimum 4 letters)');
      return;
    }
    if (!word.includes(centerLetter)) {
      showToast(`Missing center letter (${centerLetter})`);
      return;
    }
    if (foundWords.includes(word)) {
      showToast('Already found');
      return;
    }

    if (validWords.includes(word)) {
      let points = word.length === 4 ? 1 : word.length;
      if (word === pangram) {
        points += 7; // Pangram bonus!
        showToast('PANGRAM! +14 points!');
      } else {
        showToast(`Nice! +${points} points`);
      }

      setFoundWords([word, ...foundWords]);
      setScore((prev) => prev + points);
      setCurrentInput('');
    } else {
      showToast('Not in word list');
    }
  };

  const getRank = (pts: number) => {
    if (pts >= 40) return 'Genius';
    if (pts >= 25) return 'Amazing';
    if (pts >= 15) return 'Great';
    if (pts >= 8) return 'Nice';
    if (pts >= 4) return 'Solid';
    if (pts >= 1) return 'Good';
    return 'Beginner';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white max-w-lg w-full rounded-md shadow-2xl border border-neutral-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-nyt bg-[#fbf9f5]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-amber-400 text-amber-950 text-xs font-bold rounded-full flex items-center justify-center">
              ⬢
            </span>
            <h3 className="font-serif font-black text-lg tracking-tight">Spelling Bee</h3>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {getRank(score)} ({score} pts)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-600 hover:text-black rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Toast */}
        {message && (
          <div className="bg-black text-white text-xs font-nyt-sans font-bold px-4 py-2 mx-auto mt-2 rounded shadow-lg text-center animate-bounce">
            {message}
          </div>
        )}

        <div className="p-5 flex-1 flex flex-col md:flex-row gap-5 overflow-y-auto items-center md:items-start justify-between">
          {/* Hexagon Pad Section */}
          <div className="flex flex-col items-center w-full max-w-xs">
            {/* Input display */}
            <div className="h-10 text-center font-sans font-bold text-2xl tracking-widest uppercase mb-4 flex items-center justify-center">
              {currentInput.split('').map((char, i) => (
                <span
                  key={i}
                  className={char === centerLetter ? 'text-amber-500 font-black' : 'text-neutral-800'}
                >
                  {char}
                </span>
              ))}
              <span className="animate-pulse text-amber-500 font-normal">|</span>
            </div>

            {/* Honeycomb visual cluster */}
            <div className="relative w-56 h-56 flex items-center justify-center my-2 select-none">
              {/* Center Letter Button */}
              <button
                onClick={() => handleAddLetter(centerLetter)}
                className="absolute z-10 w-16 h-16 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-2xl rounded-full shadow-md flex items-center justify-center transition-transform active:scale-95"
              >
                {centerLetter}
              </button>

              {/* 6 Surrounding Outer Letter Buttons */}
              {outerLetters.map((letter, idx) => {
                const angle = (idx * 60 - 30) * (Math.PI / 180);
                const radius = 68; // distance from center
                const x = Math.round(radius * Math.cos(angle));
                const y = Math.round(radius * Math.sin(angle));

                return (
                  <button
                    key={letter}
                    onClick={() => handleAddLetter(letter)}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className="absolute w-14 h-14 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xl rounded-full shadow-xs flex items-center justify-center transition-all active:scale-95 border border-neutral-200"
                  >
                    {letter}
                  </button>
                );
              })}
            </div>

            {/* Honeycomb Controls */}
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={handleDelete}
                className="px-3.5 py-1.5 border border-neutral-300 rounded-full text-xs font-semibold hover:bg-neutral-100 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={handleShuffle}
                className="p-2 border border-neutral-300 rounded-full hover:bg-neutral-100 transition-colors"
                title="Shuffle"
              >
                <Shuffle className="w-4 h-4 text-neutral-700" />
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-1.5 bg-neutral-900 text-white rounded-full text-xs font-semibold hover:bg-neutral-800 transition-colors"
              >
                Enter
              </button>
            </div>
          </div>

          {/* Word List Pane */}
          <div className="w-full md:w-48 bg-stone-50 border border-nyt rounded p-3 text-xs font-nyt-sans">
            <div className="flex items-center justify-between pb-2 border-b border-nyt font-bold text-neutral-900">
              <span>Found Words ({foundWords.length})</span>
            </div>
            <div className="max-h-48 overflow-y-auto mt-2 space-y-1">
              {foundWords.length === 0 ? (
                <p className="text-neutral-400 italic text-center py-4">
                  Find words with at least 4 letters including the yellow letter.
                </p>
              ) : (
                foundWords.map((w) => (
                  <div key={w} className="flex justify-between uppercase font-medium text-neutral-700">
                    <span>{w}</span>
                    <span className="text-neutral-400 font-mono">
                      {w === pangram ? '14' : w.length === 4 ? '1' : w.length}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
