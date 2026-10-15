import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

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
  const [baudRate, setBaudRate] = useState('28800');

  if (!isOpen) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsDone(true);
    setTimeout(() => {
      onSuccessSubscribe();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-sans select-none">
      <div className="win95-raised max-w-md w-full shadow-2xl p-1 flex flex-col">
        {/* Title Bar */}
        <div className="win95-titlebar mb-1">
          <span>Dial-Up Networking Wizard - [NYTimes On The Web]</span>
          <button
            onClick={onClose}
            className="win95-btn w-4 h-4 flex items-center justify-center font-mono text-[9px] font-bold p-0 leading-none text-black"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 bg-[#c0c0c0] text-xs space-y-3">
          {isDone ? (
            <div className="bg-white p-4 border border-black text-center space-y-2">
              <div className="font-pixel text-2xl text-green-700 font-bold">
                *** CARRIER DETECTED: 28,800 BPS ***
              </div>
              <p className="font-typewriter text-xs text-black">
                Handshake successful! Your NYTimes Dial-Up Subscription is now ACTIVE.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="bg-white p-3 border border-black space-y-1">
                <b className="font-typewriter text-xs text-[#000080] block">
                  SELECT DIAL-UP SUBSCRIPTION PACKAGE:
                </b>
                <div className="space-y-1 pt-1 font-typewriter">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="plan"
                      checked={selectedPlan === 'basic'}
                      onChange={() => setSelectedPlan('basic')}
                    />
                    <span>Standard Access ($1.00/wk) · Unlimited Front Page & Archive</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-[#000080]">
                    <input
                      type="radio"
                      name="plan"
                      checked={selectedPlan === 'all-access'}
                      onChange={() => setSelectedPlan('all-access')}
                    />
                    <span>All-Access Power Plan ($2.00/wk) · News + Puzzles + RealAudio</span>
                  </label>
                </div>
              </div>

              {/* Modem Configuration */}
              <div className="space-y-1">
                <label className="font-bold block">User Account (E-mail):</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. reader@pipeline.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="win95-sunken w-full p-1.5 font-typewriter text-xs bg-white text-black"
                />
              </div>

              <div className="flex justify-between items-center text-[11px] text-gray-700">
                <span>Modem Port: COM2 (USRobotics Sportster 28.8k)</span>
                <span className="font-mono text-green-800">STATUS: READY</span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
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
                  [Connect & Dial]
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
