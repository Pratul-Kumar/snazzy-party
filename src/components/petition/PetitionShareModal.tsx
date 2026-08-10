"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Copy, Share2, Megaphone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import { CONFIG } from "@/lib/config";

export interface PetitionV2 {
  id: string;
  username: string;
  foodChoice?: string;
  text: string;
}

export interface PetitionShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  petition: PetitionV2 | null;
}

export default function PetitionShareModal({
  isOpen,
  onClose,
  petition,
}: PetitionShareModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  if (!petition || !isOpen) return null;

  const url = `${CONFIG.DOMAIN}/petition/${petition.id}`;

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

    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `Petition_${petition.username}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
    toast.success("Card Downloaded!");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleWhatsApp = () => {
    const message = `🚨 I signed the Snazzy Party Petition!\n\n"${petition.text}"\n\nJoin the hunt: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleSendToSnazzy = async () => {
    const message = `Check out my petition: ${url}`;
    try {
      await navigator.clipboard.writeText(message);
      toast.success("Message copied! Paste it in the comments.");
      setTimeout(() => {
        window.open("https://www.youtube.com/@SnazzyZone", "_blank");
      }, 1000);
    } catch (err) {
      toast.error("Failed to copy message");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-[420px] max-h-[90vh] overflow-y-auto surface border border-white/10 rounded-[32px] p-6 shadow-2xl hide-scrollbar"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors z-10"
          >
            <X size={20} className="text-white" />
          </button>

          <div className="pt-2 flex flex-col items-center">
            {/* The Petition Card to be captured */}
            <div
              ref={cardRef}
              className="w-full bg-[#111111] border border-white/10 rounded-[32px] p-6 relative overflow-hidden flex flex-col gap-6"
              style={{ width: "100%", maxWidth: "380px", aspectRatio: "4/5" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs text-accent font-bold tracking-widest uppercase mb-1">
                    🚨 PARTY PETITION
                  </p>
                  <p className="text-white font-black text-xl truncate">
                    @{petition.username}
                  </p>
                </div>
              </div>

              {/* Food Choice */}
              {petition.foodChoice && (
                <div className="bg-white/5 rounded-xl p-3 border border-white/10 inline-block w-max">
                  <p className="text-gold font-bold text-sm tracking-wider uppercase">
                    🍗 {petition.foodChoice} REQUIRED
                  </p>
                </div>
              )}

              {/* Quote */}
              <div className="flex-1 flex items-center justify-center py-4">
                <p className="text-2xl font-black text-white italic text-center leading-tight">
                  "{petition.text}"
                </p>
              </div>

              {/* Footer */}
              <div className="mt-auto border-t border-white/10 pt-4 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                    <p className="text-[10px] text-muted font-bold tracking-widest uppercase mb-1">
                      Target
                    </p>
                    <p className="text-sm font-black text-white">
                      {CONFIG.SUBSCRIBER_COUNT} → 100K
                    </p>
                  </div>
                  <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                    <p className="text-[10px] text-muted font-bold tracking-widest uppercase mb-1">
                      Party Status
                    </p>
                    <p className="text-sm font-black text-accent">MISSING</p>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div className="flex-1 pr-4">
                    <p className="text-xs text-muted font-bold tracking-widest uppercase mb-1">
                      Join the Hunt
                    </p>
                    <p className="text-white/80 text-[10px] truncate">
                      {CONFIG.DOMAIN}
                    </p>
                  </div>
                  <div className="bg-white p-2 rounded-xl shrink-0">
                    <QRCodeSVG
                      value={url}
                      size={50}
                      bgColor={"#ffffff"}
                      fgColor={"#000000"}
                      level={"L"}
                      includeMargin={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-3 mt-6">
              <div className="flex gap-3">
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <span className="text-xl">📲</span>
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex-1 bg-white/10 hover:bg-white/15 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Copy size={18} />
                  <span>Copy Link</span>
                </button>
              </div>
              
              <button
                onClick={handleDownload}
                disabled={isExporting}
                className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <Download size={18} />
                <span>{isExporting ? "Exporting..." : "Download Card"}</span>
              </button>

              <button
                onClick={handleSendToSnazzy}
                className="w-full bg-accent text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors shadow-[0_0_20px_rgba(255,59,48,0.3)] mt-2"
              >
                <Megaphone size={20} />
                <span className="uppercase tracking-wider">SEND THIS TO SNAZZYZONE</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
