"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { usePortal } from '../app/context/PortalContext';
import confetti from 'canvas-confetti';
import { gsap } from 'gsap';
import { useEffect } from 'react';

export const SecurityPopup = () => {
  const { hasEntered, enterPortal } = usePortal();

  const handleEnter = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    gsap.fromTo('body', { x: -5 }, { x: 5, duration: 0.1, yoyo: true, repeat: 5 });
    enterPortal();
  };

  // Prevent scrolling when popup is open
  useEffect(() => {
    if (!hasEntered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [hasEntered]);

  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gray-900/95 rounded-xl border-2 sm:border-4 border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.5)] max-w-lg sm:max-w-2xl md:max-w-3xl w-full max-h-[85vh] overflow-y-auto p-4 sm:p-5 md:p-6 text-white my-auto">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 sm:mb-4 glow-text">Premium Government Portal</h1>
              <p className="text-center mb-2 text-sm sm:text-base">⚠️ OFFICIAL GOVERNMENT NOTICE</p>
              <p className="text-center mb-3 sm:mb-4 italic text-xs sm:text-sm md:text-base">Ministry of Party Recovery – Government of Hungry Friends</p>
              <p className="text-center mb-2 text-xs sm:text-sm md:text-base">You are attempting to access a <strong>Restricted Party Investigation Portal</strong>.</p>
              <div className="border-t border-gray-700 my-3 sm:my-4 py-2">
                <p className="text-center font-mono text-xs sm:text-sm mb-2">CASE STATUS: <span className="text-red-500 font-bold">ACTIVE</span></p>
                <p className="text-center text-xs sm:text-sm">Subject: SnazzyZone</p>
                <p className="text-center text-xs sm:text-sm">Case Number: PRD-100K-2026</p>
                <p className="text-center text-xs sm:text-sm">Reason: Multiple celebrations have gone missing.</p>
              </div>
              <div className="flex items-start justify-center gap-2 mb-3 sm:mb-4">
                <input type="checkbox" id="agree" className="mt-1 w-4 h-4 flex-shrink-0" />
                <label htmlFor="agree" className="text-xs sm:text-sm leading-relaxed">I promise to stay hungry until justice is served.</label>
              </div>
              <div className="text-center">
                <button
                  onClick={handleEnter}
                  className="px-5 sm:px-6 py-2.5 sm:py-2 bg-red-600 rounded hover:bg-red-700 transition min-h-[44px] font-bold text-sm sm:text-base"
                >
                  ENTER INVESTIGATION PORTAL
                </button>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 opacity-50 text-center mt-3 sm:mt-4 leading-relaxed">
                ⚠ This website is a fan‑made parody created only for entertainment and to celebrate SnazzyZone's 100K milestone. All investigations, charges, complaints and reports shown here are completely fictional.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
