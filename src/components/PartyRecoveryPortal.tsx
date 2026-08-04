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
      {/* Background Effects – fixed, behind everything, no layout impact */}
      <div className="fixed inset-0 z-[-1] bg-background pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-warning/10 blur-[120px]" />
      </div>

      <EmergencyAlert />
      <Navbar />

      {/* Main content – consistent py-16 spacing via gap, no extra pb */}
      <div className="pt-28 sm:pt-32 px-4 sm:px-6 md:px-8 max-w-7xl w-full mx-auto flex flex-col gap-12 sm:gap-16 md:gap-20">
        <HeroSection />
        <StatsSection />
        <ProgressAndDebt />
        <Timeline />
        <ExcuseGenerator />
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          <ComplaintWall />
          <WantedPoster />
        </div>
        <CountdownTimer />
        <PartyPredictor />
        <RecoveryForm />
        <RecoveryQueue />
        <ExcuseAnalyzer />
      </div>

      <Footer />

      {/* Overlays – fixed/absolute, zero layout impact */}
      <FakeNotifications />
      <EasterEgg />
    </div>
  );
}
