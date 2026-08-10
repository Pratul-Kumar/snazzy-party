"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortal } from "./context/PortalContext";
import EntryRoastPopup from "@/components/EntryRoastPopup";
import MissingPoster from "@/components/MissingPoster";
import LiveFeed from "@/components/LiveFeed";
import ProofHeForgot from "@/components/ProofHeForgot";
import ExcuseHallOfFame from "@/components/ExcuseHallOfFame";
import PetitionSection from "@/components/petition/PetitionSection";
import GamerTouches from "@/components/GamerTouches";
import YouTubeSection from "@/components/YouTubeSection";
import PartyArenaSection from "@/components/PartyArenaSection";
import DoubleTrouble from "@/components/DoubleTrouble";
import BroIsCooked from "@/components/BroIsCooked";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import ChallengeModal from "@/components/ChallengeModal";
import IdCardModal from "@/components/IdCardModal";
import LevelUpAnimation from "@/components/LevelUpAnimation";

export default function Home() {
  const { hasEntered } = usePortal();
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [isIdOpen, setIsIdOpen] = useState(false);

  return (
    <>
      <EntryRoastPopup />
      <LevelUpAnimation />
      
      <Navbar 
        onPlayClick={() => setIsChallengeOpen(true)} 
        onIdClick={() => setIsIdOpen(true)} 
      />

      <AnimatePresence>
        {hasEntered && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div id="hunt">
              <MissingPoster />
            </div>
            
            <div id="feed">
              <LiveFeed />
            </div>
            
            <YouTubeSection />
            
            <div id="games">
              <div id="arena">
                <PartyArenaSection />
              </div>
            </div>
            
            <DoubleTrouble />
            <ProofHeForgot />
            
            <PetitionSection />

            <ExcuseHallOfFame />
            <GamerTouches />
            <BroIsCooked />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>

      <BottomNav 
        onPlayClick={() => setIsChallengeOpen(true)} 
        onIdClick={() => setIsIdOpen(true)} 
      />

      <ChallengeModal isOpen={isChallengeOpen} onClose={() => setIsChallengeOpen(false)} />
      <IdCardModal isOpen={isIdOpen} onClose={() => setIsIdOpen(false)} />
    </>
  );
}

