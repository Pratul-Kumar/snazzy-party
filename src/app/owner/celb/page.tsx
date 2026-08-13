"use client";

import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCelebration } from "@/app/context/CelebrationContext";
import { PartyPopper, ArrowLeft, StopCircle, Eye, EyeOff, Beaker } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function OwnerCelebrationPage() {
  const { isOwner, hasIdentity } = useUser();
  const router = useRouter();
  const { celebration, updateCelebration, setTestMode } = useCelebration();

  const [isConfirmingEnable, setIsConfirmingEnable] = useState(false);
  const [isConfirmingDisable, setIsConfirmingDisable] = useState(false);

  useEffect(() => {
    if (hasIdentity && !isOwner) {
      router.push("/");
    }
  }, [hasIdentity, isOwner, router]);

  if (!isOwner) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-gamer-mono text-xl tracking-[0.3em] text-[var(--accent)]">
        AUTHENTICATING...
      </div>
    );
  }

  const handleActivate = async () => {
    try {
      await updateCelebration({ enabled: true }, "owner_pratul");
      toast.success("100K CELEBRATION IS LIVE!");
      setIsConfirmingEnable(false);
    } catch (err) {
      toast.error("FAILED TO ACTIVATE");
    }
  };

  const handleDeactivate = async () => {
    try {
      await updateCelebration({ enabled: false, bannerEnabled: false }, "owner_pratul");
      toast.success("CELEBRATION DEACTIVATED");
      setIsConfirmingDisable(false);
    } catch (err) {
      toast.error("FAILED TO DEACTIVATE");
    }
  };

  const toggleBanner = async () => {
    try {
      const newVal = !celebration?.bannerEnabled;
      await updateCelebration({ bannerEnabled: newVal }, "owner_pratul");
      toast.success(newVal ? "BANNER SHOWN" : "BANNER HIDDEN");
    } catch (err) {
      toast.error("FAILED TO TOGGLE BANNER");
    }
  };

  const handleTest = () => {
    setTestMode(true);
  };

  return (
    <div className="min-h-screen bg-[#070807] text-[#F5F5F5] font-sans overflow-x-hidden selection:bg-[var(--accent)] selection:text-black">
      {/* Decorative Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 coord-grid" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-24 relative z-10">
        
        {/* Header */}
        <Link 
          href="/owner"
          className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-white transition-colors mb-12 font-gamer-mono text-xs tracking-widest uppercase"
        >
          <ArrowLeft size={16} />
          Back to Owner Panel
        </Link>

        <h1 className="font-gamer-heading text-5xl md:text-6xl tracking-wider text-[var(--accent)] mb-2">
          🎉 100K CELEBRATION
        </h1>
        <p className="font-gamer-mono text-sm tracking-[0.2em] text-[var(--muted)] mb-12 uppercase">
          Manual Global Event Trigger
        </p>

        {/* Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col justify-center">
            <span className="font-gamer-mono text-[10px] tracking-[0.3em] text-[var(--muted)] mb-2">STATUS</span>
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${celebration?.enabled ? 'bg-green-500 animate-pulse' : 'bg-red-500/50'}`} />
              <span className="font-gamer-heading text-2xl tracking-widest text-white">
                {celebration?.enabled ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
          </div>
          <div className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col justify-center">
            <span className="font-gamer-mono text-[10px] tracking-[0.3em] text-[var(--muted)] mb-2">BANNER</span>
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${celebration?.bannerEnabled ? 'bg-green-500 animate-pulse' : 'bg-red-500/50'}`} />
              <span className="font-gamer-heading text-2xl tracking-widest text-white">
                {celebration?.bannerEnabled ? 'VISIBLE' : 'HIDDEN'}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-[#111] border border-[var(--accent)]/20 p-8 rounded-3xl space-y-6">
          <h2 className="font-gamer-heading text-2xl tracking-widest text-white mb-6">EVENT CONTROLS</h2>
          
          {/* Main Action */}
          {!celebration?.enabled ? (
            <button
              onClick={() => setIsConfirmingEnable(true)}
              className="w-full flex items-center justify-center gap-3 bg-[var(--accent)] text-black min-h-[64px] rounded-2xl font-gamer-heading text-2xl tracking-widest hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <PartyPopper size={24} />
              ACTIVATE 100K CELEBRATION
            </button>
          ) : (
            <button
              onClick={() => setIsConfirmingDisable(true)}
              className="w-full flex items-center justify-center gap-3 bg-red-500 text-white min-h-[64px] rounded-2xl font-gamer-heading text-2xl tracking-widest hover:bg-red-600 active:scale-[0.98] transition-all"
            >
              <StopCircle size={24} />
              DEACTIVATE CELEBRATION
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={toggleBanner}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white min-h-[56px] rounded-xl font-gamer-heading text-xl tracking-widest transition-all"
            >
              {celebration?.bannerEnabled ? (
                <><EyeOff size={20} /> HIDE BANNER</>
              ) : (
                <><Eye size={20} /> SHOW BANNER</>
              )}
            </button>
            <button
              onClick={handleTest}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-[var(--accent)] min-h-[56px] rounded-xl font-gamer-heading text-xl tracking-widest transition-all border border-[var(--accent)]/20"
            >
              <Beaker size={20} /> TEST UI (LOCAL ONLY)
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      <AnimatePresence>
        {isConfirmingEnable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111] border border-red-500 p-8 rounded-3xl max-w-md w-full shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-6 text-3xl">
                ⚠️
              </div>
              <h2 className="font-gamer-heading text-3xl tracking-widest text-white mb-2">
                CONFIRM 100K ANNOUNCEMENT
              </h2>
              <p className="font-gamer-body text-xl text-[var(--muted)] mb-8">
                You're about to announce <span className="text-[var(--accent)] font-bold">100,000 SUBSCRIBERS</span>.<br/><br/>
                This will start the celebration for <span className="text-white">EVERYONE</span> currently visiting the website.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleActivate}
                  className="w-full bg-[var(--accent)] text-black font-gamer-heading tracking-widest text-xl h-14 rounded-xl"
                >
                  YES, LET'S PARTY 🎉
                </button>
                <button
                  onClick={() => setIsConfirmingEnable(false)}
                  className="w-full bg-transparent border border-white/20 text-[var(--muted)] hover:text-white font-gamer-heading tracking-widest text-xl h-14 rounded-xl"
                >
                  CANCEL
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isConfirmingDisable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111] border border-white/10 p-8 rounded-3xl max-w-md w-full text-center"
            >
              <h2 className="font-gamer-heading text-3xl tracking-widest text-white mb-4">
                STOP CELEBRATION?
              </h2>
              <p className="font-gamer-body text-xl text-[var(--muted)] mb-8">
                This will hide the celebration and banner from all visitors globally.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleDeactivate}
                  className="w-full bg-red-500 text-white font-gamer-heading tracking-widest text-xl h-14 rounded-xl hover:bg-red-600"
                >
                  TURN OFF
                </button>
                <button
                  onClick={() => setIsConfirmingDisable(false)}
                  className="w-full bg-transparent border border-white/20 text-[var(--muted)] hover:text-white font-gamer-heading tracking-widest text-xl h-14 rounded-xl"
                >
                  CANCEL
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
