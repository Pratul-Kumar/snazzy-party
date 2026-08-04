"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ShieldAlert } from "lucide-react";

export default function MissingPoster() {
  const [tapCount, setTapCount] = useState(0);
  const [classified, setClassified] = useState(false);

  const handleTap = () => {
    if (classified) return;
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= 5) {
      setClassified(true);
    }
  };

  const scrollToForm = () => {
    document.getElementById("petition-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-premium">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <div 
          onClick={handleTap}
          className="relative max-w-md mx-auto paper-texture p-6 sm:p-10 rounded-sm shadow-2xl overflow-hidden cursor-pointer selection:bg-transparent"
        >
          {/* Subtle tape at the top */}
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-32 h-6 bg-white/40 backdrop-blur-sm rotate-[-2deg] shadow-sm z-10" />

          {/* Secret Classified Overlay */}
          {classified && (
            <motion.div
              initial={{ opacity: 0, scale: 1.5, rotateZ: -10 }}
              animate={{ opacity: 1, scale: 1, rotateZ: -15 }}
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
              <div className="border-8 border-red-600 p-4 rotate-[-15deg]">
                <h3 className="text-4xl sm:text-5xl font-black text-red-600 uppercase tracking-widest leading-none text-center">
                  CLASSIFIED<br/>UPDATE
                </h3>
                <p className="text-red-600 font-bold text-center mt-2 text-lg">
                  Party still not located.
                </p>
              </div>
            </motion.div>
          )}

          {/* Missing Stamp */}
          <div className="flex justify-center mb-6">
            <div className="border-4 border-red-600 px-6 py-2 rotate-[-5deg] inline-block">
              <h2 className="text-3xl sm:text-4xl font-black text-red-600 tracking-[0.2em] uppercase m-0">
                MISSING
              </h2>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-center mb-8 uppercase tracking-widest text-black/80">
            Have You Seen This Party?
          </h3>

          <div className="border-y-2 border-black/20 py-4 mb-6 space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-xs uppercase font-bold tracking-wider text-black/60">Last Seen</span>
              <span className="font-bold text-black/90">Before 50K Subscribers</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xs uppercase font-bold tracking-wider text-black/60">Name</span>
              <span className="font-bold text-black/90 text-lg">SnazzyZone's Party</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xs uppercase font-bold tracking-wider text-black/60">Current Status</span>
              <span className="font-bold text-red-600">Still Missing</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xs uppercase font-bold tracking-wider text-black/60">Reward</span>
              <div className="text-right">
                <span className="font-bold text-black/90 block">Unlimited Respect</span>
                <span className="font-bold text-black/90 block">+ 1 Plate Biryani</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-xs uppercase font-bold tracking-wider text-black/60 mb-2">Known Associates (Excuses)</p>
            <ul className="list-disc list-inside text-sm font-medium text-black/80 space-y-1 pl-2">
              <li>Busy Editing</li>
              <li>Wallet Buffering</li>
              <li>Next Sunday</li>
              <li>Silver Play Button</li>
            </ul>
          </div>

          <div className="flex justify-center mb-4">
            <ShieldAlert size={40} className="text-black/20" />
          </div>

          <div className="flex justify-center">
            <button
              onClick={(e) => { e.stopPropagation(); scrollToForm(); }}
              className="bg-black text-white font-bold py-4 px-8 w-full uppercase tracking-widest text-sm hover:bg-black/80 transition-colors"
            >
              Report Sighting
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
