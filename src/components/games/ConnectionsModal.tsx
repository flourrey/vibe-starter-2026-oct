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
      showToast(`Group Solved: ${matchedGroup.category}`);
    } else {
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
        return 'bg-amber-100 border-amber-200 text-amber-950';
      case 2:
        return 'bg-emerald-100 border-emerald-200 text-emerald-950';
      case 3:
        return 'bg-sky-100 border-sky-200 text-sky-950';
      case 4:
        return 'bg-purple-100 border-purple-200 text-purple-950';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div className="bg-white/95 backdrop-blur-2xl max-w-lg w-full rounded-3xl shadow-2xl border border-black/10 overflow-hidden flex flex-col max-h-[92vh] font-nyt-sans">
        {/* Apple Style Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 bg-amber-400 text-amber-950 text-xs font-bold rounded-xl flex items-center justify-center shadow-xs">
              ✦
            </span>
            <div>
              <h3 className="font-apple-display font-extrabold text-lg tracking-tight text-[#1d1d1f]">
                Connections
              </h3>
              <span className="text-[10px] text-neutral-400 font-medium">Create 4 thematic groups</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={resetGame}
              title="Reset"
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

        {/* Toast */}
        {message && (
          <div className="bg-black/90 backdrop-blur-md text-white text-xs font-medium px-4 py-2 mx-auto mt-2 rounded-full shadow-lg text-center animate-bounce">
            {message}
          </div>
        )}

        <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto">
          {/* Solved Groups in Apple Squircles */}
          <div className="space-y-2.5 mb-3">
            {solvedGroups.map((group) => (
              <div
                key={group.category}
                className={`p-3.5 rounded-2xl text-center border font-nyt-sans shadow-xs ${getGroupColor(
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
              className={`grid grid-cols-4 gap-2.5 transition-transform ${
                shake ? 'translate-x-1 duration-75 text-red-500' : ''
              }`}
            >
              {words.map((word) => {
                const isSelected = selectedWords.includes(word);
                return (
                  <button
                    key={word}
                    onClick={() => toggleSelectWord(word)}
                    className={`aspect-4/3 rounded-2xl font-nyt-sans text-xs sm:text-sm font-bold uppercase p-2 flex items-center justify-center text-center transition-all cursor-pointer shadow-xs ${
                      isSelected
                        ? 'bg-[#1d1d1f] text-white scale-[0.98]'
                        : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-neutral-200'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center bg-emerald-50 rounded-2xl border border-emerald-100">
              <h4 className="font-apple-display font-bold text-lg text-emerald-900 mb-1">
                Outstanding!
              </h4>
              <p className="text-xs text-emerald-700">
                You solved all four Connections categories!
              </p>
            </div>
          )}

          {/* Mistakes remaining */}
          <div className="my-5 flex items-center justify-center gap-2 text-xs text-neutral-500 font-nyt-sans">
            <span>Mistakes remaining:</span>
            <div className="flex gap-1.5">
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

          {/* Action Buttons in Apple Pills */}
          <div className="flex items-center justify-center gap-2.5 pt-2">
            <button
              onClick={handleShuffle}
              disabled={words.length === 0}
              className="px-4 py-2 bg-[#f5f5f7] hover:bg-black/[0.08] rounded-full text-xs font-semibold flex items-center gap-1.5 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle</span>
            </button>
            <button
              onClick={handleDeselectAll}
              disabled={selectedWords.length === 0}
              className="px-4 py-2 bg-[#f5f5f7] hover:bg-black/[0.08] rounded-full text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
            >
              Deselect All
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedWords.length !== 4 || mistakesRemaining <= 0}
              className="px-5 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-bold shadow-xs disabled:opacity-40 disabled:hover:bg-[#0071e3] transition-all cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
