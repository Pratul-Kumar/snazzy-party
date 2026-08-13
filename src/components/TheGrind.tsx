"use client";

import { motion } from "framer-motion";

export default function TheGrind() {
  const words = ["UPLOAD.", "STOP.", "RETURN.", "PLAY.", "CREATE.", "REPEAT."];

  return (
    <section className="min-h-screen bg-[var(--surface)] text-[var(--text)] flex flex-col justify-center items-center px-6 py-24 section-premium">
      <div className="max-w-3xl w-full text-center flex flex-col items-center gap-16">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-black tracking-tighter"
        >
          THE GRIND
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-2xl">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-3xl md:text-5xl font-bold text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-300"
            >
              {word}
            </motion.span>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl font-light text-[var(--muted)]"
          >
            "Not every chapter was consistent."
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
            className="text-2xl md:text-3xl font-medium text-[var(--text)]"
          >
            "But the story kept going."
          </motion.p>
        </div>
      </div>
    </section>
  );
}
