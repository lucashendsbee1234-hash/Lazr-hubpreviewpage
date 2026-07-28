import React from 'react';
import { Volume2, VolumeX, Sparkles, Bell } from 'lucide-react';

interface HeaderNavbarProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenNotify: () => void;
  isSimulatedLive: boolean;
  onToggleSimulateLive: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  isMuted,
  onToggleMute,
  onOpenNotify,
  isSimulatedLive,
  onToggleSimulateLive,
}) => {
  return (
    <header className="relative z-20 w-full max-w-7xl mx-auto px-4 py-4 sm:py-6 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="relative group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.4)]">
          <div className="w-full h-full bg-[#0b0b0b] rounded-[15px] flex items-center justify-center text-xl sm:text-2xl group-hover:bg-purple-950/40 transition-colors">
            🚀
          </div>
        </div>
        <div>
          <span className="font-extrabold text-xl sm:text-2xl tracking-wider text-white">
            Lazr<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400">Hub</span>
          </span>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-purple-300 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Gaming Platform
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Simulator Toggle Button */}
        <button
          onClick={onToggleSimulateLive}
          title={isSimulatedLive ? "Switch to Countdown Mode" : "Preview Live Launch Mode"}
          className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
            isSimulatedLive
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:border-purple-400/40'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">
            {isSimulatedLive ? 'Viewing LIVE Mode' : 'Preview LIVE State'}
          </span>
          <span className="sm:hidden">
            {isSimulatedLive ? 'LIVE' : 'Preview'}
          </span>
        </button>

        {/* Audio Mute Button */}
        <button
          onClick={onToggleMute}
          title={isMuted ? "Enable Sound Effects" : "Mute Sound Effects"}
          className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
        </button>

        {/* VIP Notify Button */}
        <button
          onClick={onOpenNotify}
          className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all flex items-center gap-2 cursor-pointer"
        >
          <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Notify Me</span>
        </button>
      </div>
    </header>
  );
};
