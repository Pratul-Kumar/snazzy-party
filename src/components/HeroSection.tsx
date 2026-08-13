"use client";

import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-premium pt-20" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Animated Subtle Background */}
      <motion.div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, var(--surface) 0%, transparent 60%)',
            'radial-gradient(circle at 100% 100%, var(--surface) 0%, transparent 60%)',
            'radial-gradient(circle at 0% 100%, var(--surface) 0%, transparent 60%)',
            'radial-gradient(circle at 100% 0%, var(--surface) 0%, transparent 60%)',
            'radial-gradient(circle at 0% 0%, var(--surface) 0%, transparent 60%)'
          ]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest border border-white/10 uppercase"
          style={{ color: 'var(--muted)', backgroundColor: 'var(--surface)' }}
        >
          GAMING CREATOR • SINCE 2021
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 w-full"
          style={{ color: 'var(--text)' }}
        >
          SNAZZYZONE
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight mb-8"
          style={{ color: 'var(--muted)' }}
        >
          Gaming. Creating. Coming back.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl mb-12 leading-relaxed"
          style={{ color: 'var(--muted)' }}
        >
          Started with a channel and a dream. Years later, the journey is still going.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="https://www.youtube.com/@SnazzyZone"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full flex items-center justify-center gap-2 text-sm font-bold tracking-wide transition-transform hover:scale-105 min-h-[48px]"
            style={{ backgroundColor: 'var(--text)', color: 'var(--bg)' }}
          >
            <Play className="w-4 h-4 fill-current" />
            WATCH THE CHANNEL
          </a>
          
          <a
            href="#journey"
            className="w-full sm:w-auto px-8 py-4 rounded-full flex items-center justify-center gap-2 text-sm font-bold tracking-wide transition-all hover:bg-white/5 border border-white/10 min-h-[48px]"
            style={{ color: 'var(--text)', backgroundColor: 'transparent' }}
          >
            EXPLORE THE JOURNEY
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
