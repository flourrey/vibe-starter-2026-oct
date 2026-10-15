import React, { useState } from 'react';
import { X, Shuffle, Award } from 'lucide-react';
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
        points += 7;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div className="bg-white/95 backdrop-blur-2xl max-w-lg w-full rounded-3xl shadow-2xl border border-black/10 overflow-hidden flex flex-col max-h-[92vh] font-nyt-sans">
        {/* Apple Style Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 bg-amber-400 text-amber-950 text-xs font-bold rounded-xl flex items-center justify-center shadow-xs">
              ⬢
            </span>
            <div>
              <h3 className="font-apple-display font-extrabold text-lg tracking-tight text-[#1d1d1f]">
                Spelling Bee
              </h3>
              <span className="text-[10px] text-neutral-400 font-medium">Hive Anagrams</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-900 bg-amber-100/70 px-3 py-1 rounded-full">
              {getRank(score)} ({score} pts)
            </span>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-black/[0.05] hover:bg-black/[0.09] flex items-center justify-center text-neutral-600 transition-colors"
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

        <div className="p-6 flex-1 flex flex-col md:flex-row gap-6 overflow-y-auto items-center md:items-start justify-between">
          {/* Honeycomb pad */}
          <div className="flex flex-col items-center w-full max-w-xs">
            {/* Input display */}
            <div className="h-10 text-center font-apple-display font-extrabold text-2xl tracking-widest uppercase mb-4 flex items-center justify-center">
              {currentInput.split('').map((char, i) => (
                <span
                  key={i}
                  className={char === centerLetter ? 'text-amber-500 font-black' : 'text-neutral-900'}
                >
                  {char}
                </span>
              ))}
              <span className="animate-pulse text-[#0071e3] font-normal">|</span>
            </div>

            {/* Honeycomb visual cluster */}
            <div className="relative w-56 h-56 flex items-center justify-center my-2 select-none">
              <button
                onClick={() => handleAddLetter(centerLetter)}
                className="absolute z-10 w-16 h-16 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-2xl rounded-full shadow-md flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
              >
                {centerLetter}
              </button>

              {outerLetters.map((letter, idx) => {
                const angle = (idx * 60 - 30) * (Math.PI / 180);
                const radius = 68;
                const x = Math.round(radius * Math.cos(angle));
                const y = Math.round(radius * Math.sin(angle));

                return (
                  <button
                    key={letter}
                    onClick={() => handleAddLetter(letter)}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className="absolute w-14 h-14 bg-[#f5f5f7] hover:bg-neutral-200 text-neutral-800 font-bold text-xl rounded-full shadow-xs flex items-center justify-center transition-all active:scale-95 border border-black/[0.04] cursor-pointer"
                  >
                    {letter}
                  </button>
                );
              })}
            </div>

            {/* Controls in Apple Pills */}
            <div className="flex items-center gap-2 mt-5">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-[#f5f5f7] hover:bg-black/[0.08] rounded-full text-xs font-semibold text-neutral-800 transition-colors cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={handleShuffle}
                className="p-2.5 bg-[#f5f5f7] hover:bg-black/[0.08] rounded-full text-neutral-700 transition-colors cursor-pointer"
                title="Shuffle"
              >
                <Shuffle className="w-4 h-4" />
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Enter
              </button>
            </div>
          </div>

          {/* Word List Pane */}
          <div className="w-full md:w-48 bg-[#f5f5f7]/80 border border-black/[0.04] rounded-2xl p-4 text-xs font-nyt-sans">
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06] font-bold text-neutral-900">
              <span>Found ({foundWords.length})</span>
            </div>
            <div className="max-h-48 overflow-y-auto mt-2 space-y-1">
              {foundWords.length === 0 ? (
                <p className="text-neutral-400 italic text-center py-4">
                  Words must be $\ge$ 4 letters and include center letter.
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
