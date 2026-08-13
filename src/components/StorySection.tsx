"use client";

import { motion } from 'framer-motion';

export default function StorySection() {
  return (
    <section id="journey" className="section-premium py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Cinematic subtle gradient blob behind the text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[120px] opacity-[0.07] pointer-events-none" style={{ backgroundColor: 'var(--text)' }}></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="inline-block mb-10">
            <h2 className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase border-b border-white/10 pb-2" style={{ color: 'var(--muted)' }}>
              MORE THAN JUST GAMING
            </h2>
          </div>
          
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.2] sm:leading-[1.1]" style={{ color: 'var(--text)' }}>
            Channels change. Games change. Life changes. But the controller gets picked up again.
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
