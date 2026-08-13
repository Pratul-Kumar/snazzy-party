"use client";

import { motion } from 'framer-motion';

export default function CreatorStats() {
  const stats = [
    { label: "CREATING SINCE", value: "30 DEC 2021" },
    { label: "CHANNELS", value: "03" },
    { label: "FAVOURITE WORLD", value: "GAMING" },
    { label: "2026 GOAL", value: "🚗 DAD'S CAR" },
  ];

  return (
    <section className="section-premium py-24 border-y border-white/5" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="surface p-8 rounded-3xl border border-white/5 flex flex-col items-center sm:items-start text-center sm:text-left hover:border-white/10 transition-colors"
            >
              <h3 className="text-xs font-semibold tracking-widest mb-3 uppercase" style={{ color: 'var(--muted)' }}>
                {stat.label}
              </h3>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
