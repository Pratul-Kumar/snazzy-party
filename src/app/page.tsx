"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePortal } from "./context/PortalContext";
import EntryGate from "@/components/EntryGate";
import IDCard from "@/components/IDCard";
import ExcuseEngine from "@/components/ExcuseEngine";
import RecoveryApplication from "@/components/RecoveryApplication";
import Verdict from "@/components/Verdict";

export default function Home() {
  const { hasEntered } = usePortal();

  return (
    <>
      <EntryGate />
      <AnimatePresence>
        {hasEntered && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <IDCard />
            <ExcuseEngine />
            <RecoveryApplication />
            <Verdict />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
