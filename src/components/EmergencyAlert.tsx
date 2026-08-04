"use client";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function EmergencyAlert() {
  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 bg-warning text-black py-2 px-4 shadow-[0_0_15px_rgba(255,204,0,0.5)]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 overflow-hidden">
        <AlertTriangle className="animate-pulse flex-shrink-0" size={20} />
        <p className="font-bold text-sm md:text-base whitespace-nowrap animate-[pulse-slow_4s_ease-in-out_infinite]">
          ⚠ PARTY EMERGENCY: The accused has failed to organize celebrations. Friends are advised to remain hungry until further notice.
        </p>
        <AlertTriangle className="animate-pulse flex-shrink-0" size={20} />
      </div>
    </motion.div>
  );
}
