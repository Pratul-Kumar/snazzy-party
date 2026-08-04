"use client";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function EmergencyAlert() {
  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 bg-warning text-black py-1.5 sm:py-2 px-3 sm:px-4 shadow-[0_0_15px_rgba(255,204,0,0.5)]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3">
        <AlertTriangle className="animate-pulse flex-shrink-0" size={14} />
        <p className="font-bold text-[11px] sm:text-xs md:text-sm lg:text-base text-center leading-tight">
          ⚠ PARTY EMERGENCY: The accused has failed to organize celebrations. Friends are advised to remain hungry until further notice.
        </p>
        <AlertTriangle className="animate-pulse flex-shrink-0 hidden sm:block" size={14} />
      </div>
    </motion.div>
  );
}
