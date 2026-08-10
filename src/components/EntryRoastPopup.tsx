"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePortal } from "../app/context/PortalContext";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { CONFIG } from "../lib/config";

export default function EntryRoastPopup() {
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
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#ff3b30", "#ffffff"],
    });
    enterPortal();
  };

  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(5, 5, 5, 0.90)", backdropFilter: "blur(20px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="surface max-w-md w-full p-8 sm:p-12 text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
              👀 BRO...
            </h1>
            
            <p className="text-xl sm:text-2xl font-bold text-text mb-2">
              {CONFIG.SUBSCRIBER_COUNT} already...
            </p>
            <p className="text-xl sm:text-2xl font-bold text-text mb-2">
              100K loading...
            </p>
            <p className="text-xl sm:text-2xl font-bold text-text mb-2">
              Birthday loading...
            </p>
            <p className="text-xl sm:text-2xl font-black text-accent mb-10 uppercase tracking-widest mt-6">
              Party? Still missing 😂
            </p>

            <label className="flex items-start justify-center gap-4 text-left mb-8 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-6 h-6 rounded border-[var(--border)] bg-[var(--bg)] accent-accent flex-shrink-0"
              />
              <span className="text-sm sm:text-base font-bold text-muted group-hover:text-white transition-colors">
                Yup... I&apos;m waiting too.
              </span>
            </label>

            <button
              onClick={handleEnter}
              disabled={!agreed}
              className="btn-accent w-full py-4 text-lg font-black disabled:opacity-30 disabled:cursor-not-allowed uppercase tracking-widest"
            >
              JOIN THE HUNT
            </button>

            <p className="text-[10px] text-muted mt-8 font-mono">
              Made by hungry friends ❤️ Fan-made parody.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
