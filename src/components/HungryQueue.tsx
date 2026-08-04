"use client";

import { motion } from "framer-motion";

const QUEUE = [
  { rank: 1, name: "Snazzy Bois" },
  { rank: 2, name: "Rahul" },
  { rank: 3, name: "Aman" },
  { rank: 4, name: "Literally everyone else" },
];

export default function HungryQueue() {
  return (
    <section className="section-premium">
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-3xl font-black mb-8 text-center uppercase tracking-tight">
          Hungry Queue 🍕
        </h2>

        <div className="surface p-3 sm:p-4 mb-6 space-y-2">
          {QUEUE.map((item, i) => (
            <motion.div
              key={item.rank}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`flex items-center p-4 rounded-xl ${
                i === 0 ? "bg-accent text-white" : "bg-white/5 text-text"
              }`}
            >
              <div className="w-10 font-black text-lg opacity-80">
                #{item.rank}
              </div>
              <div className="font-black flex-1 text-lg">
                {item.name}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between items-center p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-red-400">Wait Time</span>
          <span className="font-black text-red-500">ETERNITY 💀</span>
        </div>
      </div>
    </section>
  );
}
