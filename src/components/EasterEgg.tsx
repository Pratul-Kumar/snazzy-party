"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";
import confetti from "canvas-confetti";

export default function EasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [keysPressed, setKeysPressed] = useState<string[]>([]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      
      setKeysPressed((prev) => {
        const newKeys = [...prev, key].slice(-5);
        if (newKeys.join("") === "PARTY") {
          setIsOpen(true);
          confetti({
            particleCount: 300,
            spread: 120,
            origin: { y: 0.4 },
            zIndex: 1000,
          });
          return [];
        }
        return newKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const downloadWarrant = () => {
    const warrantText = `
=========================================
OFFICIAL ARREST WARRANT
DEPARTMENT OF PARTY RECOVERY
=========================================

DEFENDANT: SnazzyZone
CRIME: Chronic Party Defaulting (100K+ Subs)
OUTSTANDING DEBT: ₹99,99,999

ORDER:
Any friend finding the defendant is authorized to immediately demand Pizza, Samosa, or Gulab Jamun. Excuses will NOT be tolerated.

Signed,
SNAZZY JANTA PARTY
(Friends Association)
=========================================
    `;
    
    const blob = new Blob([warrantText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SNAZZYZONE_WARRANT.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
            className="glass-card bg-zinc-900 border-2 border-accent p-8 rounded-3xl max-w-md w-full relative text-center"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X />
            </button>
            
            <div className="text-5xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-widest">
              Congratulations!
            </h2>
            <p className="text-lg text-accent font-bold mb-8">
              You unlocked the Secret Party Warrant.
            </p>
            
            <button
              onClick={downloadWarrant}
              className="w-full flex items-center justify-center gap-2 bg-white text-black font-black py-4 px-6 rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
              <Download size={20} />
              DOWNLOAD WARRANT
            </button>
            
            <p className="text-xs text-gray-500 mt-6 uppercase tracking-widest">
              Use with extreme caution.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
