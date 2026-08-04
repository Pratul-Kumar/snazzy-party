"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const EXCUSES = [
  "I'm busy editing.",
  "Next Sunday bro.",
  "Silver Play Button first.",
  "Sponsor payment pending.",
  "My wallet is buffering.",
  "My mom said no.",
  "Budget is under maintenance.",
  "Restaurant server is down.",
  "I forgot.",
  "I thought you forgot.",
  "Let me reach 200K first.",
  "The restaurant is closed forever.",
];

export default function ExcuseEngine() {
  const [excuse, setExcuse] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [count, setCount] = useState(0);

  const generate = async () => {
    setGenerating(true);
    setExcuse(null);

    // Simulate "AI processing"
    await new Promise((r) => setTimeout(r, 1200));

    const result = EXCUSES[Math.floor(Math.random() * EXCUSES.length)];
    setExcuse(result);
    setCount((c) => c + 1);
    setGenerating(false);

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ["#ef4444", "#52525b"],
      gravity: 1.2,
    });
  };

  return (
    <section className="section-snap">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-lg w-full text-center"
      >
        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-[0.2em]">
            AI Excuse Generator
          </span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          Official <span className="text-accent-gradient">Excuse</span> Database
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mb-10 max-w-sm mx-auto leading-relaxed">
          Powered by the Ministry of Excuses. Accuracy rate: 100%.
          Every excuse below has been actually used.
        </p>

        {/* Output area */}
        <div className="surface min-h-[140px] sm:min-h-[160px] flex items-center justify-center p-6 sm:p-8 mb-6 relative overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.02] to-transparent pointer-events-none" />

          <AnimatePresence mode="wait">
            {generating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[var(--text-muted)]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                    />
                  ))}
                </div>
                <p className="text-xs text-[var(--text-muted)]">Scanning excuse database...</p>
              </motion.div>
            ) : excuse ? (
              <motion.div
                key={excuse + count}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xl sm:text-2xl font-semibold italic leading-relaxed">
                  "{excuse}"
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-4">— SnazzyZone, probably</p>
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-[var(--text-muted)] italic"
              >
                Press the button to generate an official excuse.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button onClick={generate} disabled={generating} className="btn-primary disabled:opacity-50">
          {generating ? "Generating..." : "Generate Excuse"}
        </button>

        {count > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] text-[var(--text-muted)] mt-4"
          >
            {count} excuse{count > 1 ? "s" : ""} generated this session
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
