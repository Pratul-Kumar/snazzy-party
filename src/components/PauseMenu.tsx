"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PauseMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "RESUME", id: "" },
  { label: "CAREER", id: "journey" },
  { label: "GAME LIBRARY", id: "games" },
  { label: "QUEST LOG", id: "questlog" },
  { label: "CHANNELS", id: "channels" },
  { label: "ARENA", id: "arena" },
];

export default function PauseMenu({ isOpen, onClose }: PauseMenuProps) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const update = () => setCurrentTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleNav = (id: string) => {
    onClose();
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id) {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex bg-[var(--bg)]/95 backdrop-blur-md"
        >
          {/* Left — Menu */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16">
            
            {/* Pause label */}
            <div className="mb-12">
              <span className="font-gamer-mono text-[9px] tracking-[0.4em] text-[var(--muted)]">
                ◆ PAUSED
              </span>
            </div>

            <nav className="flex flex-col space-y-1">
              {menuItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 + 0.1 }}
                  onClick={() => item.label === "RESUME" ? onClose() : handleNav(item.id)}
                  className="group text-left py-3 px-4 border-l-2 border-transparent 
                    hover:border-[var(--accent)] transition-all duration-200 
                    min-h-[48px] flex items-center gap-4"
                >
                  <span className="font-gamer-heading text-xl md:text-3xl tracking-wider text-[var(--muted)] group-hover:text-[var(--text)] transition-colors">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Right — Decorative (desktop only) */}
          <div className="hidden md:flex w-1/2 flex-col items-center justify-center relative">
            <div className="absolute inset-0 coord-grid opacity-20" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative z-10 text-center"
            >
              <h2 className="font-gamer-heading text-6xl lg:text-8xl tracking-[0.08em] text-[var(--text)]/10">
                SNAZZYZONE
              </h2>
              <div className="font-gamer-mono text-base md:text-lg tracking-[0.3em] text-[var(--accent)]/40 mt-4">
                {currentTime || "00:00"}
              </div>
            </motion.div>
          </div>

          {/* Close — mobile */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 font-gamer-mono text-[10px] tracking-[0.3em] text-[var(--muted)] hover:text-[var(--text)] p-4 min-w-[48px] min-h-[48px] flex items-center justify-center"
          >
            [ X ]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
