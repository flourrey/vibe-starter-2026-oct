import React, { useState } from 'react';
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
      showToast('Error: Minimum 4 letters required');
      return;
    }
    if (!word.includes(centerLetter)) {
      showToast(`Error: Center letter (${centerLetter}) missing`);
      return;
    }
    if (foundWords.includes(word)) {
      showToast('Word already discovered');
      return;
    }

    if (validWords.includes(word)) {
      let points = word.length === 4 ? 1 : word.length;
      if (word === pangram) {
        points += 7;
        showToast('*** PANGRAM! +14 PTS! ***');
      } else {
        showToast(`VALID WORD: +${points} pts`);
      }

      setFoundWords([word, ...foundWords]);
      setScore((prev) => prev + points);
      setCurrentInput('');
    } else {
      showToast('Not in dictionary');
    }
  };

  const getRank = (pts: number) => {
    if (pts >= 40) return 'GENIUS';
    if (pts >= 25) return 'AMAZING';
    if (pts >= 15) return 'GREAT';
    if (pts >= 8) return 'NICE';
    if (pts >= 4) return 'SOLID';
    if (pts >= 1) return 'GOOD';
    return 'BEGINNER';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-sans select-none">
      <div className="win95-raised max-w-lg w-full shadow-2xl p-1 flex flex-col">
        {/* Title Bar */}
        <div className="win95-titlebar mb-1">
          <span>SPELL_BEE.COM - [Honeycomb Anagram Engine v2.1]</span>
          <button
            onClick={onClose}
            className="win95-btn w-4 h-4 flex items-center justify-center font-mono text-[9px] font-bold p-0 leading-none text-black"
          >
            ✕
          </button>
        </div>

        {/* Toast */}
        {message && (
          <div className="bg-yellow-100 border border-black text-black text-xs font-typewriter font-bold px-3 py-1 m-2 text-center">
            {message}
          </div>
        )}

        <div className="p-3 bg-[#c0c0c0] flex flex-col md:flex-row gap-4 items-center md:items-start justify-between">
          {/* Honeycomb pad */}
          <div className="flex flex-col items-center w-full max-w-xs">
            {/* Input terminal */}
            <div className="win95-sunken w-full h-9 bg-black text-green-400 font-pixel text-2xl flex items-center justify-center tracking-widest mb-3">
              {currentInput || '_'}
            </div>

            {/* Honeycomb visual cluster */}
            <div className="relative w-48 h-48 flex items-center justify-center my-2">
              <button
                onClick={() => handleAddLetter(centerLetter)}
                className="absolute z-10 w-14 h-14 win95-btn bg-yellow-300 font-black text-2xl text-black border-2 border-black flex items-center justify-center"
              >
                {centerLetter}
              </button>

              {outerLetters.map((letter, idx) => {
                const angle = (idx * 60 - 30) * (Math.PI / 180);
                const radius = 58;
                const x = Math.round(radius * Math.cos(angle));
                const y = Math.round(radius * Math.sin(angle));

                return (
                  <button
                    key={letter}
                    onClick={() => handleAddLetter(letter)}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className="absolute w-12 h-12 win95-btn font-bold text-xl text-black flex items-center justify-center"
                  >
                    {letter}
                  </button>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1.5 mt-3">
              <button
                onClick={handleDelete}
                className="win95-btn px-3 py-1 text-xs font-bold"
              >
                Delete
              </button>
              <button
                onClick={handleShuffle}
                className="win95-btn px-3 py-1 text-xs font-bold"
              >
                Shuffle
              </button>
              <button
                onClick={handleSubmit}
                className="win95-btn px-4 py-1 text-xs font-bold text-[#000080]"
              >
                [Enter]
              </button>
            </div>
          </div>

          {/* Found Words List */}
          <div className="w-full md:w-48 bg-white border border-black p-2 text-xs font-typewriter">
            <div className="flex items-center justify-between pb-1 border-b border-black font-bold">
              <span>FOUND ({foundWords.length})</span>
              <span className="text-[#000080]">{score} PTS</span>
            </div>
            <div className="max-h-48 overflow-y-auto mt-1 space-y-0.5">
              {foundWords.length === 0 ? (
                <div className="text-gray-400 italic text-[10px] text-center py-4">
                  Type words containing yellow letter [{centerLetter}]
                </div>
              ) : (
                foundWords.map((w) => (
                  <div key={w} className="flex justify-between font-mono text-[11px]">
                    <span>{w}</span>
                    <span>{w === pangram ? '14' : w.length === 4 ? '1' : w.length}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="win95-sunken px-2 py-0.5 text-[10px] font-typewriter text-black bg-[#c0c0c0] flex justify-between">
          <span>Rank: [{getRank(score)}]</span>
          <span>Center Key: [{centerLetter}]</span>
        </div>
      </div>
    </div>
  );
};
