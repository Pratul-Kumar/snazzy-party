"use client";
import { motion } from "framer-motion";

export default function WantedPoster() {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateZ: 1 }}
      className="relative p-1 glass-card rounded-3xl overflow-hidden flex flex-col"
    >
      {/* Animated glowing border */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent via-warning to-accent opacity-50 animate-[spin-slow_8s_linear_infinite]" />
      
      <div className="relative w-full bg-[#0a0a0a] rounded-[22px] p-5 sm:p-6 md:p-10 flex flex-col items-center justify-center text-center border border-white/10 flex-1">
        
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-accent tracking-widest mb-4 sm:mb-6 glow-text font-serif">
          WANTED
        </h2>
        
        <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-zinc-900 border-4 border-dashed border-gray-600 rounded-2xl mb-4 sm:mb-6 flex items-center justify-center relative overflow-hidden group flex-shrink-0">
          <span className="text-gray-500 font-bold text-xs sm:text-sm group-hover:opacity-0 transition-opacity">Insert Photo Here</span>
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
             <span className="text-accent font-black rotate-[-15deg] border-4 border-accent p-1.5 sm:p-2 text-lg sm:text-2xl">MISSING</span>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4 w-full">
          <div className="flex justify-between border-b border-white/10 pb-2 text-sm sm:text-base">
            <span className="text-gray-400 uppercase font-bold text-xs sm:text-sm tracking-wider">Name</span>
            <span className="font-bold text-base sm:text-lg">SnazzyZone</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2 text-sm sm:text-base">
            <span className="text-gray-400 uppercase font-bold text-xs sm:text-sm tracking-wider">Crime</span>
            <span className="font-bold text-base sm:text-lg text-accent">Avoiding Party</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2 text-sm sm:text-base">
            <span className="text-gray-400 uppercase font-bold text-xs sm:text-sm tracking-wider">Reward</span>
            <span className="font-bold text-sm sm:text-lg text-warning">Unlimited Gulab Jamun</span>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 py-2.5 sm:py-3 px-4 sm:px-6 bg-accent/20 border border-accent rounded-xl">
          <span className="uppercase font-black text-accent tracking-widest animate-pulse text-xs sm:text-sm md:text-base">
            Status: Armed with Excuses
          </span>
        </div>

      </div>
    </motion.div>
  );
}
