"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePortal } from "./context/PortalContext";
import EntryRoastPopup from "@/components/EntryRoastPopup";
import MissingPoster from "@/components/MissingPoster";
import LiveFeed from "@/components/LiveFeed";
import ProofHeForgot from "@/components/ProofHeForgot";
import ExcuseHallOfFame from "@/components/ExcuseHallOfFame";
import ForcePartyForm from "@/components/ForcePartyForm";
import LiveFoodPoll from "@/components/LiveFoodPoll";
import LuckyDraw from "@/components/LuckyDraw";
import HungryQueue from "@/components/HungryQueue";
import GamerTouches from "@/components/GamerTouches";
import YouTubeSection from "@/components/YouTubeSection";
import DoubleTrouble from "@/components/DoubleTrouble";
import BroIsCooked from "@/components/BroIsCooked";
import Footer from "@/components/Footer";

export default function Home() {
  const { hasEntered } = usePortal();

  return (
    <>
      <EntryRoastPopup />
      
      <AnimatePresence>
        {hasEntered && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <MissingPoster />
            <LiveFeed />
            
            <YouTubeSection />
            <DoubleTrouble />
            <ProofHeForgot />
            
            <div className="section-premium !py-10">
               <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-8 text-center uppercase">
                 ✍ FORCE HIM TO GIVE PARTY
               </h2>
               <ForcePartyForm />
            </div>

            <LiveFoodPoll />
            <ExcuseHallOfFame />
            <LuckyDraw />
            <HungryQueue />
            <GamerTouches />
            <BroIsCooked />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
