"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { subscribeToPetitions } from "../lib/firebase";
import { MessageSquare } from "lucide-react";

export default function PetitionWall() {
  const [petitions, setPetitions] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToPetitions((data) => {
      setPetitions(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare size={16} className="text-muted" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted">Live Petition Wall</h3>
        <div className="flex items-center gap-2 ml-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-[10px] uppercase font-bold text-accent tracking-widest">Live Updates</span>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {petitions.map((petition) => (
            <motion.div
              key={petition.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              layout
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="surface-interactive p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-accent">
                {petition.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold">{petition.name}</h4>
                  <span className="text-[10px] text-muted">
                    {new Date(petition.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm text-text/90 mb-2 leading-relaxed">"{petition.comment}"</p>
                <div className="inline-block bg-white/5 px-2 py-1 rounded text-[10px] uppercase tracking-wider text-muted font-bold">
                  Demands: <span className="text-white">{petition.food}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {petitions.length === 0 && (
          <div className="text-center p-8 text-muted text-sm border border-dashed border-white/10 rounded-2xl">
            No petitions yet. Be the first to demand a party!
          </div>
        )}
      </div>
    </div>
  );
}
