"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { subscribeToEvents } from "../lib/firebase";

export default function LiveFeed() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToEvents((data) => {
      setEvents(data);
    });
    return () => unsubscribe();
  }, []);

  const timeAgo = (timestamp: number) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return `${diff} sec ago`;
    const mins = Math.floor(diff / 60);
    if (mins < 60) return `${mins} min ago`;
    return 'hours ago';
  };

  return (
    <section className="w-full max-w-xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-black uppercase tracking-widest text-muted">Live Feed</h3>
        <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-[10px] font-bold text-red-500 tracking-widest uppercase">Live Updates</span>
        </div>
      </div>

      <div className="h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {events.map((evt) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                layout
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="surface p-4 flex gap-4 items-center"
              >
                <div className="flex-shrink-0 text-2xl">
                  {evt.type === 'PETITION' ? '📝' : evt.type === 'VOTE' ? '🍗' : '😂'}
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-text leading-tight mb-1">
                    {evt.message}
                  </p>
                  {evt.detail && (
                    <p className="text-xs font-medium text-accent">
                      {evt.detail}
                    </p>
                  )}
                </div>
                <div className="text-[10px] font-mono text-muted whitespace-nowrap self-start mt-1">
                  {timeAgo(evt.timestamp)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {events.length === 0 && (
            <div className="text-center p-8 text-muted text-sm border border-dashed border-white/10 rounded-2xl">
              No events yet. Start the roasting!
            </div>
          )}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}} />
    </section>
  );
}
