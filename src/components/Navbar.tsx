"use client";

import { motion } from "framer-motion";
import { Gamepad2, IdCard } from "lucide-react";
import { useUser } from "@/app/context/UserContext";
import { usePortal } from "@/app/context/PortalContext";

interface NavbarProps {
  onPlayClick: () => void;
  onIdClick: () => void;
}

export default function Navbar({ onPlayClick, onIdClick }: NavbarProps) {
  const { profile, hasIdentity, getRank } = useUser();
  const { hasEntered } = usePortal();

  if (!hasEntered) return null;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: "Hunt", id: "hunt" },
    { label: "Games", id: "games" },
    { label: "Petition", id: "petition" },
    { label: "Arena", id: "arena" },
    { label: "Feed", id: "feed" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 h-12 md:h-14 bg-black/60 backdrop-blur-xl border-b border-white/5 flex items-center px-4 md:px-8"
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-xl">🍕</span>
          <span className="font-black text-sm tracking-widest text-white whitespace-nowrap">SNAZZY BOIS</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-[11px] uppercase tracking-widest font-bold text-muted hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onPlayClick}
            className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20 transition-all font-bold text-xs"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>PLAY</span>
          </button>

          <button
            onClick={onIdClick}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors p-1"
          >
            <IdCard className="w-5 h-5 md:w-4 md:h-4" />
            {hasIdentity && profile?.name && (
              <div className="hidden md:flex flex-col items-start text-left">
                <span className="text-xs font-bold leading-none mb-[2px]">{profile.name.split(' ')[0]}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-accent leading-none">
                  {getRank().title}
                </span>
              </div>
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
