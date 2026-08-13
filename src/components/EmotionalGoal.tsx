"use client";

import { motion } from "framer-motion";

export default function EmotionalGoal() {
  const texts = [
    "Not for views.",
    "Not for subscribers.",
    "Just something worth working toward.",
    "One step at a time."
  ];

  return (
    <section className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col justify-center items-center px-6 py-24 relative overflow-hidden section-premium cyber-grid scanlines">
      <div className="max-w-4xl w-full text-center z-10 flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <h2 className="text-8xl md:text-9xl font-black text-[var(--gold)] tracking-tighter font-gamer-heading">
            2026
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tight font-gamer-heading">
            ONE GOAL.
          </h3>
          <p className="text-3xl md:text-5xl font-medium text-[var(--accent)] mt-4 font-gamer-heading">
            🚗 BUY A CAR FOR DAD.
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-8 mt-16">
          {texts.map((text, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-xl md:text-3xl font-light text-[var(--muted)] font-gamer-body"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 w-full max-w-5xl px-6 left-1/2 -translate-x-1/2 flex items-center justify-between text-sm md:text-base font-bold tracking-[0.2em] text-[var(--muted)] font-gamer-body">
        <span>START</span>
        <div className="flex-1 mx-4 relative h-[1px] bg-[var(--text)] opacity-20 overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full w-full bg-[var(--gold)] opacity-100"
          />
        </div>
        <span className="flex items-center gap-2">THE ROAD AHEAD <span className="text-[var(--gold)]">→</span></span>
      </div>
    </section>
  );
}
