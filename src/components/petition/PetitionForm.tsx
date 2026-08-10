"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useUser } from "@/app/context/UserContext";
import { submitPetitionV2 } from "@/lib/firebase";

interface PetitionFormProps {
  onSuccess: (id: string) => void;
}

const PRESET_PROMPTS = [
  "Where is my biryani?",
  "50K party abhi tak pending hai.",
  "100K ke pehle restaurant book karo.",
  "Birthday + 100K = double party.",
  "Please stop saying next Sunday."
];

const FOOD_CHOICES = [
  { icon: "🍗", label: "Biryani" },
  { icon: "🍕", label: "Pizza" },
  { icon: "🍔", label: "Burger" },
  { icon: "🥟", label: "Momos" },
  { icon: "🍟", label: "Fries" },
  { icon: "🎂", label: "Cake" },
  { icon: "🍦", label: "Ice Cream" },
  { icon: "😤", label: "EVERYTHING" }
];

export default function PetitionForm({ onSuccess }: PetitionFormProps) {
  const { profile, awardXP } = useUser();
  const [text, setText] = useState("");
  const [foodChoice, setFoodChoice] = useState("");
  const [step, setStep] = useState<"edit" | "preview">("edit");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to count words
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const maxWords = 200;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handlePromptClick = (prompt: string) => {
    setText((prev) => (prev ? prev + " " + prompt : prompt));
  };

  const handlePreview = () => {
    if (wordCount > maxWords) {
      toast.error("Bro, keep it short 😂");
      return;
    }
    if (!text.trim()) {
      toast.error("At least write something!");
      return;
    }
    setStep("preview");
  };

  const handleSubmit = async () => {
    if (!profile) {
      toast.error("You need to be logged in!");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const docId = await submitPetitionV2({
        username: profile.name,
        userId: profile.odId,
        text,
        foodChoice
      });
      awardXP("PETITION");
      onSuccess(docId);
    } catch (error) {
      console.error("Error submitting petition:", error);
      toast.error("Failed to submit. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="surface-glass p-6 rounded-2xl w-full max-w-md mx-auto relative overflow-hidden">
      <AnimatePresence mode="wait">
        {step === "edit" ? (
          <motion.div
            key="edit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Sign the Petition</h2>
              <p className="text-[var(--muted)] text-sm">Tell Snazzy what you want.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {PRESET_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(prompt)}
                  className="surface-interactive text-xs py-1.5 px-3 rounded-full text-[var(--gold)] border border-[var(--gold)]/20 hover:bg-[var(--gold)]/10 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="relative">
              <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Write your demands here..."
                className="w-full input-premium min-h-[120px] resize-none p-4 rounded-xl text-white placeholder-[var(--muted)] focus:outline-none"
              />
              <div
                className={`absolute bottom-3 right-3 text-xs ${
                  wordCount > maxWords ? "text-[var(--accent)]" : "text-[var(--muted)]"
                }`}
              >
                {wordCount} / {maxWords} words
              </div>
            </div>

            <div>
              <p className="text-sm text-[var(--muted)] mb-3">Optional Food Choice</p>
              <div className="grid grid-cols-4 gap-2">
                {FOOD_CHOICES.map((choice) => {
                  const isSelected = foodChoice === choice.label;
                  return (
                    <button
                      key={choice.label}
                      onClick={() => setFoodChoice(isSelected ? "" : choice.label)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all min-h-[48px] ${
                        isSelected
                          ? "border-[var(--gold)] bg-[var(--gold)]/20"
                          : "border-transparent surface-interactive hover:bg-[var(--surface)]"
                      }`}
                    >
                      <span className="text-xl mb-1">{choice.icon}</span>
                      <span className="text-[10px] text-white text-center leading-tight">
                        {choice.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handlePreview}
              className="btn-primary w-full py-4 text-base font-bold rounded-xl mt-2 min-h-[48px]"
            >
              SIGN THE PETITION
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-[var(--gold)] mb-2">Preview</h2>
              <p className="text-[var(--muted)] text-sm">Review your demands before making it official.</p>
            </div>

            <div className="surface p-5 rounded-xl border border-white/5 relative">
              <div className="absolute top-0 right-0 p-3 opacity-20 pointer-events-none text-2xl">
                📜
              </div>
              <h3 className="font-bold text-white mb-1">{profile?.name || "Anonymous User"}</h3>
              <p className="text-[var(--muted)] text-sm mb-4 leading-relaxed whitespace-pre-wrap">
                "{text}"
              </p>
              {foodChoice && (
                <div className="inline-flex items-center gap-1.5 surface-interactive px-3 py-1.5 rounded-full text-xs text-[var(--gold)]">
                  <span>Choice:</span>
                  <span className="font-semibold">{foodChoice}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setStep("edit")}
                disabled={isSubmitting}
                className="flex-1 surface-interactive py-3 rounded-xl text-white font-medium hover:bg-white/5 transition-colors disabled:opacity-50 min-h-[48px]"
              >
                EDIT
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-[2] btn-primary py-3 rounded-xl font-bold disabled:opacity-50 min-h-[48px]"
              >
                {isSubmitting ? "SIGNING..." : "SIGN IT"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
