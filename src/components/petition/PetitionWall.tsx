"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  subscribeToPetitionsV2,
  reactToPetition,
  PetitionV2
} from "@/lib/firebase";

function timeAgo(timestamp: number) {
  const diffInSeconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

interface PetitionWallProps {
  onShareRequest: (petition: PetitionV2) => void;
}

export default function PetitionWall({ onShareRequest }: PetitionWallProps) {
  const [petitions, setPetitions] = useState<PetitionV2[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToPetitionsV2((data) => {
      setPetitions(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleReact = async (petitionId: string | undefined, reactionType: "love" | "funny" | "hungry" | "facts") => {
    if (!petitionId) return;
    
    const storageKey = `snazzy_reacted_${petitionId}_${reactionType}`;
    if (typeof window !== 'undefined' && localStorage.getItem(storageKey)) {
      toast.error("You already reacted with this!", { id: `react-error-${petitionId}` });
      return;
    }

    try {
      await reactToPetition(petitionId, reactionType);
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, "true");
      }
      toast.success("Reaction added!");
    } catch (error) {
      toast.error("Failed to react. Try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-black tracking-tight text-white uppercase drop-shadow-md">
          📜 THE PEOPLE HAVE SPOKEN
        </h2>
        <p className="text-sm text-muted">
          Snazzy... you might want to read this.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted animate-pulse">
          Loading the wall of demands...
        </div>
      ) : petitions.length === 0 ? (
        <div className="surface-glass rounded-xl p-8 text-center text-muted">
          No petitions yet... Be the first to demand a party!
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {petitions.map((petition) => (
              <motion.div
                key={petition.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="surface-interactive rounded-xl p-5 border border-white/10 relative overflow-hidden"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="font-bold text-accent">@{petition.username}</div>
                  {petition.foodChoice && (
                    <div className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gold flex-shrink-0 ml-2 text-right">
                      {petition.foodChoice.toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="text-sm text-white/90 leading-relaxed mb-4 whitespace-pre-wrap">
                  &quot;{petition.text}&quot;
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-white/10">
                  
                  {/* Reactions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button 
                      onClick={() => handleReact(petition.id, "love")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium"
                    >
                      ❤️ <span>{petition.reactions?.love || 0}</span>
                    </button>
                    <button 
                      onClick={() => handleReact(petition.id, "funny")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium"
                    >
                      😂 <span>{petition.reactions?.funny || 0}</span>
                    </button>
                    <button 
                      onClick={() => handleReact(petition.id, "hungry")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium"
                    >
                      🍗 <span>{petition.reactions?.hungry || 0}</span>
                    </button>
                    <button 
                      onClick={() => handleReact(petition.id, "facts")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium"
                    >
                      🔥 <span>{petition.reactions?.facts || 0}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    <div className="flex items-center text-xs text-muted whitespace-nowrap">
                      <Clock className="w-3 h-3 mr-1" />
                      {timeAgo(petition.createdAt)}
                    </div>
                    
                    <button
                      onClick={() => onShareRequest(petition)}
                      className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-accent transition-colors uppercase tracking-wider whitespace-nowrap"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Share
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
