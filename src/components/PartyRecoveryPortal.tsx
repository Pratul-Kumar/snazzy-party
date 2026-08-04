"use client";
import EmergencyAlert from "./EmergencyAlert";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import ProgressAndDebt from "./ProgressAndDebt";
import Timeline from "./Timeline";
import ExcuseGenerator from "./ExcuseGenerator";
import ComplaintWall from "./ComplaintWall";
import WantedPoster from "./WantedPoster";
import CountdownTimer from "./CountdownTimer";
import Footer from "./Footer";
import FakeNotifications from "./FakeNotifications";
import EasterEgg from "./EasterEgg";

import PartyPredictor from "./PartyPredictor";
import RecoveryForm from "./RecoveryForm";
import RecoveryQueue from "./RecoveryQueue";
import ExcuseAnalyzer from "./ExcuseAnalyzer";

export default function PartyRecoveryPortal() {
  return (
    <div className="relative flex-1 flex flex-col w-full">
      {/* Background Effects */}
      <div className="fixed inset-0 z-[-1] bg-background">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-warning/10 blur-[120px]" />
      </div>

      <EmergencyAlert />
      <Navbar />

      <div className="pt-32 px-4 md:px-8 max-w-7xl w-full mx-auto flex flex-col gap-16 md:gap-24">
        <HeroSection />
        <StatsSection />
        <ProgressAndDebt />
        <Timeline />
        <ExcuseGenerator />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <ComplaintWall />
          <WantedPoster />
        </div>
        <CountdownTimer />
        {/* New Features */}
        <PartyPredictor />
        <RecoveryForm />
        <RecoveryQueue />
        <ExcuseAnalyzer />
      </div>

      <Footer />
      <FakeNotifications />
      <EasterEgg />
    </div>
  );
}
