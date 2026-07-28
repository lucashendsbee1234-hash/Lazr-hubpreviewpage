import React from 'react';
import { Heart, Disc as Discord, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full mt-16 sm:mt-24 pb-8 px-4 text-center">
      {/* Decorative Gradient Divider */}
      <div className="w-full max-w-2xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-8" />

      {/* LazrHub Footer Brand */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <img
          src="https://res.cloudinary.com/oeweu9pq/image/upload/v1785275548/lazrhub-logo_dfkql7.jpg"
          alt="LazrHub Logo"
          className="w-8 h-8 rounded-xl object-cover border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
        />
        <span className="font-extrabold text-lg text-white tracking-wide">
          Lazr<span className="text-purple-400">Hub</span>
        </span>
      </div>

      {/* Official Discord Community Button */}
      <div className="flex items-center justify-center mb-6">
        <a
          href="https://discord.gg/eYcVSFkFcP"
          target="_blank"
          rel="noopener noreferrer"
          title="Join LazrHub Discord Server"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 hover:text-white font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all hover:scale-105 group"
        >
          <Discord className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          <span>Join Official Discord</span>
          <ExternalLink className="w-3.5 h-3.5 text-indigo-400/70 opacity-70 group-hover:opacity-100" />
        </a>
      </div>

      {/* Main Footer Text */}
      <p className="text-sm sm:text-base font-medium text-slate-300 flex items-center justify-center gap-1.5">
        Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse inline" /> by the LazrHub Team
      </p>

      {/* Copyright */}
      <p className="text-xs text-slate-500 mt-2 font-mono">
        © 2026 LazrHub
      </p>
    </footer>
  );
};
