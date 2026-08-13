"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Map, Gamepad2, Target, Menu } from "lucide-react";

interface MobileBottomNavProps {
  onMenuClick: () => void;
}

export default function MobileBottomNav({ onMenuClick }: MobileBottomNavProps) {
  const [activeId, setActiveId] = useState<string>("journey");
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["journey", "games", "questlog"];
      const scrollY = window.scrollY;
      
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - 300) {
          setActiveId(id);
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "journey", label: "JOURNEY", icon: Map },
    { id: "games", label: "GAMES", icon: Gamepad2 },
    { id: "questlog", label: "QUEST", icon: Target },
  ];

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-[50] md:hidden pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-4 mb-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-around py-3 px-2 shadow-2xl relative overflow-hidden">
        {/* Active Indicator Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{ background: 'linear-gradient(to top, var(--accent) 0%, transparent 100%)' }}
        />

        {navItems.map(item => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[48px] transition-colors relative z-10 ${isActive ? "text-[var(--accent)]" : "text-[var(--muted)]"}`}
            >
              <item.icon size={20} className="mb-1" strokeWidth={isActive ? 2.5 : 2} />
              <span className="font-gamer-mono text-[8px] tracking-[0.2em]">{item.label}</span>
              {isActive && (
                <motion.div layoutId="nav-indicator" className="absolute -bottom-3 w-1 h-1 rounded-full bg-[var(--accent)]" />
              )}
            </button>
          )
        })}

        <button
          onClick={onMenuClick}
          className="flex flex-col items-center justify-center min-w-[64px] min-h-[48px] text-[var(--muted)] hover:text-white transition-colors relative z-10"
        >
          <Menu size={20} className="mb-1" />
          <span className="font-gamer-mono text-[8px] tracking-[0.2em]">MENU</span>
        </button>

      </div>
    </motion.div>
  );
}
