"use client";

import { motion } from "framer-motion";
import { Trophy, Gamepad2, Lock } from "lucide-react";

export default function PlayerProfile() {
  return (
    <div className="w-full h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="surface p-6 sm:p-8 h-full flex flex-col"
      >
        <div className="flex items-center gap-2 mb-6">
          <Gamepad2 className="text-muted" size={20} />
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted">Player Profile</h3>
        </div>

        <div className="flex items-start gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-orange-500 p-[2px]">
            <div className="w-full h-full bg-surface rounded-2xl flex items-center justify-center font-black text-2xl">
              SZ
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-wider text-white">SnazzyZone</h2>
            <p className="text-sm font-bold text-accent tracking-widest uppercase mt-1">FPS Specialist</p>
            <div className="inline-block bg-white/10 px-2 py-1 rounded mt-2">
              <span className="text-[10px] font-mono text-white/80">Rank: LEGEND</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted mb-2">
            <span>Subscribers XP</span>
            <span className="text-gold">100,000 XP</span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gold to-yellow-300 w-full" />
          </div>
        </div>

        <div className="space-y-3 flex-1">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Achievements</h4>
          
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
            <Trophy size={16} className="text-gold" />
            <span className="text-sm font-bold flex-1">50K Unlocked</span>
            <span className="text-[10px] uppercase font-bold text-green tracking-wider">Completed</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
            <Trophy size={16} className="text-gold" />
            <span className="text-sm font-bold flex-1">Birthday</span>
            <span className="text-[10px] uppercase font-bold text-green tracking-wider">Completed</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 opacity-50">
            <Lock size={16} className="text-muted" />
            <span className="text-sm font-bold flex-1 text-muted">Host a Party</span>
            <span className="text-[10px] uppercase font-bold text-red-500 tracking-wider">Locked</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
