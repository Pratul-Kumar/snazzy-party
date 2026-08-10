"use client";

import { motion } from "framer-motion";
import { CONFIG } from "../lib/config";

export default function MissingPoster() {
  const scrollToForm = () => {
    document.getElementById("petition-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-premium">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <div className="relative max-w-md mx-auto paper-texture p-8 sm:p-12 rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden text-center cursor-pointer">
          
          <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-40 h-8 bg-white/50 backdrop-blur-md rotate-[-2deg] shadow-sm z-10" />

          <div className="border-[6px] border-red-600 px-6 py-2 rotate-[-5deg] inline-block mb-8">
            <h2 className="text-4xl sm:text-5xl font-black text-red-600 tracking-[0.2em] uppercase m-0 leading-none">
              MISSING
            </h2>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black mb-10 uppercase tracking-widest text-black/90 leading-tight flex flex-col items-center gap-2">
            <span>{CONFIG.SUBSCRIBER_COUNT}</span>
            <span className="text-xl opacity-50">⬇</span>
            <span>100K</span>
            <span className="text-xl opacity-50">⬇</span>
            <span className="text-red-600">PARTY???</span>
          </h3>

          <div className="border-y-4 border-black/10 py-6 mb-10 space-y-5">
            <div className="flex flex-col items-center">
              <span className="text-xs uppercase font-bold tracking-widest text-red-600 mb-1">Reward</span>
              <span className="font-black text-xl text-black/90 text-center">Unlimited Respect<br/>+ One Plate Biryani</span>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-xs uppercase font-bold tracking-widest text-black/50 mb-1">Last Seen</span>
              <span className="font-black text-lg text-black/90">Never 😂</span>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-xs uppercase font-bold tracking-widest text-black/50 mb-1">If Found</span>
              <span className="font-black text-lg text-black/90">Please Contact Snazzy Bois</span>
            </div>
          </div>

          <button
            onClick={scrollToForm}
            className="bg-red-600 text-white font-black py-5 px-8 w-full uppercase tracking-[0.2em] text-lg hover:bg-red-700 transition-colors shadow-xl shadow-red-600/30 rounded-2xl active:scale-95"
          >
            HELP US FIND IT
          </button>
        </div>
      </motion.div>
    </section>
  );
}
