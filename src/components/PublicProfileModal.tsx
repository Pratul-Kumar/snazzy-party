"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy } from "lucide-react";

interface PublicProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: any | null;
}

// Function to calculate rank title based on level
const getRankTitle = (level: number, side: string) => {
  if (level >= 100) return "GOD OF FOOD";
  if (level >= 50) return "MASTER CHEF";
  if (level >= 25) return "PARTY VETERAN";
  if (level >= 10) return "HUNGRY BOIS";
  return "NEWCOMER";
};

// Next XP calculation
const getXPForLevel = (level: number) => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

export default function PublicProfileModal({ isOpen, onClose, profile }: PublicProfileModalProps) {
  if (!isOpen || !profile) return null;

  const isOwner = profile.role === "OWNER";
  const title = getRankTitle(profile.level || 1, profile.side || "🍕");
  
  let progress = 0;
  let nextXp = 0;
  if (!isOwner && profile.level) {
    const currentBaseXp = getXPForLevel(profile.level);
    nextXp = getXPForLevel(profile.level + 1);
    const xpIntoLevel = (profile.xp || 0) - currentBaseXp;
    const xpNeededForLevel = nextXp - currentBaseXp;
    progress = Math.min(100, Math.max(0, (xpIntoLevel / xpNeededForLevel) * 100));
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white/50 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="bg-[#111] border border-white/10 p-6 sm:p-8 rounded-[32px] relative overflow-hidden shadow-2xl">
            {/* ID Header */}
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted mb-1">
                  🪪 PLAYER ID
                </h3>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">
                  {profile.odId}
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-none mb-2 break-all">
                  {profile.name}
                </h2>
                <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 mt-2">
                  <span className="text-sm">{profile.side}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold">
                    {profile.title || title}
                  </span>
                </div>
              </div>
              
              {isOwner && (
                <div className="bg-gold/20 border border-gold/50 px-3 py-1 rounded-full text-xs font-black text-gold uppercase tracking-widest">
                  👑 OWNER
                </div>
              )}
            </div>

            {/* Level Progress */}
            {!isOwner && (
              <div className="mb-8 bg-black/40 p-4 rounded-2xl border border-white/5 relative z-10">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <span className="text-sm font-black text-muted uppercase tracking-widest">Level </span>
                    <span className="text-2xl font-black text-white">{profile.level || 1}</span>
                  </div>
                  <div className="text-xs font-bold text-muted text-right">
                    <span className="text-white">{profile.xp || 0} XP</span> / {nextXp} XP
                  </div>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-accent" 
                  />
                </div>
              </div>
            )}

            {/* Stats Grid */}
            {!isOwner && (
              <div className="grid grid-cols-2 gap-3 mb-8 relative z-10">
                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">🎮 Games</div>
                  <div className="text-2xl font-black text-white">{profile.stats?.gamesPlayed || 0}</div>
                </div>
                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">🏆 Wins</div>
                  <div className="text-2xl font-black text-white">{profile.stats?.wins || 0}</div>
                </div>
                <div className="bg-black/40 p-4 rounded-2xl border border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/5" />
                  <div className="relative z-10 text-[10px] font-black uppercase tracking-widest text-accent mb-1">🔥 Pressure</div>
                  <div className="relative z-10 text-2xl font-black text-white">{profile.stats?.partyPressure || 0}</div>
                </div>
                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">✨ Streak</div>
                  <div className="text-2xl font-black text-white">{profile.stats?.currentWinStreak || 0}</div>
                </div>
              </div>
            )}

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
