"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePortal } from "../app/context/PortalContext";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";

export default function EntryGate() {
  const { hasEntered, enterPortal } = usePortal();
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (!hasEntered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [hasEntered]);

  const handleEnter = () => {
    if (!agreed) return;
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ef4444", "#f97316", "#fafafa"],
    });
    enterPortal();
  };

  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          style={{ background: "rgba(9, 9, 11, 0.97)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* Subtle gradient orb */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
            style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative surface-glass max-w-md w-full p-8 sm:p-10 text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 mb-6">
              <span className="glow-dot" />
              <span className="text-xs font-medium text-red-400 tracking-wide uppercase">Active Investigation</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-gradient">
              Party Recovery Department
            </h1>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 max-w-xs mx-auto">
              You are entering a restricted government portal investigating SnazzyZone's failure to host a party after 100K subscribers.
            </p>

            {/* Case info */}
            <div className="surface p-4 mb-8 text-left space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-[var(--text-muted)] uppercase tracking-wider">Case No.</span>
                <span className="font-mono font-medium">PRD-100K-2026</span>
              </div>
              <div className="h-px bg-[var(--border)]" />
              <div className="flex justify-between text-xs">
                <span className="text-[var(--text-muted)] uppercase tracking-wider">Subject</span>
                <span className="font-medium">SnazzyZone</span>
              </div>
              <div className="h-px bg-[var(--border)]" />
              <div className="flex justify-between text-xs">
                <span className="text-[var(--text-muted)] uppercase tracking-wider">Status</span>
                <span className="font-medium text-red-400">Active — No Party Found</span>
              </div>
            </div>

            {/* Agreement */}
            <label className="flex items-start gap-3 text-left mb-6 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-[var(--border)] bg-[var(--bg)] accent-[var(--accent)] flex-shrink-0"
              />
              <span className="text-xs text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text-primary)] transition-colors">
                I promise to stay hungry until justice is served.
              </span>
            </label>

            <button
              onClick={handleEnter}
              disabled={!agreed}
              className="btn-primary w-full disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              Enter Investigation Portal
            </button>

            <p className="text-[10px] text-[var(--text-muted)] mt-6 leading-relaxed">
              Fan-made parody for entertainment. All charges are fictional.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
