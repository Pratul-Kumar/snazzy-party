"use client";
import { motion } from "framer-motion";

export default function WantedPoster() {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateZ: 1 }}
      className="relative p-1 glass-card rounded-3xl overflow-hidden h-[600px] flex flex-col justify-center"
    >
      {/* Animated glowing border */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent via-warning to-accent opacity-50 animate-[spin-slow_8s_linear_infinite]" />
      
      <div className="relative h-full w-full bg-[#0a0a0a] rounded-[22px] p-6 md:p-10 flex flex-col items-center justify-center text-center border border-white/10">
        
        <h2 className="text-5xl md:text-6xl font-black text-accent tracking-widest mb-6 glow-text font-serif">
          WANTED
        </h2>
        
        <div className="w-48 h-48 md:w-56 md:h-56 bg-zinc-900 border-4 border-dashed border-gray-600 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden group">
          <span className="text-gray-500 font-bold group-hover:opacity-0 transition-opacity">Insert Photo Here</span>
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
             <span className="text-accent font-black rotate-[-15deg] border-4 border-accent p-2 text-2xl">MISSING</span>
          </div>
        </div>

        <div className="space-y-4 w-full">
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-gray-400 uppercase font-bold text-sm tracking-wider">Name</span>
            <span className="font-bold text-lg">SnazzyZone</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-gray-400 uppercase font-bold text-sm tracking-wider">Crime</span>
            <span className="font-bold text-lg text-accent">Avoiding Party</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-gray-400 uppercase font-bold text-sm tracking-wider">Reward</span>
            <span className="font-bold text-lg text-warning">Unlimited Gulab Jamun</span>
          </div>
        </div>

        <div className="mt-8 py-3 px-6 bg-accent/20 border border-accent rounded-xl">
          <span className="uppercase font-black text-accent tracking-widest animate-pulse">
            Status: Armed with Excuses
          </span>
        </div>

      </div>
    </motion.div>
  );
}
