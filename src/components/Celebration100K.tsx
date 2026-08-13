"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSubscriber } from "@/app/context/SubscriberContext";
import confetti from "canvas-confetti";

const STORAGE_KEY = "snazzyzone_100k_seen";

export default function Celebration100K() {
  const { is100K, subscriberCount, displayCount } = useSubscriber();
  const [showPopup, setShowPopup] = useState(false);
  const [phase, setPhase] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    if (is100K && subscriberCount !== null && subscriberCount >= 100_000) {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) {
        // Slight delay for dramatic effect
        const timer = setTimeout(() => setShowPopup(true), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [is100K, subscriberCount]);

  useEffect(() => {
    if (!showPopup) return;

    // Phase progression
    const timers = [
      setTimeout(() => setPhase(1), 500),   // Background darkens
      setTimeout(() => setPhase(2), 1500),   // 100K appears
      setTimeout(() => setPhase(3), 3000),   // Details fade in
      setTimeout(() => setPhase(4), 4500),   // Story text
      setTimeout(() => setPhase(5), 6000),   // Party roast + CTA
    ];

    // Launch confetti at phase 2
    const confettiTimer = setTimeout(() => {
      launchConfetti();
    }, 1500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(confettiTimer);
    };
  }, [showPopup]);

  const launchConfetti = useCallback(() => {
    const duration = 4000;
    const end = Date.now() + duration;

    const colors = ["#D8B24C", "#F5F5F5", "#6F8F58", "#FFD700"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Big burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.5, y: 0.4 },
        colors,
      });
    }, 300);
  }, []);

  const handleCelebrate = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    launchConfetti();
    setTimeout(() => setShowPopup(false), 1500);
  };

  const handleShare = async () => {
    const text = `🚨 IT FINALLY HAPPENED.\n\nSnazzyZone just hit 100K subscribers.\n\nThe milestone is complete.\n\nNow we're waiting for the party. 🍕😂\n\nhttps://snazzyboisparty.vercel.app/`;

    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setShowPopup(false);
  };

  // Replay button for users who already saw it
  const hasBeenSeen = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "true";

  return (
    <>
      {/* Replay button — only shows after 100K is reached and popup was dismissed */}
      {is100K && hasBeenSeen && !showPopup && (
        <button
          onClick={() => {
            setPhase(0);
            setShowPopup(true);
          }}
          className="fixed top-16 right-4 md:top-6 md:right-20 z-40 pointer-events-auto
            font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--accent)]
            hover:text-white transition-colors bg-[var(--bg)]/50 backdrop-blur-sm
            border border-[var(--accent)]/20 px-2 py-1 hover:border-[var(--accent)]/50"
        >
          🏆 100K
        </button>
      )}

      {/* Main celebration popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl overflow-y-auto"
          >
            <div className="w-full max-w-lg mx-auto px-6 py-12 md:py-0 flex flex-col items-center text-center min-h-screen md:min-h-0 justify-center">
              {/* Phase 1: Glow */}
              {phase >= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#D8B24C] blur-[200px] opacity-[0.08]" />
                </motion.div>
              )}

              {/* Phase 2: 100K number */}
              {phase >= 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 100 }}
                  className="relative z-10"
                >
                  <span className="font-gamer-mono text-[9px] tracking-[0.4em] text-[var(--muted)] block mb-4">
                    ACHIEVEMENT UNLOCKED
                  </span>
                  <motion.h1
                    className="font-gamer-heading text-8xl md:text-[140px] tracking-[0.05em] text-[var(--accent)] leading-none"
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", damping: 8 }}
                  >
                    100K
                  </motion.h1>
                </motion.div>
              )}

              {/* Phase 3: Channel name + count */}
              {phase >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative z-10 mt-6"
                >
                  <h2 className="font-gamer-heading text-3xl md:text-5xl tracking-widest text-[var(--text)] mb-2">
                    SNAZZYZONE
                  </h2>
                  <p className="font-gamer-mono text-[10px] md:text-xs tracking-[0.3em] text-[var(--muted)]">
                    100,000 SUBSCRIBERS
                  </p>
                </motion.div>
              )}

              {/* Phase 4: Story text */}
              {phase >= 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative z-10 mt-10 space-y-3"
                >
                  <p className="font-gamer-mono text-[9px] tracking-[0.2em] text-[var(--muted)]">
                    FROM 30 DEC 2021
                  </p>
                  <p className="font-gamer-mono text-[9px] tracking-[0.2em] text-[var(--accent)]">
                    TO 100K.
                  </p>
                  <div className="w-8 h-[1px] bg-[var(--muted)]/20 mx-auto my-4" />
                  <p className="font-gamer-body text-sm text-[var(--muted)] tracking-wider">
                    STILL PLAYING.
                  </p>
                  <p className="font-gamer-body text-sm text-[var(--muted)] tracking-wider">
                    STILL CREATING.
                  </p>
                  <p className="font-gamer-body text-sm text-[var(--text)] tracking-wider">
                    STILL HERE.
                  </p>
                </motion.div>
              )}

              {/* Phase 5: Party roast + CTAs */}
              {phase >= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative z-10 mt-12 w-full max-w-xs"
                >
                  {/* Party roast */}
                  <div className="border border-[var(--muted)]/10 p-4 mb-8">
                    <span className="font-gamer-mono text-[8px] tracking-[0.3em] text-[var(--muted)] block mb-2">
                      PARTY STATUS
                    </span>
                    <span className="font-gamer-heading text-lg tracking-wider text-[var(--accent)] block mb-2">
                      🚨 STILL PENDING
                    </span>
                    <p className="font-gamer-mono text-[8px] tracking-[0.15em] text-[var(--muted)]">
                      100K ACHIEVED. PARTY? UNKNOWN.
                    </p>
                    <p className="font-gamer-body text-[10px] text-[var(--muted)]/60 mt-2 italic">
                      &quot;Bro has officially run out of excuses.&quot;
                    </p>
                  </div>

                  {/* Sound toggle */}
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--muted)] mb-6 block mx-auto hover:text-[var(--text)] transition-colors"
                  >
                    {soundEnabled ? "🔊 SOUND ON" : "🔇 SOUND OFF"}
                  </button>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleCelebrate}
                      className="w-full min-h-[56px] bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-black font-gamer-mono text-[10px] tracking-[0.3em] transition-colors flex items-center justify-center"
                    >
                      CELEBRATE 🎉
                    </button>
                    <button
                      onClick={handleShare}
                      className="w-full min-h-[56px] bg-white/10 hover:bg-white/20 text-white font-gamer-mono text-[10px] tracking-[0.3em] transition-colors flex items-center justify-center"
                    >
                      SHARE THE NEWS
                    </button>
                    <button
                      onClick={handleClose}
                      className="w-full min-h-[48px] text-[var(--muted)] hover:text-white font-gamer-mono text-[9px] tracking-[0.2em] transition-colors flex items-center justify-center"
                    >
                      CLOSE
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
