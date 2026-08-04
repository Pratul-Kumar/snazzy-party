"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { usePortal } from '../app/context/PortalContext';
import confetti from 'canvas-confetti';
import { gsap } from 'gsap';
import { useEffect } from 'react';

const backdropStyle = "fixed inset-0 z-[100] bg-black bg-opacity-80 backdrop-blur-md";
const modalStyle = "fixed inset-0 z-[110] flex items-center justify-center p-4";
const cardStyle = "bg-gray-900 bg-opacity-95 rounded-xl border-4 border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.5)] max-w-3xl w-full p-6 text-white";

export const SecurityPopup = () => {
  const { hasEntered, enterPortal } = usePortal();

  const handleEnter = () => {
    // confetti burst
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    // slight shake using gsap on body
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
          className={backdropStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={modalStyle}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={cardStyle}>
              <h1 className="text-3xl font-bold text-center mb-4 glow-text">Premium Government Portal</h1>
              <p className="text-center mb-2">⚠️ OFFICIAL GOVERNMENT NOTICE</p>
              <p className="text-center mb-4 italic">Ministry of Party Recovery – Government of Hungry Friends</p>
              <p className="text-center mb-2">You are attempting to access a <strong>Restricted Party Investigation Portal</strong>.</p>
              <div className="border-t border-gray-700 my-4 py-2">
                <p className="text-center font-mono text-sm mb-2">CASE STATUS: <span className="text-red-500 font-bold">ACTIVE</span></p>
                <p className="text-center">Subject: SnazzyZone</p>
                <p className="text-center">Case Number: PRD-100K-2026</p>
                <p className="text-center">Reason: Multiple celebrations have gone missing.</p>
              </div>
              <div className="flex items-center justify-center mb-4">
                <input type="checkbox" id="agree" className="mr-2" />
                <label htmlFor="agree" className="text-sm">I promise to stay hungry until justice is served.</label>
              </div>
              <div className="text-center">
                <button
                  onClick={handleEnter}
                  className="px-6 py-2 bg-red-600 rounded hover:bg-red-700 transition"
                >
                  ENTER INVESTIGATION PORTAL
                </button>
              </div>
              <p className="text-xs text-gray-400 opacity-50 text-center mt-4">
                ⚠ This website is a fan‑made parody created only for entertainment and to celebrate SnazzyZone's 100K milestone. All investigations, charges, complaints and reports shown here are completely fictional.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
