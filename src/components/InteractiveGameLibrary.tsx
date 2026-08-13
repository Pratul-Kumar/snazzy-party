"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const games = [
  {
    id: "farming",
    number: "01",
    title: "Farming Simulator 2026",
    tagline: "Build it. Grow it. Lose track of time.",
    gradient: "from-green-900/40 via-green-800/10 to-transparent",
    color: "#4ade80",
  },
  {
    id: "cities",
    number: "02",
    title: "Cities: Skylines II",
    tagline: "Build a city. Destroy traffic. Pretend it was planned.",
    gradient: "from-blue-900/40 via-blue-800/10 to-transparent",
    color: "#60a5fa",
  },
  {
    id: "manor",
    number: "03",
    title: "Manor Lords",
    tagline: "Build an empire. Try not to lose it.",
    gradient: "from-amber-900/40 via-amber-800/10 to-transparent",
    color: "#fbbf24",
  },
  {
    id: "raft",
    number: "04",
    title: "Raft",
    tagline: "Started with a raft. Somehow still alive.",
    gradient: "from-cyan-900/40 via-cyan-800/10 to-transparent",
    color: "#22d3ee",
  },
  {
    id: "other",
    number: "05",
    title: "Other Games",
    tagline: "Because there's always something new to play.",
    gradient: "from-purple-900/40 via-purple-800/10 to-transparent",
    color: "#c084fc",
  },
];

export default function InteractiveGameLibrary() {
  const [selectedGame, setSelectedGame] = useState(games[0]);

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden section-premium bg-black flex flex-col md:flex-row cyber-grid scanlines font-gamer-body">
      {/* Background Atmosphere */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={selectedGame.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-gradient-to-br ${selectedGame.gradient}`}
        />
      </AnimatePresence>

      {/* Sidebar Selector */}
      <div className="relative z-10 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 p-6 sm:p-10 flex flex-col justify-center surface-glass">
        <h3 className="text-muted tracking-widest text-sm font-bold mb-8 font-gamer-heading">LIBRARY</h3>
        <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible space-x-4 md:space-x-0 md:space-y-4 pb-4 md:pb-0 hide-scrollbar snap-x snap-mandatory">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className={`snap-center shrink-0 group flex items-center space-x-4 px-6 py-4 transition-all duration-300 ${
                selectedGame.id === game.id 
                  ? "bg-white/10 text-white gamer-border" 
                  : "text-muted hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <span className={`text-sm font-mono ${selectedGame.id === game.id ? "text-white" : ""}`} style={{ color: selectedGame.id === game.id ? game.color : undefined }}>
                {game.number}
              </span>
              <span className="font-bold text-left tracking-wide text-lg font-gamer-heading">{game.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full md:w-2/3 flex items-center p-8 sm:p-16 min-h-[50vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedGame.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col max-w-3xl"
          >
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-none font-gamer-heading">
              {selectedGame.title}
            </h2>
            <p 
              className="text-xl sm:text-2xl lg:text-3xl text-muted font-medium border-l-4 pl-6 font-gamer-body" 
              style={{ borderColor: selectedGame.color }}
            >
              {selectedGame.tagline}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
