import React, { useState } from 'react';
import { User, LogOut } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-sans select-none">
      <div className="win95-raised max-w-sm w-full shadow-2xl p-1 flex flex-col">
        {/* Title Bar */}
        <div className="win95-titlebar mb-1">
          <span>Windows 95 Logon - [NYTimes Account Manager]</span>
          <button
            onClick={onClose}
            className="win95-btn w-4 h-4 flex items-center justify-center font-mono text-[9px] font-bold p-0 leading-none text-black"
          >
            ✕
          </button>
        </div>

        <div className="p-4 bg-[#c0c0c0] text-xs">
          {currentUser ? (
            <div className="space-y-3">
              <div className="bg-white p-3 border border-black space-y-1 font-typewriter">
                <div className="font-bold text-black text-sm">AUTHENTICATED USER:</div>
                <div className="text-[#000080] font-bold">{currentUser.email}</div>
                <div className="text-green-800 text-[11px]">
                  Connection: {currentUser.isSubscribed ? 'Unlimited Paid Account' : 'Guest Account'}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-gray-700">
                <span>Network Protocol: TCP/IP Winsock</span>
                <span>Port 80 HTTP</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="win95-btn px-3 py-1 font-bold text-red-900"
                >
                  [Log Off Network]
                </button>
                <button
                  onClick={onClose}
                  className="win95-btn px-4 py-1 font-bold"
                >
                  OK
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <b className="block mb-1">Type user identification to log on:</b>
                <span className="text-[11px] text-gray-700 block mb-2">
                  Enter your Internet address:
                </span>
                <input
                  type="email"
                  required
                  placeholder="e.g. user@prodigy.net"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="win95-sunken w-full p-1.5 font-typewriter text-xs bg-white text-black"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="win95-btn px-3 py-1 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="win95-btn px-4 py-1 font-bold text-[#000080]"
                >
                  [Log On]
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
