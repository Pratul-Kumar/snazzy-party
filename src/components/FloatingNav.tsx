"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "01 JOURNEY", href: "#journey" },
    { label: "02 GAMES", href: "#games" },
    { label: "03 CHANNELS", href: "#channels" },
    { label: "04 2026", href: "#2026" },
    { label: "05 ARENA", href: "#arena" }
  ];

  return (
    <>
      {/* Desktop Nav */}
      <div className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-8 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 gamer-border">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="SnazzyZone Logo" className="w-8 h-8 rounded-full border border-white/20" />
            <div className="text-xl font-bold tracking-tighter text-white font-gamer-heading">
              SNAZZYZONE
            </div>
          </div>
          <div className="flex items-center gap-6">
            {navLinks.map((link, i) => (
              <a key={i} href={link.href} className="text-xs font-mono text-white/70 hover:text-white transition-colors font-gamer-body">
                {link.label}
              </a>
            ))}
          </div>
          <a href="#arena" className="bg-white/10 hover:bg-white/20 text-white font-mono text-xs px-4 py-2 rounded-full transition-colors border border-white/10 font-gamer-body">
            [ PLAY ]
          </a>
        </div>
      </div>

      {/* Mobile Nav Trigger */}
      <div className="md:hidden fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
        <button 
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-between bg-black/50 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 text-white gamer-border"
        >
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="SnazzyZone Logo" className="w-8 h-8 rounded-full border border-white/20" />
            <span className="font-bold tracking-tighter font-gamer-heading">SNAZZYZONE</span>
          </div>
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-white p-2"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col items-center gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={i}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.2 }}
                  className="text-4xl sm:text-5xl font-black tracking-tighter text-white hover:text-[#ff3b30] transition-colors font-gamer-heading"
                >
                  {link.label.split(" ")[1]}
                </motion.a>
              ))}
              <motion.a 
                href="#arena"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-8 border border-white/20 px-8 py-4 rounded-full text-white font-mono text-sm tracking-widest font-gamer-body"
              >
                [ PLAY NOW ]
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
