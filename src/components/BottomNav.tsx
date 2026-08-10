"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Gamepad2, Trophy, UtensilsCrossed, IdCard } from 'lucide-react';
import { useUser } from '@/app/context/UserContext';
import { usePortal } from '@/app/context/PortalContext';

interface BottomNavProps {
  onPlayClick: () => void;
  onIdClick: () => void;
}

export default function BottomNav({ onPlayClick, onIdClick }: BottomNavProps) {
  const { user } = useUser();
  const { hasEntered } = usePortal();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  if (!hasEntered) {
    return null;
  }

  const handleScroll = (id: string) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-black/70 backdrop-blur-xl border-t border-white/5 pb-[env(safe-area-inset-bottom)]"
      >
        <div className="flex items-center justify-between h-[64px] px-2">
          {/* Hunt */}
          <button
            onClick={() => handleScroll('hunt')}
            className={`flex-1 flex flex-col items-center justify-center min-h-[48px] min-w-[48px] gap-1 transition-colors ${
              activeTab === 'hunt' ? 'text-[var(--accent)]' : 'text-[var(--muted)] hover:text-white'
            }`}
          >
            <Home size={20} />
            <span className="text-[9px] uppercase tracking-wider font-bold">Hunt</span>
          </button>

          {/* Play */}
          <button
            onClick={() => {
              setActiveTab('play');
              onPlayClick();
            }}
            className="flex-1 flex flex-col items-center justify-center min-h-[48px] min-w-[48px] gap-1 transition-colors text-[var(--accent)] hover:opacity-80"
          >
            <Gamepad2 size={22} className="drop-shadow-[0_0_8px_rgba(255,59,48,0.5)]" />
            <span className="text-[9px] uppercase tracking-wider font-bold">Play</span>
          </button>

          {/* Arena */}
          <button
            onClick={() => handleScroll('arena')}
            className={`flex-1 flex flex-col items-center justify-center min-h-[48px] min-w-[48px] gap-1 transition-colors ${
              activeTab === 'arena' ? 'text-[var(--accent)]' : 'text-[var(--muted)] hover:text-white'
            }`}
          >
            <Trophy size={20} />
            <span className="text-[9px] uppercase tracking-wider font-bold">Arena</span>
          </button>

          {/* ID */}
          <button
            onClick={() => {
              setActiveTab('id');
              onIdClick();
            }}
            className={`flex-1 flex flex-col items-center justify-center min-h-[48px] min-w-[48px] gap-1 transition-colors ${
              activeTab === 'id' ? 'text-[var(--accent)]' : 'text-[var(--muted)] hover:text-white'
            }`}
          >
            <IdCard size={20} />
            <span className="text-[9px] uppercase tracking-wider font-bold">ID</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
