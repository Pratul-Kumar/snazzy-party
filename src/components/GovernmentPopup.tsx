"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePortal } from "../app/context/PortalContext";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";

export default function GovernmentPopup() {
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
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff3b30", "#ffcc00", "#ffffff"],
    });
    enterPortal();
  };

  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(5, 5, 5, 0.85)", backdropFilter: "blur(16px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="surface max-w-lg w-full p-6 sm:p-10 text-center relative overflow-hidden"
          >
            {/* Warning Tape Header */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[repeating-linear-gradient(45deg,#ffcc00,#ffcc00_10px,#000_10px,#000_20px)]" />

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <ShieldAlert className="text-accent" size={32} />
              </div>
            </div>

            <h1 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-accent mb-2">
              ⚠ Official Government Notice
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              Ministry of Party Recovery
            </h2>
            <p className="text-sm text-muted mb-8 italic">
              Government of Hungry Friends
            </p>

            <div className="mb-6">
              <p className="text-sm text-text mb-2">You are attempting to access</p>
              <p className="text-base sm:text-lg font-bold text-gradient">Restricted Party Investigation Portal</p>
            </div>

            <div className="surface-interactive p-4 text-left mb-8 space-y-3">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-muted uppercase tracking-wider">Case</span>
                <span className="font-bold text-accent flex items-center gap-2">
                  <span className="glow-dot" /> ACTIVE
                </span>
              </div>
              <div className="h-px bg-[var(--border)]" />
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-muted uppercase tracking-wider">Subject</span>
                <span className="font-bold">SnazzyZone</span>
              </div>
              <div className="h-px bg-[var(--border)]" />
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-muted uppercase tracking-wider">Case Number</span>
                <span className="font-mono">PRD-100K-2026</span>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-muted mb-8 space-y-1">
              <p>This portal contains:</p>
              <p className="font-medium text-text">• Classified Evidence • Excuse Reports</p>
              <p className="font-medium text-text">• Petition Records • Government Documents</p>
              <p className="mt-4 italic text-accent/80">Unauthorized laughing is permitted.</p>
            </div>

            <label className="flex items-start justify-center gap-3 text-left mb-6 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded border-[var(--border)] bg-[var(--bg)] accent-accent flex-shrink-0"
              />
              <span className="text-xs sm:text-sm font-medium text-text group-hover:text-white transition-colors">
                I promise to stay hungry until justice is served.
              </span>
            </label>

            <button
              onClick={handleEnter}
              disabled={!agreed}
              className="btn-accent w-full disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ENTER INVESTIGATION
            </button>

            <p className="text-[10px] text-muted mt-6 max-w-xs mx-auto leading-relaxed">
              ⚠ Fan-made parody created for entertainment and to celebrate SnazzyZone's 100K milestone. Everything shown is fictional.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
