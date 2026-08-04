"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Share, Download } from "lucide-react";

export default function ShareCard({ name, food }: { name: string; food: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const downloadImage = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // High resolution
        backgroundColor: "#050505",
        logging: false,
      });
      
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = `OPERATION_RECOVER_PARTY_${name}.png`;
      link.href = image;
      link.click();
    } catch (err) {
      console.error("Error generating image", err);
    } finally {
      setDownloading(false);
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      navigator.share({
        title: "Operation Recover The Party",
        text: "I officially joined OPERATION RECOVER THE PARTY. 100K incoming, party is still missing! 😂",
        url: window.location.href,
      }).catch(console.error);
    } else {
      downloadImage();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* The invisible printable area. We wrap it in a container that scales it down for preview, but html2canvas captures full size */}
      <div className="w-full max-w-[340px] mb-6 shadow-2xl rounded-[32px] overflow-hidden border-4 border-[#111]">
        
        {/* The Card */}
        <div 
          ref={cardRef} 
          className="relative w-[340px] h-[600px] bg-[#ff3b30] flex flex-col p-8 overflow-hidden text-white"
          style={{ backgroundImage: 'linear-gradient(135deg, #ff3b30 0%, #cc0000 100%)' }}
        >
          {/* Decorative shapes */}
          <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-[-100px] left-[-100px] w-64 h-64 bg-black/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col h-full">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 mb-auto">
              SnazzyZone Party Dept.
            </p>
            
            <div className="my-auto">
              <p className="text-sm font-bold uppercase tracking-widest text-white/90 mb-4">
                I officially joined
              </p>
              <h2 className="text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-8 drop-shadow-lg">
                OPERATION<br/>RECOVER<br/>THE PARTY
              </h2>
              
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <p className="text-[10px] uppercase font-bold tracking-widest text-white/50 mb-1">
                  Demanding
                </p>
                <p className="text-xl font-black">{food}</p>
              </div>
            </div>

            <div className="mt-auto">
              <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">
                Recruit Name
              </p>
              <p className="text-2xl font-black truncate">{name}</p>
              
              <div className="mt-6 pt-4 border-t border-white/20 flex justify-between items-end">
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-widest text-white/60">Status</p>
                  <p className="font-bold text-sm">Still Waiting Since 50K 😂</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full max-w-[340px]">
        <button 
          onClick={shareNative}
          className="flex-1 bg-white text-black font-black uppercase tracking-widest text-sm py-4 rounded-xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Share size={18} /> Share
        </button>
        <button 
          onClick={downloadImage}
          disabled={downloading}
          className="flex-1 bg-[#111] border border-white/10 text-white font-black uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-white/5 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Download size={18} /> {downloading ? "..." : "Save PNG"}
        </button>
      </div>
    </div>
  );
}
