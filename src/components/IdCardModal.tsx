"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import { useUser, getXPForLevel } from "@/app/context/UserContext";
import { CONFIG } from "@/lib/config";
import toast from "react-hot-toast";

interface IdCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ALL_ACHIEVEMENTS = [
  { id: "🍕 FIRST BITE", desc: "Created your profile." },
  { id: "🎮 FIRST BLOOD", desc: "Won your first game." },
  { id: "🔥 ON FIRE", desc: "Won 5 games in a row." },
  { id: "👑 ARENA LEGEND", desc: "Reached Level 20." }
];

export default function IdCardModal({ isOpen, onClose }: IdCardModalProps) {
  const { 
    profile, hasIdentity, createIdentity, getHungryLevel, 
    isOwner, setLevelOverride, isAnonymous 
  } = useUser();
  const [name, setName] = useState("");
  const [side, setSide] = useState<"🍕" | "🍗" | "">("");
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);

  // Owner target ID logic
  const [targetId, setTargetId] = useState("");
  const [targetLevel, setTargetLevel] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!name.trim() || !side) {
      toast.error("Enter name and side!");
      setIsLoading(false);
      return;
    }

    try {
      createIdentity(name.trim(), side as "🍕" | "🍗");
      toast.success("Identity Created!");
    } catch (err: any) {
      toast.error(err.message || "Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const captureCard = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, 
        useCORS: true,
        backgroundColor: "#111111", 
      });
      return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/png", 1.0);
      });
    } catch (err) {
      console.error("Failed to capture card", err);
      toast.error("Failed to generate image");
      return null;
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownload = async () => {
    const blob = await captureCard();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `snazzy_zone_${profile?.name.toLowerCase()}.png`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded!");
  };

  const handleShare = async () => {
    const blob = await captureCard();
    if (!blob) return;
    if (navigator.share) {
      try {
        const file = new File([blob], "snazzy_id.png", { type: "image/png" });
        await navigator.share({
          title: "My Snazzy Bois ID",
          text: `Check out my Snazzy Bois ID! Join the party hunt 😂 ${CONFIG.DOMAIN}`,
          files: [file],
        });
      } catch (err) {
        toast.error("Sharing canceled or failed.");
      }
    } else {
      toast.error("Native sharing not supported on this device.");
    }
  };

  const handleOwnerUpdate = async () => {
    if (!targetId.trim() || !targetLevel.trim()) {
      toast.error("Enter both Snazzy ID and Level");
      return;
    }
    
    // Server-side update simulation
    const { doc, setDoc, getDoc } = require("firebase/firestore");
    const { db } = require("@/lib/firebase");
    const docRef = doc(db, "users", targetId.trim());
    
    try {
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        toast.error("User not found!");
        return;
      }
      
      const newLevel = parseInt(targetLevel);
      const newXp = getXPForLevel(newLevel);
      
      await setDoc(docRef, { level: newLevel, xp: newXp }, { merge: true });
      toast.success(`Updated ${targetId} to Level ${newLevel}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update level.");
    }
  };

  if (!isOpen) return null;

  // Calculate Progress
  let progress = 0;
  let nextXp = 0;
  if (profile && profile.role !== "OWNER") {
    const currentBaseXp = getXPForLevel(profile.level);
    nextXp = getXPForLevel(profile.level + 1);
    const xpIntoLevel = profile.xp - currentBaseXp;
    const xpNeededForLevel = nextXp - currentBaseXp;
    progress = Math.min(100, Math.max(0, (xpIntoLevel / xpNeededForLevel) * 100));
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        style={{ background: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(10px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white/50 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {!hasIdentity ? (
            <div className="surface p-8 sm:p-10 rounded-[32px]">
              <h2 className="text-xl sm:text-2xl font-black mb-2 text-white">
                Enter the Arena 👀
              </h2>
              <p className="text-muted text-xs sm:text-sm mb-6 leading-relaxed">
                Play instantly. Progress saved on this device.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={25}
                  placeholder="Enter Snazzy Name..."
                  className="w-full bg-black/50 border border-white/10 p-3 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none"
                />
                
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted text-center">Choose your side</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSide("🍕")}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                        side === "🍕" ? "border-accent bg-accent/20" : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <span className="text-3xl">🍕</span>
                      <span className="font-bold text-white tracking-widest text-[10px] uppercase">Pizza</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSide("🍗")}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                        side === "🍗" ? "border-gold bg-gold/20" : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <span className="text-3xl">🍗</span>
                      <span className="font-bold text-white tracking-widest text-[10px] uppercase">Biryani</span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform disabled:opacity-50 mt-4"
                >
                  {isLoading ? "PLEASE WAIT..." : "CREATE MY ID"}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              <div 
                ref={cardRef} 
                className="bg-[#111] border border-white/10 p-6 sm:p-8 rounded-[32px] relative overflow-hidden"
              >
                {/* ID Header */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[60px] rounded-full pointer-events-none" />
                <p className="text-[9px] uppercase tracking-widest text-muted font-bold mb-6">
                  SNAZZYZONE ID
                </p>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">
                      {profile?.odId}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-none mb-2 break-all">
                      {profile?.name}
                    </h2>
                    <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      <span className="text-sm">{profile?.side}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-gold">
                        {profile?.title}
                      </span>
                    </div>
                  </div>
                  
                  {isOwner && (
                    <div className="bg-gold/20 border border-gold/50 px-3 py-1 rounded-full text-xs font-black text-gold uppercase tracking-widest">
                      👑 OWNER
                    </div>
                  )}
                </div>

                {/* Level Progress */}
                {!isOwner && (
                  <div className="mb-8 bg-black/40 p-4 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <span className="text-sm font-black text-muted uppercase tracking-widest">Level </span>
                        <span className="text-2xl font-black text-white">{profile?.level}</span>
                      </div>
                      <div className="text-xs font-bold text-muted text-right">
                        <span className="text-white">{profile?.xp} XP</span> / {nextXp} XP
                      </div>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-accent" 
                      />
                    </div>
                  </div>
                )}

                {/* Stats Grid */}
                {!isOwner && (
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">🎮 Games</div>
                      <div className="text-2xl font-black text-white">{profile?.stats?.gamesPlayed || 0}</div>
                    </div>
                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">🏆 Wins</div>
                      <div className="text-2xl font-black text-white">{profile?.stats?.wins || 0}</div>
                    </div>
                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">✍️ Petitions</div>
                      <div className="text-2xl font-black text-white">{profile?.stats?.petitionsCreated || 0}</div>
                    </div>
                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-accent/5" />
                      <div className="relative z-10 text-[10px] font-black uppercase tracking-widest text-accent mb-1">🔥 Pressure</div>
                      <div className="relative z-10 text-2xl font-black text-white">{profile?.stats?.partyPressure || 0}</div>
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {!isOwner && (
                  <div className="mb-8">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-3">🏅 ACHIEVEMENTS</h4>
                    <div className="space-y-2">
                      {ALL_ACHIEVEMENTS.map(ach => {
                        const unlocked = profile?.achievements?.includes(ach.id);
                        return (
                          <div key={ach.id} className={`flex items-center gap-3 p-3 rounded-xl border ${unlocked ? 'bg-gold/10 border-gold/20' : 'bg-white/5 border-white/5 opacity-50'}`}>
                            <div className="text-lg">{unlocked ? '✓' : '🔒'}</div>
                            <div>
                              <div className={`text-xs font-bold tracking-widest uppercase ${unlocked ? 'text-gold' : 'text-white'}`}>{ach.id}</div>
                              <div className="text-[10px] text-muted">{ach.desc}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex justify-between items-end pt-6 border-t border-white/10 mt-6">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-white">SNAZZY BOIS</div>
                    <div className="text-[10px] font-bold text-accent uppercase tracking-widest">
                      100K PARTY HUNT
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded-xl">
                    <QRCodeSVG 
                      value={CONFIG.DOMAIN} 
                      size={64}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="L"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleDownload}
                  disabled={isExporting}
                  className="surface flex items-center justify-center gap-2 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors"
                >
                  <Download size={16} />
                  Download
                </button>
                <button
                  onClick={handleShare}
                  disabled={isExporting}
                  className="bg-white text-black flex items-center justify-center gap-2 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform"
                >
                  <Share2 size={16} />
                  Share ID
                </button>
              </div>
              
              {/* Owner Controls */}
              {isOwner && (
                <div className="surface p-6 rounded-2xl border border-gold/30 mt-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gold mb-4">👑 OWNER CONTROLS</h4>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="User's Snazzy ID (e.g. SB_XXXX)"
                      value={targetId}
                      onChange={(e) => setTargetId(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 p-3 rounded-xl text-white text-sm focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="New Level"
                        value={targetLevel}
                        onChange={(e) => setTargetLevel(e.target.value)}
                        className="w-1/2 bg-black/50 border border-white/10 p-3 rounded-xl text-white text-sm focus:outline-none"
                      />
                      <button
                        onClick={handleOwnerUpdate}
                        className="w-1/2 bg-gold text-black rounded-xl font-bold text-sm uppercase"
                      >
                        Set Level
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
