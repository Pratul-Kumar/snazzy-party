"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/app/context/UserContext";
import PetitionForm from "./PetitionForm";
import PetitionWall from "./PetitionWall";
import PetitionShareModal from "./PetitionShareModal";
import { PetitionV2 } from "@/lib/firebase";
import toast from "react-hot-toast";

export default function PetitionSection() {
  const { hasIdentity, createIdentity, updateStat } = useUser();
  const [nameInput, setNameInput] = useState("");
  const [sideInput, setSideInput] = useState<"Pizza" | "Biryani" | "">("");
  const [shareModalPetition, setShareModalPetition] = useState<PetitionV2 | null>(null);

  const handleCreateIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      toast.error("Bro, enter your name!");
      return;
    }
    if (!sideInput) {
      toast.error("Choose a side!");
      return;
    }
    createIdentity(nameInput.trim(), sideInput);
    toast.success("Identity Created!");
  };

  const handlePetitionSuccess = (id: string) => {
    toast.success("Petition Published!");
    updateStat("petitionSigned", 1);
    updateStat("partyPressure", 5);
  };

  return (
    <div id="petition" className="section-premium !py-10">
      <div className="w-full max-w-2xl mx-auto px-4 relative scroll-mt-24">
        
        <AnimatePresence mode="wait">
          {!hasIdentity ? (
            <motion.div
              key="create-id"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="surface p-6 sm:p-10 space-y-8"
            >
              <div className="text-center">
                <p className="text-accent font-bold tracking-widest text-sm uppercase mb-2">
                  👋 FIRST THINGS FIRST...
                </p>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase leading-tight">
                  What's your name, Hungry Bois?
                </h2>
              </div>
              
              <form onSubmit={handleCreateIdentity} className="space-y-6">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  maxLength={20}
                  placeholder="Enter Username"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors text-lg font-medium"
                />
                
                <div className="space-y-3">
                  <p className="text-sm text-muted font-medium uppercase tracking-wider">Choose your side</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSideInput("Pizza")}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                        sideInput === "Pizza"
                          ? "border-accent bg-accent/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <span className="text-4xl">🍕</span>
                      <span className="text-white font-bold">Pizza</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSideInput("Biryani")}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                        sideInput === "Biryani"
                          ? "border-gold bg-gold/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <span className="text-4xl">🍗</span>
                      <span className="text-white font-bold">Biryani</span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg tracking-wide hover:bg-white/90 transition-colors mt-4"
                >
                  CONTINUE
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="petition-flow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-16"
            >
              {/* Form Section */}
              <div className="surface p-6 sm:p-10">
                <PetitionForm onSuccess={handlePetitionSuccess} />
              </div>

              {/* Wall Section */}
              <div>
                <PetitionWall onShareRequest={(petition) => setShareModalPetition(petition)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      
      <PetitionShareModal 
        isOpen={!!shareModalPetition} 
        onClose={() => setShareModalPetition(null)}
        petition={shareModalPetition}
      />
    </div>
  );
}
