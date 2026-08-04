"use client";

import { motion } from "framer-motion";

export default function YouTubeSection() {
  return (
    <section className="section-premium !py-12">
      <div className="w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-[#111] to-[#050505] border-2 border-white/10 rounded-[32px] p-8 overflow-hidden shadow-2xl"
        >
          {/* YouTube Red glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF0000]/20 rounded-full blur-[60px]" />

          <div className="relative z-10 flex flex-col items-center text-center">
            
            <div className="w-20 h-20 rounded-full bg-white mb-6 flex items-center justify-center p-1 shadow-lg shadow-white/10">
              <div className="w-full h-full bg-gradient-to-tr from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-3xl font-black text-white drop-shadow-md">SZ</span>
              </div>
            </div>

            <h2 className="text-3xl font-black text-white mb-1">SnazzyZone</h2>
            <p className="text-sm font-bold text-muted uppercase tracking-[0.2em] mb-8">YouTube Creator</p>

            <div className="w-full bg-black/50 rounded-2xl p-5 border border-white/5 mb-8">
              <p className="text-[10px] font-bold text-[#FF0000] uppercase tracking-widest mb-2">Milestone Target</p>
              <h3 className="text-4xl font-black text-white mb-4">100K <span className="text-muted text-2xl font-normal">Loading...</span></h3>
              
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FF0000] to-orange-500 w-[95%]" />
              </div>
            </div>

            <a 
              href="https://www.youtube.com/@SnazzyZone" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full block bg-white text-black font-black uppercase tracking-widest text-sm py-5 rounded-2xl hover:scale-105 active:scale-95 transition-transform"
            >
              ▶ Visit Channel
            </a>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
