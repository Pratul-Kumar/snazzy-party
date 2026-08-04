"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePortal } from "./context/PortalContext";
import GovernmentPopup from "@/components/GovernmentPopup";
import MissingPoster from "@/components/MissingPoster";
import EvidenceRoom from "@/components/EvidenceRoom";
import ExcuseAnalyzer from "@/components/ExcuseAnalyzer";
import PetitionForm from "@/components/PetitionForm";
import PetitionWall from "@/components/PetitionWall";
import PollCard from "@/components/PollCard";
import RecoveryQueue from "@/components/RecoveryQueue";
import PlayerProfile from "@/components/PlayerProfile";
import MissionBoard from "@/components/MissionBoard";
import Verdict from "@/components/Verdict";
import Footer from "@/components/Footer";

export default function Home() {
  const { hasEntered } = usePortal();

  return (
    <>
      <GovernmentPopup />
      
      <AnimatePresence>
        {hasEntered && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <MissingPoster />
            <EvidenceRoom />
            <ExcuseAnalyzer />
            
            <div className="section-premium !py-10">
               <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 text-center">
                 Public <span className="text-accent">Outcry</span>
               </h2>
               <PetitionForm />
               <PetitionWall />
            </div>

            <PollCard />
            <RecoveryQueue />
            
            <div className="section-premium !py-10 grid md:grid-cols-2 gap-6 w-full max-w-[1000px]">
              <PlayerProfile />
              <MissionBoard />
            </div>
            
            <Verdict />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
