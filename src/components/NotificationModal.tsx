import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BellRing, CheckCircle2, X, Send, Sparkles, ShieldCheck } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [subCount, setSubCount] = useState(1482);

  useEffect(() => {
    // Load saved email if exists
    const saved = localStorage.getItem('lazrhub_notified_email');
    if (saved) {
      setSubmitted(true);
      setEmail(saved);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    localStorage.setItem('lazrhub_notified_email', email);
    setSubmitted(true);
    setSubCount((prev) => prev + 1);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-card-glow border border-purple-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Background Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            <div className="text-center py-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">You&apos;re on the VIP List!</h3>
              <p className="text-sm text-slate-300 mb-6">
                We sent a confirmation to <span className="text-purple-300 font-semibold">{email}</span>. You&apos;ll get instant launch access and an exclusive launch badge.
              </p>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400 flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                <span>You are <strong>#{subCount}</strong> in line for early launch perks</span>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors cursor-pointer"
              >
                Back to Countdown
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://res.cloudinary.com/oeweu9pq/image/upload/v1785275548/lazrhub-logo_dfkql7.jpg"
                  alt="LazrHub Logo"
                  className="w-12 h-12 rounded-2xl object-cover border border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.4)] shrink-0"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">Get Launch Notified</h3>
                  <p className="text-xs text-slate-400">Be the first to step into LazrHub v2.0</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                Enter your email to receive an instant alert when LazrHub goes live on <strong className="text-purple-300">August 11 at 6:00 PM</strong>. Plus, unlock an exclusive early adopter profile badge!
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Enter your email address..."
                      className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all text-sm"
                    />
                  </div>
                  {error && <p className="mt-1.5 text-xs text-rose-400 font-medium">{error}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Notify Me at Launch</span>
                </button>
              </form>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero spam. Unsubscribe anytime.</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
