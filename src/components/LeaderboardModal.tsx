"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy } from "lucide-react";
import { subscribeToXPLeaderboard } from "@/lib/firebase";

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const unsubscribe = subscribeToXPLeaderboard((data) => {
      setPlayers(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isOpen]);

  if (!isOpen) return null;

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
          className="relative surface max-w-md w-full p-6 sm:p-8 rounded-[32px] border border-white/5 overflow-hidden max-h-[80vh] flex flex-col"
        >
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-accent/20 to-transparent pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} className="text-white" />
          </button>

          <div className="text-center mb-6 relative z-10 shrink-0">
            <div className="w-16 h-16 bg-accent/20 text-accent rounded-2xl flex items-center justify-center mx-auto mb-4 border border-accent/20">
              <Trophy size={32} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-2">
              Global XP Leaderboard
            </h2>
            <p className="text-muted text-sm font-bold uppercase tracking-widest">
              Top 20 Hungry Bois
            </p>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 space-y-3 pb-4">
            {loading ? (
              <div className="text-center text-muted font-bold tracking-widest py-10">LOADING...</div>
            ) : players.length === 0 ? (
              <div className="text-center text-muted font-bold tracking-widest py-10">NO PLAYERS YET</div>
            ) : (
              players.map((player, index) => {
                const isTop3 = index < 3;
                return (
                  <div 
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-2xl border ${
                      index === 0 ? 'bg-gold/10 border-gold/30' : 
                      index === 1 ? 'bg-slate-300/10 border-slate-300/30' : 
                      index === 2 ? 'bg-amber-700/10 border-amber-700/30' : 
                      'bg-black/40 border-white/5'
                    }`}
                  >
                    <div className={`text-xl font-black w-6 text-center ${
                      index === 0 ? 'text-gold' : 
                      index === 1 ? 'text-slate-300' : 
                      index === 2 ? 'text-amber-700' : 
                      'text-white/30'
                    }`}>
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-white uppercase tracking-wider truncate max-w-[150px]">
                          {player.name}
                        </span>
                        {player.role === "OWNER" && (
                          <span className="text-[9px] bg-gold text-black px-1.5 py-0.5 rounded font-black uppercase tracking-widest">
                            OWNER
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2 mt-1">
                        <span>{player.side}</span>
                        <span>•</span>
                        <span className="text-accent">Level {player.level}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-white">{player.xp}</div>
                      <div className="text-[10px] text-muted uppercase tracking-widest">XP</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
