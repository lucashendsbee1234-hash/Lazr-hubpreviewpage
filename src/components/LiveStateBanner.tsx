import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LiveStateBannerProps {
  onEnter?: () => void;
}

export const LiveStateBanner: React.FC<LiveStateBannerProps> = ({ onEnter }) => {
  useEffect(() => {
    // Launch fireworks confetti
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#a855f7', '#6366f1', '#3b82f6', '#ec4899', '#ffffff'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#a855f7', '#6366f1', '#3b82f6', '#ec4899', '#ffffff'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleEnterClick = () => {
    if (onEnter) {
      onEnter();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center my-8 sm:my-12 px-4 text-center z-10"
    >
      {/* Live Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] mb-6"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        SYSTEM ONLINE & DEPLOYED
      </motion.div>

      {/* Main LIVE text */}
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-2xl drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]">
        🎉 LazrHub is now <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">LIVE!</span>
      </h2>

      <p className="mt-4 text-slate-300 text-sm sm:text-base md:text-lg max-w-xl">
        The wait is over. Experience the next generation gaming platform with brand new titles, lightning-fast speeds, and rewards.
      </p>

      {/* Large Glowing Button */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(168, 85, 247, 0.7)' }}
        whileTap={{ scale: 0.97 }}
        onClick={handleEnterClick}
        className="group relative mt-8 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold text-lg sm:text-xl shadow-[0_0_35px_rgba(147,51,234,0.5)] border border-purple-400/40 flex items-center gap-3 cursor-pointer overflow-hidden transition-all duration-300"
      >
        {/* Shimmer line effect */}
        <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
        
        <Rocket className="w-6 h-6 text-purple-200 group-hover:rotate-12 transition-transform" />
        <span>Enter LazrHub</span>
        <ArrowRight className="w-6 h-6 text-purple-200 group-hover:translate-x-2 transition-transform" />
      </motion.button>
    </motion.div>
  );
};
