import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CountdownCardProps {
  value: number;
  label: string;
  delay?: number;
}

export const CountdownCard: React.FC<CountdownCardProps> = ({ value, label, delay = 0 }) => {
  const formattedValue = value.toString().padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group relative flex flex-col items-center justify-center min-w-[76px] sm:min-w-[110px] md:min-w-[140px] px-3 sm:px-6 py-4 sm:py-6 rounded-2xl sm:rounded-3xl glass-card-glow transition-all duration-300 hover:scale-105 hover:border-purple-400/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]"
    >
      {/* Top subtle highlight line */}
      <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent rounded-full" />
      
      {/* Corner accent glow on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/0 via-indigo-500/0 to-blue-500/0 rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-40 group-hover:from-purple-600/30 group-hover:via-indigo-500/20 group-hover:to-blue-500/30 transition-all duration-500 -z-10" />

      {/* Animated Number Container */}
      <div className="relative h-12 sm:h-20 md:h-24 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={formattedValue}
            initial={{ y: 20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            className="font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-purple-200 drop-shadow-[0_4px_12px_rgba(168,85,247,0.4)]"
          >
            {formattedValue}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Label */}
      <span className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-widest text-purple-300/80 group-hover:text-purple-200 transition-colors">
        {label}
      </span>

      {/* Decorative tiny LED light */}
      <div className="absolute bottom-2 sm:bottom-3 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-purple-500/60 group-hover:bg-purple-400 group-hover:shadow-[0_0_8px_#a855f7] transition-all" />
    </motion.div>
  );
};
