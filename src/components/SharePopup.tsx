"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShare } from "../app/context/ShareContext";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import { Download, Share2, Copy, X } from "lucide-react";
import toast from "react-hot-toast";

const BADGES = [
  "🍕 Pizza Inspector",
  "🍗 Biryani Commander",
  "🍔 Burger Boss",
  "🍟 Fries Collector",
  "🎂 Cake Hunter",
  "😂 Excuse Detective",
  "🎮 AFK Party Finder",
  "🍛 Food Critic",
  "👑 Supreme Hungry Legend"
];

const WA_MESSAGES = [
  "😂 BREAKING NEWS\n98.2K ✔\nBirthday Coming ✔\nParty ❌\nJoin the hunt 😂\nhttps://snazzyparty.vercel.app",
  "🚨 MISSING\nItem: 🍕 Party\nReward: Unlimited Respect\nHelp us find it 👇\nhttps://snazzyparty.vercel.app",
  "Mission Update 🎮\nMain Quest: Find The Missing Party\nDifficulty: IMPOSSIBLE 😂\nNeed Backup 👇\nhttps://snazzyparty.vercel.app",
  "Bro...\nWe signed the petition.\nNow it's your turn 😂\nhttps://snazzyparty.vercel.app"
];

export default function SharePopup() {
  const { isShareOpen, closeShare } = useShare();
  const [badge, setBadge] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isShareOpen) {
      setBadge(BADGES[Math.floor(Math.random() * BADGES.length)]);
    }
  }, [isShareOpen]);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: "#000",
        logging: false,
        useCORS: true
      });
      
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "party-hunt-card.png";
      link.click();
      toast.success("Card Downloaded! 🎉");
    } catch (err) {
      toast.error("Failed to generate card");
    } finally {
      setIsGenerating(false);
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join the Snazzy Party Hunt!",
          text: "Bro is at 98.2K and his birthday is coming. Where is the party? 😂",
          url: "https://snazzyparty.vercel.app",
        });
        toast.success("🎉 Another hungry friend has joined!\n+10 Pressure on SnazzyZone 😂", { duration: 4000 });
      } catch (err) {
        // user cancelled
      }
    } else {
      copyLink();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText("https://snazzyparty.vercel.app");
    toast.success("Link copied! Share it everywhere.");
  };

  const shareWhatsApp = () => {
    const msg = WA_MESSAGES[Math.floor(Math.random() * WA_MESSAGES.length)];
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, "_blank");
    toast.success("🎉 +10 Pressure on SnazzyZone 😂", { duration: 4000 });
  };

  return (
    <AnimatePresence>
      {isShareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeShare}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[400px] max-h-[90dvh] flex flex-col bg-[#111] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
          >
            <button onClick={closeShare} className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white backdrop-blur-md">
              <X size={20} />
            </button>

            <div className="p-6 text-center border-b border-white/5 shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-accent/10 blur-[50px] rounded-t-full" />
              <h2 className="text-2xl font-black uppercase tracking-tight text-white relative z-10">
                🎉 Another Hungry Friend?
              </h2>
              <p className="text-xs font-bold text-muted uppercase tracking-widest mt-2 relative z-10">
                The more people join...<br/>the harder it becomes to escape 😂
              </p>
            </div>

            <div className="overflow-y-auto p-6 scrollbar-hide flex-1">
              
              {/* THE PREMIUM SHARE CARD */}
              <div 
                ref={cardRef} 
                className="w-full aspect-[4/5] bg-gradient-to-br from-[#1a1a1a] to-black rounded-3xl border-2 border-white/10 relative overflow-hidden flex flex-col p-6 shadow-2xl mb-8"
              >
                {/* Noise and glow layers */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')] opacity-50 mix-blend-overlay" />
                <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-accent/20 rounded-full blur-[60px]" />
                
                <div className="relative z-10 flex flex-col h-full">
                  
                  <div className="text-center mb-6">
                    <p className="text-[10px] font-black uppercase text-accent tracking-[0.2em] mb-1">🚨 Party Hunt 🚨</p>
                    <p className="text-sm font-bold text-white/80">I officially joined</p>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-tight mt-1">THE SNAZZY<br/>PARTY HUNT</h3>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6 text-center backdrop-blur-sm">
                    <p className="text-[10px] uppercase font-bold text-muted tracking-widest mb-1">Rank</p>
                    <p className="text-lg font-black text-gold">{badge}</p>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted tracking-widest">Subscribers</p>
                        <p className="text-base font-black text-white">98.2K 🚀</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-bold text-muted tracking-widest">Birthday</p>
                        <p className="text-base font-black text-white">16 August 🎂</p>
                      </div>
                    </div>

                    <div className="text-center bg-accent/10 border border-accent/20 rounded-xl p-3">
                      <p className="text-[10px] uppercase font-bold text-accent tracking-widest mb-1">Mission</p>
                      <p className="text-sm font-black text-white uppercase leading-snug">Convince SnazzyZone<br/>to finally give<br/>THE PARTY 🍕</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-end">
                    <div>
                      <p className="text-[9px] uppercase font-bold text-muted tracking-widest mb-1">Waiting Since</p>
                      <p className="text-xs font-black text-white">50K 😭</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-[8px] uppercase font-bold text-muted tracking-widest">Built with ❤️ by<br/>SNAZZY BOIS</p>
                      <div className="bg-white p-1 rounded-lg">
                        <QRCodeSVG value="https://snazzyparty.vercel.app" size={48} level="L" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button onClick={shareWhatsApp} className="bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/20 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                  <Share2 size={14} /> WhatsApp
                </button>
                <button onClick={handleDownload} disabled={isGenerating} className="bg-white/10 text-white hover:bg-white/20 border border-white/10 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                  <Download size={14} /> {isGenerating ? "Saving..." : "Save PNG"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={copyLink} className="bg-white text-black hover:bg-white/90 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                  <Copy size={14} /> Copy Link
                </button>
                <button onClick={shareNative} className="bg-accent text-white hover:bg-accent/90 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                  <Share2 size={14} /> Native Share
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
