import React from 'react';
import { Heart, Disc as Discord, Twitter, Youtube, Tv } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full mt-16 sm:mt-24 pb-8 px-4 text-center">
      {/* Decorative Gradient Divider */}
      <div className="w-full max-w-2xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-8" />

      {/* Social Links */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <a
          href="#discord"
          onClick={(e) => e.preventDefault()}
          title="LazrHub Discord Community"
          className="p-2.5 rounded-xl bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-slate-400 hover:text-purple-300 transition-all hover:scale-110"
        >
          <Discord className="w-4 h-4" />
        </a>
        <a
          href="#twitter"
          onClick={(e) => e.preventDefault()}
          title="LazrHub Twitter / X"
          className="p-2.5 rounded-xl bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-slate-400 hover:text-purple-300 transition-all hover:scale-110"
        >
          <Twitter className="w-4 h-4" />
        </a>
        <a
          href="#twitch"
          onClick={(e) => e.preventDefault()}
          title="LazrHub Twitch Stream"
          className="p-2.5 rounded-xl bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-slate-400 hover:text-purple-300 transition-all hover:scale-110"
        >
          <Tv className="w-4 h-4" />
        </a>
        <a
          href="#youtube"
          onClick={(e) => e.preventDefault()}
          title="LazrHub YouTube Channel"
          className="p-2.5 rounded-xl bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-slate-400 hover:text-purple-300 transition-all hover:scale-110"
        >
          <Youtube className="w-4 h-4" />
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
