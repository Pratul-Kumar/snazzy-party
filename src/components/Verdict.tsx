"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Verdict() {
  const [timeLeft, setTimeLeft] = useState(72 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

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
            Final Verdict
          </span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          The Court Has <span className="text-accent-gradient">Decided</span>
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mb-10 max-w-sm mx-auto leading-relaxed">
          After reviewing all evidence, excuses, and subscriber testimonies, the verdict is clear.
        </p>

        {/* Verdict card */}
        <div className="surface p-6 sm:p-8 mb-8 relative overflow-hidden glow-accent">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />

          <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] mb-4">Official Ruling</p>

          <h3 className="text-3xl sm:text-4xl font-bold mb-2 text-accent-gradient">
            GUILTY
          </h3>
          <p className="text-base text-[var(--text-secondary)] mb-6">
            of chronic party avoidance
          </p>

          <div className="h-px bg-[var(--border)] mb-6" />

          <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] mb-3">Time until enforcement</p>

          {/* Countdown */}
          <div className="flex justify-center items-center gap-3 sm:gap-5 mb-6">
            {[
              { value: pad(hours), label: "hrs" },
              { value: ":", label: "" },
              { value: pad(minutes), label: "min" },
              { value: ":", label: "" },
              { value: pad(seconds), label: "sec" },
            ].map((item, i) =>
              item.label === "" ? (
                <span key={i} className="text-2xl sm:text-3xl font-bold text-[var(--text-muted)] animate-pulse">
                  {item.value}
                </span>
              ) : (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-2xl sm:text-4xl font-bold font-mono tabular-nums">{item.value}</span>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">{item.label}</span>
                </div>
              )
            )}
          </div>

          <p className="text-xs text-[var(--text-secondary)] italic">
            "Friends have been authorized to order food on the accused's tab."
          </p>
        </div>

        {/* Footer */}
        <div className="space-y-3 pt-4">
          <p className="text-xs text-[var(--text-secondary)]">
            Made with 🔥 by <span className="font-semibold text-[var(--text-primary)]">Snazzy Janta Party</span>
          </p>
          <p className="text-[10px] text-[var(--text-muted)]">
            Department of Party Recovery & Celebration Affairs
          </p>
          <div className="h-px bg-[var(--border)] max-w-[200px] mx-auto" />
          <p className="text-[10px] text-[var(--text-muted)]">
            © 2026 All Rights Reserved · No Subscriber Left Hungry™
          </p>
        </div>
      </motion.div>
    </section>
  );
}
