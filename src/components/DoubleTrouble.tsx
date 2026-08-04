"use client";

import { motion } from "framer-motion";

export default function DoubleTrouble() {
  return (
    <section className="section-premium !py-12">
      <div className="w-full max-w-md mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-8">
          DOUBLE <span className="text-accent">TROUBLE</span> 🎂
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="surface p-6 border border-accent/20 bg-accent/5 rounded-3xl"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Birthday</p>
            <h3 className="text-2xl font-black text-white">16 August</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="surface p-6 border border-gold/20 bg-gold/5 rounded-3xl"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">100K</p>
            <h3 className="text-2xl font-black text-white">Coming Soon</h3>
          </motion.div>
        </div>

        <p className="text-xl font-bold text-white mb-2">Bro...</p>
        <p className="text-muted font-bold text-lg leading-snug">
          One celebration was fine...<br/>
          <span className="text-white mt-2 block">Now you owe us TWO 😂</span>
        </p>
      </div>
    </section>
  );
}
