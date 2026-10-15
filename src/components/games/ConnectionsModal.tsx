import React, { useState, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';
import { CONNECTIONS_DATA, ConnectionsGroup } from '../../data/gamesData';

interface ConnectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectionsModal: React.FC<ConnectionsModalProps> = ({ isOpen, onClose }) => {
  const allInitialWords = useMemo(() => {
    return CONNECTIONS_DATA.flatMap((g) => g.words).sort(() => Math.random() - 0.5);
  }, []);

  const [words, setWords] = useState<string[]>(allInitialWords);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [solvedGroups, setSolvedGroups] = useState<ConnectionsGroup[]>([]);
  const [mistakesRemaining, setMistakesRemaining] = useState<number>(4);
  const [message, setMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2500);
  };

  const toggleSelectWord = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else {
      if (selectedWords.length >= 4) return;
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleShuffle = () => {
    setWords([...words].sort(() => Math.random() - 0.5));
  };

  const handleDeselectAll = () => {
    setSelectedWords([]);
  };

  const handleSubmit = () => {
    if (selectedWords.length !== 4) {
      showToast('Select 4 cards to submit');
      return;
    }

    const matchedGroup = CONNECTIONS_DATA.find((group) => {
      return (
        !solvedGroups.some((sg) => sg.category === group.category) &&
        group.words.every((w) => selectedWords.includes(w))
      );
    });

    if (matchedGroup) {
      const nextSolved = [...solvedGroups, matchedGroup];
      setSolvedGroups(nextSolved);
      setWords((prev) => prev.filter((w) => !selectedWords.includes(w)));
      setSelectedWords([]);
      showToast(`SOLVED: [${matchedGroup.category}]`);
    } else {
      const nextMistakes = mistakesRemaining - 1;
      setMistakesRemaining(nextMistakes);
      showToast('Incorrect combination');
      if (nextMistakes <= 0) {
        showToast('GAME OVER: Out of attempts');
      }
    }
  };

  const resetGame = () => {
    setWords(allInitialWords);
    setSelectedWords([]);
    setSolvedGroups([]);
    setMistakesRemaining(4);
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-sans select-none">
      <div className="win95-raised max-w-lg w-full shadow-2xl p-1 flex flex-col">
        {/* Title Bar */}
        <div className="win95-titlebar mb-1">
          <span>CONNECT.EXE - [Category Matrix v1.0]</span>
          <div className="flex items-center gap-1">
            <button
              onClick={resetGame}
              className="win95-btn px-1 text-[9px] font-bold text-black"
            >
              [New Game]
            </button>
            <button
              onClick={onClose}
              className="win95-btn w-4 h-4 flex items-center justify-center font-mono text-[9px] font-bold p-0 leading-none text-black"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Toast */}
        {message && (
          <div className="bg-yellow-100 border border-black text-black text-xs font-typewriter font-bold px-3 py-1 m-2 text-center">
            {message}
          </div>
        )}

        <div className="p-3 bg-[#c0c0c0] flex-1">
          {/* Solved Groups in Sunken Boxes */}
          <div className="space-y-1.5 mb-2">
            {solvedGroups.map((group) => (
              <div
                key={group.category}
                className="win95-sunken p-2 text-center bg-gray-100 font-typewriter text-xs text-black border border-black"
              >
                <b>[{group.category}]</b>: {group.words.join(', ')}
              </div>
            ))}
          </div>

          {/* Cards Grid */}
          {words.length > 0 ? (
            <div className="grid grid-cols-4 gap-1.5">
              {words.map((word) => {
                const isSelected = selectedWords.includes(word);
                return (
                  <button
                    key={word}
                    onClick={() => toggleSelectWord(word)}
                    className={`aspect-4/3 text-[11px] font-mono font-bold uppercase p-1.5 flex items-center justify-center text-center ${
                      isSelected
                        ? 'win95-sunken bg-[#000080] text-yellow-300 font-black'
                        : 'win95-btn text-black'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-4 text-center bg-white border border-black font-typewriter text-xs">
              *** CONGRATULATIONS! ALL 4 MATRIX CATEGORIES RESOLVED! ***
            </div>
          )}

          {/* Mistakes and Actions */}
          <div className="mt-3 flex items-center justify-between text-xs font-typewriter">
            <div>
              <b>Chances Left:</b> {'● '.repeat(mistakesRemaining)}
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={handleShuffle}
                className="win95-btn px-2 py-0.5 text-xs font-bold"
              >
                Shuffle
              </button>
              <button
                onClick={handleDeselectAll}
                className="win95-btn px-2 py-0.5 text-xs"
              >
                Clear
              </button>
              <button
                onClick={handleSubmit}
                disabled={selectedWords.length !== 4 || mistakesRemaining <= 0}
                className="win95-btn px-3 py-0.5 text-xs font-bold text-[#000080] disabled:opacity-50"
              >
                [Submit]
              </button>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="win95-sunken px-2 py-0.5 text-[10px] font-typewriter text-black bg-[#c0c0c0] flex justify-between">
          <span>Selected: {selectedWords.length}/4</span>
          <span>Engine: Winsock Solitaire Host</span>
        </div>
      </div>
    </div>
  );
};
