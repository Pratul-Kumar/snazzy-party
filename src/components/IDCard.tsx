"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  { label: "Subscribers", value: "100,000+" },
  { label: "Parties Given", value: "0" },
  { label: "Excuses Used", value: "∞" },
  { label: "Trust Level", value: "0%" },
];

export default function IDCard() {
  return (
    <section className="section-snap">
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 blur-[150px] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-lg w-full"
      >
        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-[0.2em]">
            Official ID Card
          </span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        {/* ID Card */}
        <div className="surface p-6 sm:p-8 relative overflow-hidden">
          {/* Accent stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />

          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] mb-1">Investigation Subject</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">SnazzyZone</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">YouTuber · Content Creator</p>
            </div>
            <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center">
              <span className="text-2xl">🎬</span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="surface-interactive p-3 sm:p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-1.5">{stat.label}</p>
                <p className={`text-lg sm:text-xl font-bold ${stat.label === "Parties Given" || stat.label === "Trust Level" ? "text-red-400" : ""}`}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Verdict strip */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
            <span className="glow-dot" />
            <p className="text-xs font-medium text-red-400">
              Classification: <span className="text-[var(--text-primary)] font-semibold">Serial Party Defaulter</span>
            </p>
          </div>
        </div>

        {/* Subscriber counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-[0.2em] mb-2">Subscribers at time of offense</p>
          <p className="text-4xl sm:text-5xl font-bold tracking-tight text-accent-gradient">
            <CountUp end={100000} duration={3} separator="," />+
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
