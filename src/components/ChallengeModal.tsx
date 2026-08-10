"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import { ref, set } from "firebase/database";
import { rtdb } from "../lib/firebase";

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChallengeModal({ isOpen, onClose }: ChallengeModalProps) {
  const [name, setName] = useState("");
  const [side, setSide] = useState<"🍕" | "🍗" | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !side) return;

    // Generate random 5 character ID
    const newGameId = Math.random().toString(36).substring(2, 7).toUpperCase();
    
    try {
      // Create initial state in RTDB
      const gameRef = ref(rtdb, `games/${newGameId}`);
      await set(gameRef, {
        player1: { id: "p1", name, side },
        board: Array(9).fill(""),
        turn: "p1",
        status: "waiting",
        createdAt: Date.now()
      });

      setGameId(newGameId);
      // We store the creator's ID in localStorage so they can join their own game as p1
      localStorage.setItem(`snazzy_arena_${newGameId}`, JSON.stringify({ id: "p1", name, side }));

    } catch (err: any) {
      toast.error(`Failed to create game: ${err.message || "Unknown error"}`);
      console.error("Game Creation Error:", err);
    }
  };

  const gameUrl = typeof window !== "undefined" ? `${window.location.origin}/play/${gameId}` : "";
  const inviteMessage = `Bro 😂\n\nStop scrolling.\nCome beat me at Tic-Tac-Toe.\nLoser gets reminded about Snazzy's missing party.\n\nJoin here 👇\n${gameUrl}`;

  const copyLink = () => {
    navigator.clipboard.writeText(gameUrl);
    toast.success("Game link copied!");
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Snazzy Party Arena",
          text: inviteMessage,
          url: gameUrl,
        });
      } catch (err) {
        // user cancelled
      }
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(inviteMessage)}`, "_blank");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[400px] bg-[#111] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white backdrop-blur-md">
              <X size={20} />
            </button>

            <div className="p-6 text-center border-b border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-accent/10 blur-[50px] rounded-t-full" />
              <h2 className="text-2xl font-black uppercase tracking-tight text-white relative z-10">
                🎮 Party Arena
              </h2>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-2 relative z-10">
                Winner gets bragging rights.<br/>Loser still owes the party.
              </p>
            </div>

            <div className="p-6">
              {!gameId ? (
                <form onSubmit={handleCreate} className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                      placeholder="Player 1" 
                      className="input-premium font-bold" 
                      maxLength={15}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                      Choose Your Side
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSide("🍕")}
                        className={`surface-interactive p-4 rounded-xl text-4xl flex items-center justify-center transition-all ${side === "🍕" ? "bg-accent/20 border-accent scale-105" : "grayscale"}`}
                      >
                        🍕
                      </button>
                      <button
                        type="button"
                        onClick={() => setSide("🍗")}
                        className={`surface-interactive p-4 rounded-xl text-4xl flex items-center justify-center transition-all ${side === "🍗" ? "bg-accent/20 border-accent scale-105" : "grayscale"}`}
                      >
                        🍗
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={!name || !side}
                    className="bg-white text-black w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50"
                  >
                    Create Game
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2">Game Ready</p>
                    <p className="text-4xl font-black text-white tracking-widest font-mono mb-2">{gameId}</p>
                    <p className="text-xs text-muted">Waiting for your friend...</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={shareNative} className="bg-accent text-white hover:bg-accent/90 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                      <Share2 size={14} /> Invite Friend
                    </button>
                    <button onClick={copyLink} className="bg-white/10 text-white hover:bg-white/20 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                      <Copy size={14} /> Copy Link
                    </button>
                  </div>

                  <a 
                    href={`/play/${gameId}`}
                    className="block w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    Enter Arena
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
