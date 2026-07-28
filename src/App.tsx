import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Clock, Bell, Rocket, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { CountdownCard } from './components/CountdownCard';
import { FeatureList } from './components/FeatureList';
import { NotificationModal } from './components/NotificationModal';
import { HeaderNavbar } from './components/HeaderNavbar';
import { Footer } from './components/Footer';
import { TimeLeft } from './types';
import { sfx } from './utils/audio';

export default function App() {
  // Target Launch Date: August 11, 2026 at 6:00 PM (18:00:00) Local Time
  const getInitialTargetDate = () => {
    const now = new Date();
    const target = new Date(now.getFullYear(), 7, 11, 18, 0, 0); // Month 7 is August (0-indexed)
    
    // If August 11 of this year has already passed, use next year's August 11
    if (now.getTime() > target.getTime()) {
      target.setFullYear(now.getFullYear() + 1);
    }
    return target;
  };

  const [targetDate, setTargetDate] = useState<Date>(getInitialTargetDate);
  const [isSimulatedLive, setIsSimulatedLive] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [timeZoneName, setTimeZoneName] = useState<string>('');

  // Calculate time remaining
  const calculateTimeLeft = useCallback((): TimeLeft => {
    if (isSimulatedLive) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0, isExpired: true };
    }

    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0, isExpired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      days,
      hours,
      minutes,
      seconds,
      totalMs: difference,
      isExpired: false,
    };
  }, [targetDate, isSimulatedLive]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  // Update timezone name
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimeZoneName(tz);
    } catch {
      setTimeZoneName('Local Time');
    }
  }, []);

  // Timer interval
  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);

      if (!isMuted && !updated.isExpired) {
        sfx.playTick();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, isMuted]);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sfx.playClick();
    }
  };

  const handleToggleSimulateLive = () => {
    if (!isMuted) sfx.playClick();
    setIsSimulatedLive((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#0b0b0b] text-white flex flex-col justify-between overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* Background Interactive Particles */}
      <ParticleCanvas />

      {/* Subtle Moving Background Mesh Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-700/20 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute top-2/3 right-1/4 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[130px] animate-mesh" />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[150px]" />
      </div>

      {/* Header Navigation Bar */}
      <HeaderNavbar
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenNotify={() => setIsNotifyOpen(true)}
        isSimulatedLive={isSimulatedLive}
        onToggleSimulateLive={handleToggleSimulateLive}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 text-center max-w-5xl mx-auto w-full">
        {/* Brand Hero Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          {/* Gentle animated glow behind logo */}

         <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 via-indigo-500/20 to-blue-500/30 rounded-full blur-2xl animate-pulse-glow pointer-events-none" /> 
          <div className="relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass-panel border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]"> 
            <img 
              src="https://res.cloudinary.com/oeweu9pq/image/upload/v1785039062/ChatGPT_Image_Jul_24_2026_05_33_27_PM_bmmkca.png" 
              alt="LazrHub Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain animate-bounce"
            /> 
            <span className="font-extrabold text-2xl sm:text-4xl tracking-tight text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]"> 
              LazrHub 
            </span> 
          </div> 
          </motion.div>


        {/* Heading: # Coming Soon */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200 drop-shadow-[0_4px_25px_rgba(168,85,247,0.35)]"
        >
          Coming Soon
        </motion.h1>

        {/* Launch Date Announcement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-300 max-w-2xl font-medium space-y-1"
        >
          <p className="text-slate-400">LazrHubs best version releases on</p>
          <p className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400 inline" />
            <span>August 11 at 6:00 PM</span>
          </p>
          {timeZoneName && (
            <p className="text-[11px] text-slate-500 uppercase tracking-widest font-mono pt-1">
              {timeZoneName} (Your Local Time)
            </p>
          )}
        </motion.div>

        {/* Countdown Timer or Live State */}
        <div className="w-full mt-8 sm:mt-12">
          <AnimatePresence mode="wait">
            {timeLeft.isExpired ? (
              <LiveStateBanner key="live-banner" />
            ) : (
              <motion.div
                key="countdown-timer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                {/* 4 Glass Cards Grid */}
                <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 max-w-3xl mx-auto">
                  <CountdownCard value={timeLeft.days} label="Days" delay={0.25} />
                  <CountdownCard value={timeLeft.hours} label="Hours" delay={0.3} />
                  <CountdownCard value={timeLeft.minutes} label="Minutes" delay={0.35} />
                  <CountdownCard value={timeLeft.seconds} label="Seconds" delay={0.4} />
                </div>

                {/* Subtitle callout below timer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 flex items-center justify-center gap-2 text-xs text-purple-300/80 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20"
                >
                  <Clock className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>Timer updates live automatically every second</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature List Component ("✨ What's Coming?") */}
        <FeatureList />
      </main>

      {/* Footer Component */}
      <Footer />

      {/* VIP Early Access Modal */}
      <NotificationModal
        isOpen={isNotifyOpen}
        onClose={() => setIsNotifyOpen(false)}
      />
    </div>
  );
}
