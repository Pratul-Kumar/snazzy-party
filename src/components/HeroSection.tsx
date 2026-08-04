"use client";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import confetti from "canvas-confetti";

export default function HeroSection() {
  const triggerConfetti = () => {
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
  };

  return (
    <section className="min-h-[70vh] md:min-h-[80vh] pt-16 md:pt-0 flex flex-col items-center justify-center text-center gap-8 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 uppercase tracking-tighter">
          Official <span className="text-accent glow-text">Party Recovery</span> Notice
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Government investigation confirms that <span className="text-white font-bold">SnazzyZone</span> has crossed multiple life milestones without providing any party.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        whileHover={{ rotateY: 10, rotateX: -10, scale: 1.05 }}
        className="glass-card p-6 md:p-8 rounded-3xl w-full max-w-md transform-gpu perspective-1000 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 bg-accent text-white font-bold px-4 py-1 rounded-bl-xl text-sm animate-pulse">
          🚨 HIGH RISK
        </div>
        
        <div className="flex flex-col gap-4 text-left mt-4">
          <div>
            <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Name</p>
            <p className="text-xl md:text-2xl font-bold">SnazzyZone</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Occupation</p>
            <p className="text-lg">YouTuber</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Current Status</p>
            <p className="text-accent font-bold text-lg glow-text">Party Defaulter</p>
          </div>
          <div className="pt-4 border-t border-white/10">
            <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Subscribers</p>
            <p className="text-3xl font-black text-success">
              <CountUp end={100000} duration={4} separator="," />+
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center max-w-md"
      >
        <button
          onClick={triggerConfetti}
          className="bg-accent hover:bg-red-600 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(255,56,56,0.4)] transition-all transform hover:scale-105 active:scale-95 flex-1"
        >
          Recover My Party
        </button>
        <button
          onClick={() => {
            const el = document.getElementById("excuse");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="glass-card hover:bg-white/5 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 active:scale-95 flex-1"
        >
          Generate Excuse
        </button>
      </motion.div>
    </section>
  );
}
