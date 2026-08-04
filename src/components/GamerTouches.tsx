"use client";

import { motion } from "framer-motion";

export default function GamerTouches() {
  return (
    <section className="section-premium">
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-3xl font-black mb-8 text-center uppercase tracking-tight text-white">
          Mission Board 🎮
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="surface p-6 sm:p-8"
        >
          <div className="mb-8 border-b border-white/10 pb-6">
            <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-1">Main Quest</p>
            <h3 className="text-2xl font-black uppercase text-white mb-4">Host 100K Party</h3>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-red-500/10 text-red-500 text-xs font-black px-3 py-1 rounded border border-red-500/20 uppercase">
                Difficulty: Impossible
              </span>
              <span className="bg-gold/10 text-gold text-xs font-black px-3 py-1 rounded border border-gold/20 uppercase">
                Reward: +999 Respect
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-black text-muted uppercase tracking-widest">
                <span>Progress</span>
                <span className="text-white">0%</span>
              </div>
              <div className="h-3 w-full bg-black rounded-full overflow-hidden border border-white/10 p-0.5">
                <div className="h-full bg-white/10 rounded-full w-2" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-3">Achievements</p>
            
            <div className="flex items-center justify-between bg-green/10 p-3 rounded-xl border border-green/20">
              <span className="font-black text-green">Reach 100K</span>
              <span className="text-[10px] font-black uppercase tracking-widest bg-green text-black px-2 py-1 rounded">Unlocked</span>
            </div>

            <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10 opacity-50">
              <span className="font-black text-white/50">Give Party</span>
              <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white/50 px-2 py-1 rounded border border-white/20">Locked 🔒</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs font-bold text-muted uppercase tracking-widest">
              Respawn: <span className="text-white font-black">Tomorrow 💀</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
