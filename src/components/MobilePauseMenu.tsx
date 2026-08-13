"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, Map, Gamepad2, Tv, Target, Trophy, Swords, User, Settings, X } from "lucide-react";

interface MobilePauseMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobilePauseMenu({ isOpen, onClose }: MobilePauseMenuProps) {
  
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  const menuItems = [
    { id: "resume", label: "RESUME", icon: Play, action: onClose },
    { id: "journey", label: "THE JOURNEY", icon: Map, action: () => scrollTo("journey") },
    { id: "games", label: "GAME LIBRARY", icon: Gamepad2, action: () => scrollTo("games") },
    { id: "channels", label: "CHANNELS", icon: Tv, action: () => scrollTo("channels") },
    { id: "questlog", label: "QUEST LOG", icon: Target, action: () => scrollTo("questlog") },
    { id: "arena", label: "ARENA", icon: Swords, action: () => scrollTo("arena") },
    { id: "profile", label: "PROFILE", icon: User, action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] md:hidden bg-black/90 backdrop-blur-3xl overflow-y-auto"
        >
          <div className="min-h-screen flex flex-col p-6">
            
            <div className="flex justify-between items-center mb-12 mt-4">
              <span className="font-gamer-mono text-[10px] tracking-[0.4em] text-[var(--accent)]">
                // PAUSE MENU
              </span>
              <button onClick={onClose} className="p-2 -mr-2">
                <X size={24} className="text-[var(--muted)]" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-4">
              {menuItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={item.action}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center w-full min-h-[56px] text-left border-b border-white/5 pb-4 group"
                >
                  <item.icon size={20} className="mr-6 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
                  <span className="font-gamer-heading text-2xl tracking-widest text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="mt-12 mb-8 flex justify-between items-center text-[var(--muted)] border-t border-white/5 pt-6">
              <span className="font-gamer-mono text-[10px] tracking-[0.2em]">SNAZZYZONE v4.0</span>
              <button className="flex items-center gap-2">
                <Settings size={16} />
                <span className="font-gamer-mono text-[10px] tracking-[0.2em]">SETTINGS</span>
              </button>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
