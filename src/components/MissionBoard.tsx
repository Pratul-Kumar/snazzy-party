"use client";

import { motion } from "framer-motion";
import { Target, Skull } from "lucide-react";

export default function MissionBoard() {
  return (
    <div className="w-full h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="surface p-6 sm:p-8 h-full flex flex-col relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />

        <div className="flex items-center gap-2 mb-6">
          <Target className="text-accent" size={20} />
          <h3 className="text-xs font-bold uppercase tracking-widest text-accent">Active Quest</h3>
        </div>

        <h2 className="text-2xl font-black uppercase tracking-wider text-white mb-2">Host 100K Party</h2>
        
        <div className="inline-block bg-red-500/10 border border-red-500/20 px-3 py-1 rounded mb-6">
          <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
            <Skull size={12} /> Difficulty: Legendary
          </span>
        </div>

        <div className="space-y-4 flex-1 mb-6">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Rewards</h4>
            <div className="flex gap-2">
              <span className="bg-green/10 text-green px-2 py-1 rounded text-xs font-bold">+100 Friendship</span>
              <span className="bg-gold/10 text-gold px-2 py-1 rounded text-xs font-bold">+999 Respect</span>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Penalty For Ignoring</h4>
            <p className="text-sm font-bold text-red-400">Friends Keep Teasing Forever</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted mb-2">
            <span>Mission Progress</span>
            <span>0%</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full mb-4 overflow-hidden" />
          
          <button disabled className="w-full bg-white/5 border border-white/10 text-muted font-bold py-3 rounded-xl uppercase tracking-widest text-sm cursor-not-allowed">
            Start Mission (Unavailable)
          </button>
        </div>
      </motion.div>
    </div>
  );
}
