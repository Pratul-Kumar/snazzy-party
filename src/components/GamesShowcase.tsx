"use client";

import { motion } from "framer-motion";

const games = [
  {
    id: "fs2026",
    title: "Farming Simulator 2026",
    icon: "🌾",
    desc: "Long roads. Big fields. Too many hours.",
    gradient: "from-[#4a5d23]/80 to-[#2a3614]/80", // rural / green / warm
  },
  {
    id: "cs2",
    title: "Cities: Skylines II",
    icon: "🏙️",
    desc: "Build it. Break it. Rebuild it.",
    gradient: "from-[#1c3f60]/80 to-[#0f2030]/80", // urban / blue
  },
  {
    id: "manor",
    title: "Manor Lords",
    icon: "⚔️",
    desc: "Strategy meets survival.",
    gradient: "from-[#3b2b1c]/80 to-[#1a130c]/80", // dark medieval
  },
  {
    id: "raft",
    title: "Raft",
    icon: "🌊",
    desc: "Somehow still alive.",
    gradient: "from-[#005c8a]/80 to-[#002f4a]/80", // ocean / blue
  }
];

export default function GamesShowcase() {
  return (
    <section className="section-premium py-20 px-6 sm:px-12 bg-[var(--surface)] text-[var(--text)] font-[family-name:var(--font-inter)]">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 uppercase">The Games</h2>
          <p className="text-[var(--muted)] text-lg md:text-xl max-w-2xl mx-auto">The worlds he keeps coming back to.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-3xl p-8 min-h-[280px] flex flex-col justify-end surface-interactive group`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <span className="text-5xl mb-6 block drop-shadow-lg">{game.icon}</span>
                <h3 className="text-3xl font-bold mb-2 tracking-tight">{game.title}</h3>
                <p className="text-[var(--muted)] group-hover:text-white transition-colors duration-300 text-lg">{game.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
