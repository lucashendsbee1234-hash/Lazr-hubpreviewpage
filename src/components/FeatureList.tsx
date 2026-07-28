import React from 'react';
import { motion } from 'motion/react';
import { 
  Gamepad2, 
  Zap, 
  UserCheck, 
  Coins, 
  Trophy, 
  MessageSquareHeart, 
  Gauge, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { FeatureItem } from '../types';

const FEATURES: FeatureItem[] = [
  {
    id: 'games',
    title: 'A ton of games',
    iconName: 'Gamepad2',
    badge: 'Library Expand',
    description: 'Fresh multiplayer, arcade, and battle arena titles added.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'speed',
    title: 'Faster Website',
    iconName: 'Zap',
    badge: '10x Speed',
    description: 'Instant page transitions and zero-latency load times.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'profiles',
    title: 'User Profiles',
    iconName: 'UserCheck',
    badge: 'Customization',
    description: 'Custom avatars, bio cards, rank badges, and match histories.',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    id: 'coins',
    title: 'Coins & Rewards',
    iconName: 'Coins',
    badge: 'Earning System',
    description: 'Earn LazrCoins by playing and unlock exclusive platform perks.',
    color: 'from-yellow-400 to-amber-500',
  },
  {
    id: 'achievements',
    title: 'Achievements',
    iconName: 'Trophy',
    badge: 'Unlocks',
    description: 'Over 100+ unique milestone trophies & battle pass tiers.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'chat',
    title: 'Better Chat',
    iconName: 'MessageSquareHeart',
    badge: 'Social Suite',
    description: 'Voice rooms, live party channels, animated emojis & GIFs.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'performance',
    title: 'Performance Improvements',
    iconName: 'Gauge',
    badge: 'Optimization',
    description: '60 FPS web canvas rendering and reduced memory footprint.',
    color: 'from-purple-400 to-pink-500',
  },
];

const renderIcon = (id: string, className: string) => {
  switch (id) {
    case 'games':
      return <Gamepad2 className={className} />;
    case 'speed':
      return <Zap className={className} />;
    case 'profiles':
      return <UserCheck className={className} />;
    case 'coins':
      return <Coins className={className} />;
    case 'achievements':
      return <Trophy className={className} />;
    case 'chat':
      return <MessageSquareHeart className={className} />;
    case 'performance':
      return <Gauge className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export const FeatureList: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full max-w-4xl mx-auto mt-12 sm:mt-16 px-4"
    >
      <div className="relative p-6 sm:p-8 md:p-10 rounded-3xl glass-panel border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Subtle background glow circle */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600/30 to-blue-600/30 border border-purple-400/30 text-purple-300">
              <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                ✨ What&apos;s Coming?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Sneak peek at the next evolution of LazrHub
              </p>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
            LazrHub v2.0 Roadmap
          </span>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {FEATURES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + idx * 0.08 }}
              className="group relative p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-purple-500/30 transition-all duration-300 flex items-start gap-4 hover:shadow-[0_4px_20px_rgba(168,85,247,0.15)]"
            >
              {/* Icon Container */}
              <div className={`shrink-0 p-3 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-10 border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                {renderIcon(item.id, "w-5 h-5 text-white")}
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white group-hover:text-purple-200 transition-colors truncate">
                    • {item.title}
                  </h3>
                  <span className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10 group-hover:border-purple-400/30 group-hover:text-purple-300">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 group-hover:text-slate-300 transition-colors">
                  {item.description}
                </p>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all shrink-0 self-center" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Active development in progress
          </span>
          <span className="text-purple-400 font-medium">
            Stay tuned for August 11 reveal
          </span>
        </div>
      </div>
    </motion.div>
  );
};
