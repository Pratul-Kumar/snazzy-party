"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

const channels = [
  {
    id: "snazzyzone",
    name: "SNAZZY ZONE",
    tagline: "MAIN CHANNEL. Gaming. Experiments. The main journey.",
    url: "https://www.youtube.com/@SnazzyZone",
    color: "#ff3b30",
  },
  {
    id: "snazzyplayz",
    name: "SNAZZY PLAYZ",
    tagline: "GAMING",
    url: "https://www.youtube.com/@Snazzyplayz",
    color: "#ffcc00",
  },
  {
    id: "snazzyflux",
    name: "SNAZZY FLUX",
    tagline: "EXPERIMENTS / CONTENT",
    url: "https://www.youtube.com/@SnazzyFlux",
    color: "#4ade80",
  },
];

export default function ChannelSwitcher() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedChannel = channels[selectedIndex];

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-black py-20 section-premium cyber-grid scanlines font-gamer-body">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <motion.div
          key={selectedChannel.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full blur-[100px]"
          style={{ backgroundColor: selectedChannel.color }}
        />
      </div>

      <div className="z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center lg:items-start gap-16">
        
        {/* Main Display */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedChannel.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center lg:items-start w-full"
            >
              <h2 className="text-5xl sm:text-7xl md:text-[8rem] font-black tracking-tighter text-white leading-none mb-6 font-gamer-heading">
                {selectedChannel.name}
              </h2>
              <p className="text-xl sm:text-2xl text-muted max-w-2xl font-medium mb-10 h-auto sm:h-16 font-gamer-body">
                {selectedChannel.tagline}
              </p>
              <a 
                href={selectedChannel.url}
                className="btn-primary inline-flex items-center gap-2 group px-8 py-4 gamer-border font-gamer-heading"
              >
                <span>VISIT CHANNEL</span>
                <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </AnimatePresence>
          
          <div className="mt-16 text-muted font-mono font-bold tracking-widest text-sm text-center lg:text-left w-full">
            CHANNEL 0{selectedIndex + 1} / 0{channels.length}
          </div>
        </div>

        {/* Side Nav */}
        <div className="w-full lg:w-80 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-4 pb-4 lg:pb-0 hide-scrollbar snap-x snap-mandatory">
          {channels.map((channel, idx) => (
            <button
              key={channel.id}
              onClick={() => setSelectedIndex(idx)}
              className={`snap-center shrink-0 surface-interactive flex items-center justify-between p-6 transition-all duration-300 min-w-[240px] lg:min-w-0 w-full min-h-[80px] ${
                selectedIndex === idx 
                  ? "bg-white/10 text-white shadow-lg gamer-border" 
                  : "border-transparent text-muted hover:text-white border"
              }`}
            >
              <span className="font-black tracking-wide text-lg font-gamer-heading">{channel.name}</span>
              {selectedIndex === idx && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  style={{ backgroundColor: channel.color, boxShadow: `0 0 10px ${channel.color}` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
