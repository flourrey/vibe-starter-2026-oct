import React, { useState } from 'react';
import { X, User, Check, LogOut } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 font-nyt-sans">
      <div className="bg-white max-w-sm w-full rounded-md shadow-2xl border border-neutral-300 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-nyt flex items-center justify-between bg-[#fbf9f5]">
          <span className="font-masthead text-xl text-black">The New York Times</span>
          <button
            onClick={onClose}
            className="p-1 text-neutral-500 hover:text-black rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {currentUser ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 font-bold">
                  {currentUser.email.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-sm text-neutral-900">{currentUser.email}</div>
                  <div className="text-xs text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>{currentUser.isSubscribed ? 'All-Access Subscriber' : 'Standard Member'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-nyt space-y-2 text-xs text-neutral-700">
                <div className="flex justify-between py-1">
                  <span>Edition</span>
                  <span className="font-semibold text-black">U.S. Edition</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Delivery Method</span>
                  <span className="font-semibold text-black">Digital Portal</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full mt-4 py-2 border border-neutral-300 text-neutral-700 hover:text-black hover:border-black font-semibold text-xs rounded transition-colors flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="font-headline font-bold text-xl text-neutral-900">
                  Log in to your NYTimes account
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Enter your email to sign in or create an account.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="yeohjoern@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-2.5 border border-neutral-300 rounded focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Continue with Email
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
