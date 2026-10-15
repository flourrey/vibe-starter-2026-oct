import React, { useState, useMemo } from 'react';
import { X, RotateCcw, Shuffle } from 'lucide-react';
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
  const [shake, setShake] = useState<boolean>(false);

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
      showToast('Select 4 words to submit');
      return;
    }

    // Check if selectedWords match any group exactly
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
      showToast(`Correct! Category: ${matchedGroup.category}`);
    } else {
      // Check if "One away"
      let oneAway = false;
      for (const group of CONNECTIONS_DATA) {
        if (!solvedGroups.some((sg) => sg.category === group.category)) {
          const matchCount = selectedWords.filter((w) => group.words.includes(w)).length;
          if (matchCount === 3) {
            oneAway = true;
            break;
          }
        }
      }

      setShake(true);
      setTimeout(() => setShake(false), 500);

      const nextMistakes = mistakesRemaining - 1;
      setMistakesRemaining(nextMistakes);

      if (oneAway) {
        showToast('One away...');
      } else {
        showToast('Incorrect group');
      }

      if (nextMistakes <= 0) {
        showToast('Game over! Better luck tomorrow!');
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

  const getGroupColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-amber-200 border-amber-300 text-neutral-900';
      case 2:
        return 'bg-emerald-200 border-emerald-300 text-neutral-900';
      case 3:
        return 'bg-sky-200 border-sky-300 text-neutral-900';
      case 4:
        return 'bg-purple-200 border-purple-300 text-neutral-900';
      default:
        return 'bg-neutral-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white max-w-lg w-full rounded-md shadow-2xl border border-neutral-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-nyt bg-[#fbf9f5]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-yellow-400 text-black text-xs font-bold rounded flex items-center justify-center">
              ✦
            </span>
            <h3 className="font-serif font-black text-lg tracking-tight">Connections</h3>
            <span className="text-xs text-neutral-500 font-nyt-sans">Create four groups of four!</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetGame}
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

        {/* Toast */}
        {message && (
          <div className="bg-black text-white text-xs font-nyt-sans font-bold px-4 py-2 mx-auto mt-2 rounded shadow-lg text-center animate-bounce">
            {message}
          </div>
        )}

        <div className="p-5 flex-1 flex flex-col justify-between overflow-y-auto">
          {/* Solved Groups */}
          <div className="space-y-2 mb-3">
            {solvedGroups.map((group) => (
              <div
                key={group.category}
                className={`p-3 rounded text-center border font-nyt-sans ${getGroupColor(
                  group.level
                )}`}
              >
                <div className="font-bold text-xs uppercase tracking-wider">{group.category}</div>
                <div className="text-xs mt-0.5 font-medium">{group.words.join(', ')}</div>
              </div>
            ))}
          </div>

          {/* Unsolved Words Grid */}
          {words.length > 0 ? (
            <div
              className={`grid grid-cols-4 gap-2 transition-transform ${
                shake ? 'translate-x-1 duration-75 text-red-500' : ''
              }`}
            >
              {words.map((word) => {
                const isSelected = selectedWords.includes(word);
                return (
                  <button
                    key={word}
                    onClick={() => toggleSelectWord(word)}
                    className={`aspect-4/3 rounded font-nyt-sans text-xs sm:text-sm font-bold uppercase p-2 flex items-center justify-center text-center transition-all ${
                      isSelected
                        ? 'bg-neutral-800 text-white scale-[0.98]'
                        : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center bg-emerald-50 rounded border border-emerald-200">
              <h4 className="font-serif font-bold text-lg text-emerald-900 mb-1">
                Outstanding!
              </h4>
              <p className="text-xs text-emerald-800">
                You solved all four Connections categories!
              </p>
            </div>
          )}

          {/* Mistakes remaining */}
          <div className="my-4 flex items-center justify-center gap-1.5 text-xs text-neutral-600 font-nyt-sans">
            <span>Mistakes remaining:</span>
            <div className="flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i < mistakesRemaining ? 'bg-neutral-800' : 'bg-neutral-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-2 pt-2 border-t border-nyt">
            <button
              onClick={handleShuffle}
              disabled={words.length === 0}
              className="px-3 py-1.5 border border-neutral-800 rounded-full text-xs font-semibold hover:bg-neutral-100 flex items-center gap-1 disabled:opacity-40"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Shuffle
            </button>
            <button
              onClick={handleDeselectAll}
              disabled={selectedWords.length === 0}
              className="px-3 py-1.5 border border-neutral-800 rounded-full text-xs font-semibold hover:bg-neutral-100 disabled:opacity-40"
            >
              Deselect All
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedWords.length !== 4 || mistakesRemaining <= 0}
              className="px-4 py-1.5 bg-neutral-900 text-white rounded-full text-xs font-semibold hover:bg-neutral-800 disabled:opacity-40 disabled:hover:bg-neutral-900"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
