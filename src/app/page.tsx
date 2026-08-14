"use client";

import { useState, useEffect } from "react";
import { useUser } from "./context/UserContext";

// V4 Components
import { GameLoader } from "@/components/GameLoader";
import PlayerProfile from "@/components/PlayerProfile";
import GamerHUD from "@/components/GamerHUD";
import PauseMenu from "@/components/PauseMenu";

import CareerMode from "@/components/CareerMode";
import GameLibraryV3 from "@/components/GameLibraryV3";
import QuestLog from "@/components/QuestLog";
import ChannelStation from "@/components/ChannelStation";

import SavePointFinale from "@/components/SavePointFinale";
import MobileBottomNav from "@/components/MobileBottomNav";
import MobilePauseMenu from "@/components/MobilePauseMenu";

// Existing Components (preserved)
import SnazzyArenaSection from "@/components/SnazzyArenaSection";
import ChallengeModal from "@/components/ChallengeModal";
import IdCardModal from "@/components/IdCardModal";
import LevelUpAnimation from "@/components/LevelUpAnimation";

const SectionDivider = () => (
  <div className="w-full flex justify-center items-center py-4 md:py-8 relative z-20 opacity-60">
    <div className="h-[1px] w-[50%] max-w-md bg-gradient-to-r from-transparent via-[var(--muted)] to-transparent" />
    <div className="absolute w-1.5 h-1.5 rotate-45 border border-[var(--muted)] bg-[var(--bg)]" />
  </div>
);

export default function Home() {
  const { hasIdentity } = useUser();
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [isIdOpen, setIsIdOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWorldReady, setIsWorldReady] = useState(false);

  // Check if loader should show
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loaded = sessionStorage.getItem("sz_loaded");
      if (loaded) setIsWorldReady(true);
    }
  }, []);

  useEffect(() => {
    if (!hasIdentity && isWorldReady) {
      const timer = setTimeout(() => setIsIdOpen(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [hasIdentity, isWorldReady]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(prev => !prev);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* ═══ GAME LOADER (one-time cinematic boot) ═══ */}
      {!isWorldReady && (
        <GameLoader onComplete={() => setIsWorldReady(true)} />
      )}

      {/* ═══ PERSISTENT WORLD ENVIRONMENT ═══ */}
      <div className="world-env" />
      <div className="world-particles" />
      <div className="world-terrain" />
      <div className="world-fog" />
      <div className="world-vignette" />
      <div className="world-grain" />

      {/* ═══ GAME HUD ═══ */}
      {isWorldReady && (
        <>
          <div className="hidden md:block">
            <GamerHUD onOpenMenu={() => setIsMenuOpen(true)} />
            <PauseMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
          </div>
          <div className="md:hidden">
            <MobileBottomNav onMenuClick={() => setIsMenuOpen(true)} />
            <MobilePauseMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
          </div>
        </>
      )}
      <LevelUpAnimation />

      {/* ═══ GAME WORLD CONTENT ═══ */}
      {isWorldReady && (
        <main className="relative z-10 font-gamer-body">
          
          {/* PLAYER PROFILE — creator identity */}
          <PlayerProfile />



          {/* CAREER — the journey */}
          <div id="journey">
            <CareerMode />
          </div>

          <SectionDivider />

          {/* GAME LIBRARY — the games */}
          <div id="games">
            <GameLibraryV3 />
          </div>

          <SectionDivider />

          {/* QUEST LOG — the missions */}
          <div id="questlog">
            <QuestLog />
          </div>

          <SectionDivider />

          {/* CHANNEL HUB — the broadcast */}
          <div id="channels">
            <ChannelStation />
          </div>

          <SectionDivider />

          {/* ARENA — multiplayer */}
          <div id="arena">
            <SnazzyArenaSection />
          </div>

          {/* END CREDITS — save + developer */}
          <SavePointFinale />
        </main>
      )}

      <ChallengeModal isOpen={isChallengeOpen} onClose={() => setIsChallengeOpen(false)} />
      <IdCardModal isOpen={isIdOpen} onClose={() => setIsIdOpen(false)} />
    </>
  );
}
