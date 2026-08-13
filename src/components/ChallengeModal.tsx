"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import { ref, set } from "firebase/database";
import { rtdb } from "../lib/firebase";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChallengeModal({ isOpen, onClose }: ChallengeModalProps) {
  const { profile, hasIdentity } = useUser();
  const router = useRouter();
  const [tab, setTab] = useState<"create" | "join">("create");
  const [name, setName] = useState("");
  const [side, setSide] = useState<"🍕" | "🍗" | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const [joinCode, setJoinCode] = useState("");

  // Reset join code when modal closes
  useEffect(() => {
    if (!isOpen) {
      setJoinCode("");
      setTab("create");
    }
  }, [isOpen]);

  // Automatically sync profile info when it loads or when modal opens
  useEffect(() => {
    if (hasIdentity && profile) {
      setName(profile.name);
      setSide(profile.side as "🍕" | "🍗");
    }
  }, [hasIdentity, profile, isOpen]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const code = joinCode.trim().toUpperCase();
    if (!code) { toast.error("Enter a game code!"); return; }
    onClose();
    router.push(`/play/${code}`);
  };

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

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const gameUrl = mounted && typeof window !== "undefined" ? `${window.location.origin}/play/${gameId}` : "";
  const inviteMessage = `Come beat me at Tic-Tac-Toe.\n\nGame Code: ${gameId}\nJoin here 👇\n${gameUrl}`;

  const copyLink = () => {
    navigator.clipboard.writeText(inviteMessage); // Use full invite message instead of just link
    toast.success("Game invite copied!");
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "SnazzyZone Arena",
          text: inviteMessage,
          // NO url field — WhatsApp & other apps append it to text causing duplicate
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
                🎮 Snazzy Arena
              </h2>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-2 relative z-10">
                Winner takes it all.
              </p>
            </div>

            <div className="p-6">
              {/* Tab Switcher */}
              <div className="flex gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setTab("create")}
                  className={`flex-1 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors ${
                    tab === "create" ? "bg-white text-black" : "bg-white/5 text-white/50 hover:bg-white/10"
                  }`}
                >
                  🎮 Create Game
                </button>
                <button
                  type="button"
                  onClick={() => setTab("join")}
                  className={`flex-1 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors ${
                    tab === "join" ? "bg-white text-black" : "bg-white/5 text-white/50 hover:bg-white/10"
                  }`}
                >
                  🔗 Join by Code
                </button>
              </div>

              {tab === "join" ? (
                <form onSubmit={handleJoin} className="space-y-4">
                  <div className="text-center mb-2">
                    <p className="text-white/60 text-sm">Got a game code from a friend? Enter it below.</p>
                  </div>
                  <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase().slice(0, 8))}
                    placeholder="e.g. 8PER5"
                    className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl text-white text-center text-2xl font-black uppercase tracking-[0.3em] placeholder:text-white/20 placeholder:text-base focus:outline-none focus:border-accent"
                  />
                  <p className="text-[9px] text-muted text-center uppercase tracking-widest">
                    Ask your friend to share their game code
                  </p>
                  <button
                    type="submit"
                    disabled={!joinCode.trim()}
                    className="w-full bg-accent text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:hover:scale-100"
                  >
                    Join Game 🚀
                  </button>
                </form>
              ) : (
              !gameId ? (
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
                      className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white font-bold text-sm focus:outline-none focus:border-accent" 
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
                        className={`bg-[#111] p-4 rounded-xl text-4xl flex items-center justify-center transition-all ${side === "🍕" ? "bg-accent/20 border border-accent scale-105" : "border border-white/5 grayscale hover:grayscale-0"}`}
                      >
                        🍕
                      </button>
                      <button
                        type="button"
                        onClick={() => setSide("🍗")}
                        className={`bg-[#111] p-4 rounded-xl text-4xl flex items-center justify-center transition-all ${side === "🍗" ? "bg-accent/20 border border-accent scale-105" : "border border-white/5 grayscale hover:grayscale-0"}`}
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
              )
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
