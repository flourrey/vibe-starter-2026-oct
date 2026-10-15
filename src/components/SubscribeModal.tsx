import React, { useState } from 'react';
import { X, Check, Star, ShieldCheck } from 'lucide-react';

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
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 font-nyt-sans">
      <div className="bg-white max-w-md w-full rounded-md shadow-2xl border border-neutral-300 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-nyt text-center bg-[#fbf9f5] relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-neutral-500 hover:text-black rounded"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="font-masthead text-2xl text-black block mb-1">The New York Times</span>
          <h3 className="font-headline text-2xl font-bold text-neutral-900 leading-tight">
            Independent journalism worth supporting.
          </h3>
          <p className="text-xs text-neutral-600 mt-1">
            Unlimited access to all reporting, investigations, and interactive puzzles.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isDone ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="font-serif font-bold text-xl text-neutral-900">
                Welcome to The New York Times!
              </h4>
              <p className="text-xs text-neutral-600">
                Your subscription has been activated. Enjoy unlimited broadsheet access.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4">
              {/* Plan Choice */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setSelectedPlan('basic')}
                  className={`p-3 border rounded cursor-pointer transition-all ${
                    selectedPlan === 'basic'
                      ? 'border-black bg-stone-50'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                    Basic Digital
                  </span>
                  <div className="font-serif text-xl font-black mt-1">$1<span className="text-xs font-normal">/wk</span></div>
                  <span className="text-[10px] text-neutral-500">News & Podcasts</span>
                </div>

                <div
                  onClick={() => setSelectedPlan('all-access')}
                  className={`p-3 border rounded cursor-pointer transition-all relative ${
                    selectedPlan === 'all-access'
                      ? 'border-black bg-stone-50 ring-1 ring-black'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="absolute -top-2 right-2 bg-black text-white text-[9px] uppercase px-1.5 py-0.5 rounded font-bold tracking-wider">
                    Best Value
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 block">
                    All Access
                  </span>
                  <div className="font-serif text-xl font-black mt-1">$2<span className="text-xs font-normal">/wk</span></div>
                  <span className="text-[10px] text-neutral-500">News, Games, Cooking & Wirecutter</span>
                </div>
              </div>

              {/* Benefits */}
              <ul className="text-xs space-y-1.5 text-neutral-700 pt-1">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Unlimited access to The New York Times across all devices</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Subscriber-exclusive newsletters and Audio journalism</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Full access to Wordle, Spelling Bee, and The Mini Crossword</span>
                </li>
              </ul>

              <div className="pt-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Enter your email to activate:
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#567b95] hover:bg-[#326891] text-white font-bold uppercase tracking-wider text-xs rounded transition-colors"
              >
                Subscribe Now
              </button>

              <p className="text-[10px] text-neutral-400 text-center">
                Cancel anytime. Renews automatically at standard introductory terms.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
