"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import { Scale } from "lucide-react";

export default function Verdict() {
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
              spread: 100,
              origin: { y: 0.6 },
              colors: ["#ff3b30", "#ffcc00", "#ffffff"],
              disableForReducedMotion: true
            });
          }, 800);
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
        <div className="flex justify-center mb-8">
          <Scale size={48} className="text-white/20" />
        </div>

        <p className="text-sm font-bold text-muted uppercase tracking-[0.2em] mb-8 leading-loose">
          After reviewing<br/>
          <span className="text-white">Evidence • Petitions • Excuses • Votes</span>
        </p>

        <p className="text-lg text-text mb-6">
          The Department concludes SnazzyZone is
        </p>

        <div className="relative inline-block mb-12">
          <motion.div
            initial={{ scale: 2, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="border-4 sm:border-8 border-accent p-4 sm:p-6 rotate-[-2deg]"
          >
            <h2 className="text-5xl sm:text-7xl font-black text-accent uppercase tracking-widest m-0 leading-none shadow-red-500/50 drop-shadow-2xl">
              OFFICIALLY<br/>GUILTY
            </h2>
          </motion.div>
        </div>

        <div className="surface p-6 sm:p-8 max-w-sm mx-auto mb-10 text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
          <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-4">Mandated Punishment</h4>
          <ul className="space-y-3 font-bold text-lg">
            <li className="flex items-center gap-3">🍕 <span className="text-text">Pizza</span></li>
            <li className="flex items-center gap-3">🍗 <span className="text-text">Biryani</span></li>
            <li className="flex items-center gap-3">🥤 <span className="text-text">Cold Drinks</span></li>
            <li className="flex items-center gap-3">🎂 <span className="text-text">Cake</span></li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold text-muted uppercase tracking-widest">Sentence Effective</p>
          <p className="text-xl font-black text-white uppercase tracking-widest">Immediately</p>
          <p className="text-xs font-black text-accent uppercase tracking-[0.3em] mt-4 pt-4 border-t border-white/10 max-w-[200px] mx-auto">
            NO APPEAL
          </p>
        </div>

      </motion.div>
    </section>
  );
}
