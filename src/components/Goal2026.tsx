"use client";

import { motion } from "framer-motion";
import { Car } from "lucide-react";

export default function Goal2026() {
  return (
    <section className="relative py-40 px-6 sm:px-12 bg-black text-[var(--text)] font-[family-name:var(--font-inter)] overflow-hidden flex items-center justify-center min-h-[80vh]">
      {/* Cinematic dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-10"
        >
          <span className="text-[var(--accent)] text-sm md:text-base font-bold tracking-[0.4em] uppercase mb-8 block">
            2026 The Goal
          </span>
          
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter mb-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
            <Car className="w-16 h-16 sm:w-24 sm:h-24 text-[var(--muted)] opacity-50" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
              GET DAD A CAR
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          <p className="text-[var(--muted)] text-xl md:text-3xl leading-relaxed max-w-3xl mx-auto font-light">
            Not every goal is about numbers. One of the biggest goals for 2026 is simple: Buy a car for Dad. One upload. One milestone. One step at a time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
