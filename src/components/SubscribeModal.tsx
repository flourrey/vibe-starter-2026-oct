import React, { useState } from 'react';
import { X, Check, Sparkles } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubscribe: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  onClose,
  onSuccessSubscribe,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'all-access'>('all-access');
  const [email, setEmail] = useState('');
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsDone(true);
    setTimeout(() => {
      onSuccessSubscribe();
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 font-nyt-sans">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl border border-black/10 overflow-hidden">
        {/* Apple Style Header */}
        <div className="p-6 text-center bg-gradient-to-b from-[#f5f5f7] to-white relative pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/[0.05] hover:bg-black/[0.09] flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0071e3] to-[#42a5f5] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="font-masthead text-2xl text-black block">The New York Times</span>
          <h3 className="font-apple-display text-2xl font-extrabold text-[#1d1d1f] tracking-tight mt-1">
            Reimagined for Apple News+
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Unlimited access to world-class journalism, deep analysis, and daily brain puzzles.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 pt-2">
          {isDone ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="font-apple-display font-bold text-xl text-neutral-900">
                Subscription Activated
              </h4>
              <p className="text-xs text-neutral-500">
                Your account is ready. Welcome to complete Apple News+ coverage.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4">
              {/* Apple Segmented Plan Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setSelectedPlan('basic')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedPlan === 'basic'
                      ? 'border-[#0071e3] bg-[#0071e3]/5 shadow-xs ring-1 ring-[#0071e3]'
                      : 'border-black/[0.08] bg-[#f5f5f7] hover:bg-neutral-100'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                    Basic Digital
                  </span>
                  <div className="font-apple-display text-2xl font-black mt-1 text-[#1d1d1f]">
                    $1<span className="text-xs font-normal text-neutral-500">/wk</span>
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-0.5 block">News & Podcasts</span>
                </div>

                <div
                  onClick={() => setSelectedPlan('all-access')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all relative ${
                    selectedPlan === 'all-access'
                      ? 'border-[#0071e3] bg-[#0071e3]/5 shadow-xs ring-1 ring-[#0071e3]'
                      : 'border-black/[0.08] bg-[#f5f5f7] hover:bg-neutral-100'
                  }`}
                >
                  <div className="absolute -top-2 right-3 bg-[#0071e3] text-white text-[9px] uppercase px-2 py-0.5 rounded-full font-bold tracking-wider">
                    Apple Pick
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0071e3] block">
                    All Access
                  </span>
                  <div className="font-apple-display text-2xl font-black mt-1 text-[#1d1d1f]">
                    $2<span className="text-xs font-normal text-neutral-500">/wk</span>
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-0.5 block">Full News + Puzzles</span>
                </div>
              </div>

              {/* Feature Checkmarks */}
              <div className="space-y-2 text-xs text-neutral-700 pt-1">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0071e3] shrink-0" />
                  <span>Unlimited stories across iPhone, iPad, Mac, and Web</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0071e3] shrink-0" />
                  <span>Curated audio editions and narrator voice journalism</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0071e3] shrink-0" />
                  <span>Interactive Wordle, Connections, The Mini, and Spelling Bee</span>
                </div>
              </div>

              <div className="pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your Apple ID email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-black/10 bg-[#f5f5f7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/40"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-all cursor-pointer"
              >
                Subscribe with Apple ID
              </button>

              <p className="text-[10px] text-neutral-400 text-center">
                One-tap cancel via Account Settings. Renews at standard terms.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
