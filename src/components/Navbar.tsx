"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Youtube } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'HOME', href: '#' },
    { label: 'JOURNEY', href: '#journey' },
    { label: 'GAMES', href: '#games' },
    { label: 'CHANNELS', href: '#channels' },
    { label: 'GOAL', href: '#goal' },
    { label: 'TIC-TAC-TOE', href: '#arena' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 surface-glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold tracking-tighter" style={{ color: 'var(--text)' }}>
              SNAZZYZONE
            </a>
          </div>
          
          <div className="hidden lg:block">
            <div className="flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[var(--muted)] hover:text-[var(--text)] transition-colors text-sm font-medium tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center">
            <a 
              href="https://www.youtube.com/@SnazzyZone" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 btn-primary px-6 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-transform"
              style={{ backgroundColor: 'var(--text)', color: 'var(--bg)' }}
            >
              <Youtube className="w-4 h-4" />
              WATCH ON YOUTUBE
            </a>
          </div>

          <div className="lg:hidden flex flex-col justify-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[var(--muted)] hover:text-[var(--text)] focus:outline-none p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden surface border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/5 rounded-md min-h-[48px] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 px-3">
                <a 
                  href="https://www.youtube.com/@SnazzyZone" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-full text-base font-medium btn-primary"
                  style={{ backgroundColor: 'var(--text)', color: 'var(--bg)' }}
                >
                  <Youtube className="w-5 h-5" />
                  WATCH ON YOUTUBE
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
