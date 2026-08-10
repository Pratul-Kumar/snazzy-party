"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getPetition, PetitionV2 } from "@/lib/firebase";
import { CONFIG } from "@/lib/config";
import Link from "next/link";
import { ArrowLeft, Copy, Share2 } from "lucide-react";
import toast from "react-hot-toast";

export default function PetitionPage() {
  const { id } = useParams();
  const router = useRouter();
  const [petition, setPetition] = useState<PetitionV2 | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id || typeof id !== "string") {
        setLoading(false);
        return;
      }
      try {
        const data = await getPetition(id);
        setPetition(data);
      } catch (err) {
        console.error("Failed to load petition", err);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${CONFIG.DOMAIN}/petition/${id}`);
    toast.success("Link copied!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Party Petition",
          text: `Check out what @${petition?.username} said to SnazzyZone 😂`,
          url: `${CONFIG.DOMAIN}/petition/${id}`,
        });
      } catch (err) {
        // user cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!petition) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] p-6 text-center space-y-6">
        <h1 className="text-3xl font-black text-white uppercase">Petition Not Found</h1>
        <p className="text-muted">This demand has vanished into the void.</p>
        <Link href="/" className="btn-primary">
          Back to Hunt
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center p-4 sm:p-8 relative">
      <Link href="/" className="absolute top-6 left-6 text-muted hover:text-white transition-colors flex items-center gap-2 font-bold">
        <ArrowLeft size={20} />
        <span className="hidden sm:inline">BACK</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mt-16 sm:mt-8 space-y-8"
      >
        <div className="text-center">
          <p className="text-accent font-bold tracking-widest text-xs uppercase mb-2">📜 PARTY PETITION</p>
          <h1 className="text-3xl font-black text-white uppercase leading-tight">
            The People<br />Have Spoken
          </h1>
        </div>

        {/* The Card */}
        <div className="surface border border-white/10 rounded-[32px] p-6 sm:p-8 relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-white uppercase tracking-tight">@{petition.username}</h3>
            {petition.foodChoice && (
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                {petition.foodChoice}
              </span>
            )}
          </div>
          
          <p className="text-xl sm:text-2xl text-white/90 font-medium leading-relaxed mb-8">
            "{petition.text}"
          </p>
          
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-2xl">❤️</span>
              <span className="text-white font-bold">{petition.reactions.love || 0}</span>
            </div>
            <div className="text-xs text-muted font-medium">
              {new Date(petition.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="surface p-6 rounded-[32px] space-y-6 text-center">
          <h3 className="text-lg font-black text-white uppercase">Think you agree?</h3>
          
          <Link href="/#petition" className="w-full bg-white text-black py-4 rounded-2xl font-black flex items-center justify-center text-lg hover:bg-white/90 transition-colors">
            SIGN THE PETITION
          </Link>

          <div className="flex gap-3">
            <button
              onClick={handleCopyLink}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors border border-white/10"
            >
              <Copy size={18} />
              <span>Copy</span>
            </button>
            <button
              onClick={handleShare}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors border border-white/10"
            >
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
