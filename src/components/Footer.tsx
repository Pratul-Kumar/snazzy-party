"use client";

import { Share2 } from "lucide-react";

export default function Footer() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "SnazzyZone Investigation Portal",
        text: "I just signed the petition for SnazzyZone's missing 100K party. Join the investigation!",
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <footer className="w-full pb-16 pt-10 px-6 sm:px-10 border-t border-white/5 bg-black mt-20">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        <button 
          onClick={handleShare}
          className="btn-primary !bg-white/10 !text-white hover:!bg-white/20 mb-12 text-sm uppercase tracking-widest font-bold"
        >
          <Share2 size={16} /> Share Investigation
        </button>

        <p className="text-sm font-medium text-muted mb-2">Built with ❤️ by</p>
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-widest mb-1">
          SNAZZY JANTA PARTY
        </h3>
        <p className="text-xs font-bold text-muted uppercase tracking-[0.2em] mb-8">
          (AKA SNAZZY BOIS)
        </p>

        <div className="space-y-2 mb-10">
          <p className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest">
            Department of Party Recovery & Celebration Affairs
          </p>
          <p className="text-sm sm:text-base italic text-gold font-serif">
            "No Subscriber Left Hungry"
          </p>
        </div>

        <p className="text-[10px] sm:text-xs text-white/30 max-w-lg mx-auto leading-relaxed mb-8">
          ⚠ This is a fan-made parody website created only for entertainment and to celebrate SnazzyZone's 100K YouTube milestone. 
          All investigations, petitions, reports, evidence, votes and accusations shown here are fictional.
        </p>

        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
          © 2026 All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
