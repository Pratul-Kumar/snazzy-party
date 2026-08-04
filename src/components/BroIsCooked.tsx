"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";

export default function BroIsCooked() {
  const [inView, setInView] = useState(false);
  const verdictRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
          setTimeout(() => {
            confetti({
              particleCount: 150,
              spread: 120,
              origin: { y: 0.6 },
              colors: ["#ff3b30", "#ffcc00", "#ffffff"],
              disableForReducedMotion: true
            });
          }, 600);
        }
      },
      { threshold: 0.5 }
    );

    if (verdictRef.current) {
      observer.observe(verdictRef.current);
    }
    return () => observer.disconnect();
  }, [inView]);

  return (
    <section ref={verdictRef} className="section-premium !py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl mx-auto"
      >
        <p className="text-sm font-bold text-muted uppercase tracking-[0.2em] mb-4">
          🎉 FINAL QUESTION
        </p>

        <div className="relative inline-block mb-12">
          <motion.div
            initial={{ scale: 2, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="border-[6px] sm:border-[8px] border-red-600 p-6 sm:p-8 rotate-[2deg] shadow-2xl bg-black/50 backdrop-blur-md"
          >
            <h2 className="text-5xl sm:text-7xl font-black text-red-600 uppercase tracking-tighter m-0 leading-[0.9] drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              BRO IS<br/>COOKED 🍳
            </h2>
          </motion.div>
        </div>

        <p className="text-xl sm:text-2xl font-black text-white mb-2 uppercase tracking-widest">
          Bro... 100K + Birthday...
        </p>
        <p className="text-sm font-bold text-muted mb-12 uppercase tracking-widest">
          DOUBLE PARTY WHEN? 🍕
        </p>

        <a 
          href="https://www.youtube.com/@SnazzyZone" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-black font-black uppercase tracking-widest text-lg py-4 px-10 rounded-2xl hover:scale-105 active:scale-95 transition-transform inline-block"
        >
          REMIND HIM 😂
        </a>

      </motion.div>
    </section>
  );
}
