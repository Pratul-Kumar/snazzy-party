"use client";

import { Share2 } from "lucide-react";

export default function Footer() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "SnazzyZone Party Tracker",
        text: "Bro is 100K but party kidhar hai? Join the hungry queue! 😂",
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied! Roast him anywhere.");
    }
  };

  return (
    <footer className="w-full pb-16 pt-10 px-6 sm:px-10 border-t border-white/5 bg-black mt-20">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        <button 
          onClick={handleShare}
          className="btn-primary !bg-white/10 !text-white hover:!bg-white/20 mb-12 text-sm uppercase tracking-widest font-bold"
        >
          <Share2 size={16} /> Expose Him
        </button>

        <h3 className="text-xl sm:text-2xl font-black text-white tracking-widest mb-1">
          SNAZZY BOIS
        </h3>
        <p className="text-xs font-bold text-muted uppercase tracking-[0.2em] mb-8">
          The Hungry Squad
        </p>

        <p className="text-[10px] sm:text-xs text-white/30 max-w-lg mx-auto leading-relaxed mb-8">
          ⚠ Just a fan-made parody. We just want free food for his 100K milestone. Pls share.
        </p>
      </div>
    </footer>
  );
}
