import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, Send, Sparkles, ShieldCheck, Mail, Loader2, ExternalLink } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [subCount, setSubCount] = useState(1482);
  const [statusMsg, setStatusMsg] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // Load saved email if exists
    const saved = localStorage.getItem('lazrhub_notified_email');
    if (saved) {
      setSubmitted(true);
      setEmail(saved);
    }

    // Fetch initial count
    fetch('/api/subscribers/count')
      .then((res) => res.json())
      .then((data) => {
        if (data.count) setSubCount(data.count);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsSending(true);

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to register notification email');
      }

      localStorage.setItem('lazrhub_notified_email', email);
      if (data.subCount) setSubCount(data.subCount);
      if (data.previewUrl) setPreviewUrl(data.previewUrl);
      setStatusMsg(data.message || 'Confirmation email sent!');
      setSubmitted(true);
    } catch (err: unknown) {
      const errorObj = err as Error;
      setError(errorObj.message || 'Error sending confirmation email. Please try again.');
    } finally {
      setIsSending(false);
    }
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
            <div className="text-center py-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Check Your Email! 📩</h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                We sent a confirmation email to <span className="text-purple-300 font-semibold">{email}</span> with details on the <strong className="text-white">August 11 at 6:00 PM</strong> launch!
              </p>

              <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 mb-4 text-left flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-purple-300 mb-0.5">Release Email Dispatched</p>
                  <p className="text-slate-300 leading-snug">
                    {statusMsg || 'Your email is registered for early access perks, launch day alert, and exclusive Discord community updates.'}
                  </p>
                </div>
              </div>

              {previewUrl && (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-4 inline-flex items-center gap-1.5 text-xs text-indigo-300 hover:text-indigo-200 underline bg-indigo-950/50 px-3 py-1.5 rounded-lg border border-indigo-500/30"
                >
                  <span>View Sent Email Preview (Test Sandbox)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400 flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                <span>You are <strong>#{subCount}</strong> in line for early release perks</span>
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
                  <p className="text-xs text-slate-400">Official LazrHub v1.0 Launch Alert</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                Enter your email to receive an instant release email on <strong className="text-purple-300">August 11 at 6:00 PM</strong>, complete with early player badge perks, launch day game drops, and community rewards!
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      disabled={isSending}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Enter your email address..."
                      className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all text-sm disabled:opacity-50"
                    />
                  </div>
                  {error && <p className="mt-1.5 text-xs text-rose-400 font-medium">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Confirmation Email...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Me Release Email</span>
                    </>
                  )}
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

