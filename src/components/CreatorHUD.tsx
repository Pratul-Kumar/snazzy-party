"use client";

import { useState, useEffect } from "react";

export default function CreatorHUD() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", { hour12: false }) + 
        ":" + 
        now.getMilliseconds().toString().padStart(3, "0")
      );
    };
    
    // weird interval for scanline sync feel
    const interval = setInterval(updateTime, 47); 
    updateTime();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden lg:block pointer-events-none scanlines">
      <div className="relative bg-black/40 backdrop-blur-sm gamer-border p-4 rounded-sm text-xs font-gamer-body text-[#ffcc00] shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Scan line effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_51%)] bg-[length:100%_4px] pointer-events-none" />
        <div className="absolute inset-0 bg-[#ffcc00]/5 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex justify-between items-center border-b border-[#ffcc00]/30 pb-2 mb-1 gap-8">
            <span className="font-bold tracking-widest font-gamer-heading">SNAZZYZONE STATUS</span>
            <span className="opacity-70 font-gamer-body">{time}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            <span className="opacity-60">CREATING SINCE:</span>
            <span className="text-right">30.12.2021</span>
            
            <span className="opacity-60">CHANNELS:</span>
            <span className="text-right">03</span>
            
            <span className="opacity-60">CURRENT ERA:</span>
            <span className="text-right">2026</span>
            
            <span className="opacity-60">STATUS:</span>
            <span className="text-right animate-pulse">STILL HERE</span>
          </div>
        </div>
        
        {/* HUD corner decorations */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ffcc00]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ffcc00]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ffcc00]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ffcc00]" />
      </div>
    </div>
  );
}
