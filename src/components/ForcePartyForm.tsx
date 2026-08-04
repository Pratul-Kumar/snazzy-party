"use client";

import { useState } from "react";
import { addPetition } from "../lib/firebase";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import ShareCard from "./ShareCard";

export default function ForcePartyForm() {
  const [name, setName] = useState("");
  const [food, setFood] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !food) return;
    
    setSubmitting(true);
    const comment = `Give me my ${food} bro!`;
    const id = await addPetition(name, comment, food);
    
    setSubmitting(false);
    setSuccessId(id);
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div id="petition-form" className="w-full max-w-md mx-auto mb-16 relative scroll-mt-24">
      <AnimatePresence mode="wait">
        {!successId ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleSubmit}
            className="surface p-6 sm:p-10 space-y-8"
          >
            <div>
              <label className="text-sm font-bold text-white uppercase tracking-wider block mb-3">
                What&apos;s your name?
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                placeholder="Hungry Friend" 
                className="input-premium font-bold text-lg" 
              />
            </div>

            <div>
              <label className="text-sm font-bold text-white uppercase tracking-wider block mb-3">
                What do you want?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Pizza 🍕", "Biryani 🍗", "Burger 🍔", "Cake 🎂", "Cold Drink 🥤"].map((item) => (
                  <label
                    key={item}
                    className={`surface-interactive flex items-center justify-center p-4 cursor-pointer font-black transition-colors rounded-xl
                      ${food === item ? "bg-white text-black border-white" : "text-muted"}`}
                  >
                    <input 
                      type="radio" 
                      name="food"
                      value={item}
                      onChange={(e) => setFood(e.target.value)}
                      className="sr-only" 
                      required
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="bg-accent text-white w-full py-5 rounded-2xl font-black uppercase tracking-widest text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50"
            >
              {submitting ? "FORCING..." : "FORCE HIM"}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col items-center"
          >
            <h3 className="text-2xl font-black mb-6 text-center text-accent uppercase tracking-widest">
              You&apos;re in! 🎉
            </h3>
            
            <ShareCard name={name} food={food} />
            
            <button 
              onClick={() => {
                setSuccessId(null);
                setName("");
                setFood("");
              }} 
              className="mt-8 text-xs font-bold uppercase tracking-widest text-muted hover:text-white"
            >
              Add another friend
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
