"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

const QUEUE = [
  { rank: 1, name: "Snazzy Bois" },
  { rank: 2, name: "Rahul" },
  { rank: 3, name: "Aman" },
  { rank: 4, name: "Hungry Subscribers" },
];

export default function RecoveryQueue() {
  return (
    <section className="section-premium">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="text-[11px] font-medium text-muted uppercase tracking-[0.2em] flex items-center gap-2">
            <Users size={14} /> National Waitlist
          </span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Party Recovery Queue</h2>
          <p className="text-sm text-muted">
            The official order in which parties will be distributed when (or if) they happen.
          </p>
        </div>

        <div className="surface p-2 sm:p-4 mb-6">
          <div className="space-y-2">
            {QUEUE.map((item, i) => (
              <motion.div
                key={item.rank}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`flex items-center p-4 rounded-xl ${
                  i === 0 ? "bg-accent/10 border border-accent/20" : "bg-white/5"
                }`}
              >
                <div className={`w-8 font-mono font-bold ${i === 0 ? "text-accent text-lg" : "text-muted"}`}>
                  #{item.rank}
                </div>
                <div className={`font-bold flex-1 ${i === 0 ? "text-accent" : "text-text"}`}>
                  {item.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-red-400">Estimated Wait Time</span>
          <span className="font-mono text-sm font-bold text-red-500">UNTIL ETERNITY</span>
        </div>
      </div>
    </section>
  );
}
