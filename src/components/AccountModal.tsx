import React, { useState } from 'react';
import { X, User, Check, LogOut, ShieldCheck } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: { email: string; isSubscribed: boolean } | null;
  onLogin: (email: string) => void;
  onLogout: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onLogin(email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 font-nyt-sans">
      <div className="bg-white max-w-sm w-full rounded-3xl shadow-2xl border border-black/10 overflow-hidden">
        {/* Apple Style Header */}
        <div className="p-5 border-b border-black/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-masthead text-lg text-black">The New York Times</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/[0.05] hover:bg-black/[0.09] flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {currentUser ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-neutral-800 to-black text-white flex items-center justify-center text-base font-bold shadow-xs">
                  {currentUser.email.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <div className="font-apple-display font-bold text-sm text-neutral-900 truncate max-w-[180px]">
                    {currentUser.email}
                  </div>
                  <div className="text-xs text-[#0071e3] font-medium flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{currentUser.isSubscribed ? 'Apple News+ Active' : 'Standard Member'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-black/[0.06] space-y-2 text-xs text-neutral-600 font-nyt-sans">
                <div className="flex justify-between py-1">
                  <span>Region & Edition</span>
                  <span className="font-semibold text-neutral-900">U.S. Edition</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Device Sync</span>
                  <span className="font-semibold text-emerald-700">iCloud Synced</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full mt-4 py-2.5 rounded-full border border-black/10 hover:bg-black/[0.04] text-neutral-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="font-apple-display font-bold text-xl text-neutral-900 tracking-tight">
                  Sign in with Apple ID
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Access your reading history, preferences, and saved articles.
                </p>
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="name@icloud.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-black/10 bg-[#f5f5f7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/40"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1d1d1f] hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-colors cursor-pointer"
              >
                Continue with Apple
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
