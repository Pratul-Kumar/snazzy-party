"use client";
import { ShieldAlert, Menu, X } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleRecover = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff3838", "#ffcc00", "#00d084", "#ffffff"],
    });
  };

  const links = ["Evidence", "Excuses", "Debt", "Timeline", "Complaint"];

  return (
    <nav className="fixed top-8 sm:top-10 left-0 w-full z-40 px-3 sm:px-4 md:px-8">
      <div className="max-w-7xl mx-auto glass-card rounded-2xl p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <ShieldAlert className="text-accent animate-pulse flex-shrink-0" size={24} />
          <span className="font-bold text-base sm:text-lg md:text-xl hidden sm:block glow-text truncate">Party Recovery Dept.</span>
          <span className="font-bold text-base sm:hidden glow-text">PRD</span>
        </div>

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium hover:text-accent transition-colors whitespace-nowrap">
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <button
            onClick={handleRecover}
            className="glow-border bg-accent/20 hover:bg-accent/40 text-accent font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-xs sm:text-sm md:text-base whitespace-nowrap"
          >
            Recover Party
          </button>
          
          <button className="md:hidden text-text p-1" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass-card mt-2 rounded-2xl p-3 sm:p-4 flex flex-col gap-3 sm:gap-4">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium hover:text-accent transition-colors py-1"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
