"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Swords, Users } from "lucide-react";
import ChallengeModal from "./ChallengeModal";
import LeaderboardModal from "./LeaderboardModal";
import { subscribeToArenaLeaderboard } from "../lib/firebase";

export default function PartyArenaSection() {
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [topPlayers, setTopPlayers] = useState<[string, number][]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToArenaLeaderboard((data) => {
      // Sort players by wins
      const sorted = Object.entries(data)
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 3) as [string, number][];
      
      setTopPlayers(sorted.length ? sorted : [
        ["Rahul", 48],
        ["Aman", 42],
        ["Ankit", 38]
      ]);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="section-premium !py-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md mx-auto relative z-10 space-y-6">
        
        {/* Challenge Action Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="surface p-6 sm:p-8 text-center border border-accent/20"
        >
          <div className="inline-flex items-center justify-center p-3 bg-accent/10 text-accent rounded-2xl mb-4">
            <Swords size={28} />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black mb-2 uppercase tracking-tight text-white">
            Party Arena 🎮
          </h2>
          <p className="text-sm font-bold text-muted mb-8">
            Think you can beat your friend?
          </p>

          <button
            onClick={() => setIsChallengeOpen(true)}
            className="w-full bg-accent text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_40px_-10px_rgba(255,51,102,0.5)]"
          >
            CHALLENGE A FRIEND
          </button>
        </motion.div>

        {/* Compact Leaderboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-5"
        >
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
              <Trophy size={14} className="text-gold" /> Who&apos;s Cooking?
            </h3>
            <Users size={14} className="text-muted" />
          </div>

          <div className="space-y-2 mb-4">
            {topPlayers.map(([name, wins], idx) => (
              <div key={name} className="flex justify-between items-center bg-black/40 px-4 py-3 rounded-xl border border-white/5">
                <span className="font-bold text-sm text-white flex items-center gap-3">
                  <span className="text-lg">{["🥇", "🥈", "🥉"][idx]}</span> {name}
                </span>
                <span className="font-black text-xs text-muted uppercase tracking-widest">{wins} wins</span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setIsLeaderboardOpen(true)}
            className="w-full text-[10px] font-black uppercase tracking-widest text-muted hover:text-white transition-colors py-2"
          >
            [ View Full Leaderboard ]
          </button>
        </motion.div>
      </div>

      <ChallengeModal isOpen={isChallengeOpen} onClose={() => setIsChallengeOpen(false)} />
      <LeaderboardModal isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} />
    </section>
  );
}
