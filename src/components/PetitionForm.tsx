"use client";

import { useState } from "react";
import { addPetition } from "../lib/firebase";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function PetitionForm() {
  const [name, setName] = useState("");
  const [food, setFood] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !food || !comment) return;
    
    setSubmitting(true);
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 600));
    
    const id = await addPetition(name, comment, food);
    
    setSubmitting(false);
    setSuccessId(id);
    setName("");
    setFood("");
    setComment("");

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    
    // Reset success state after a few seconds
    setTimeout(() => {
      setSuccessId(null);
    }, 4000);
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
            className="surface p-6 sm:p-8 space-y-5"
          >
            <div>
              <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-2">
                Your Name
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                placeholder="Hungry Subscriber" 
                className="input-premium" 
              />
            </div>

            <div>
              <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-2">
                Favourite Food Owed
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Pizza", "Biryani", "Cake", "Cold Drink"].map((item) => (
                  <label
                    key={item}
                    className={`surface-interactive flex items-center justify-center p-3 cursor-pointer text-sm font-medium transition-colors
                      ${food === item ? "bg-white/10 border-white/30 text-white" : "text-muted"}`}
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

            <div>
              <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-2">
                Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={3}
                placeholder="Where is the party bro?"
                className="input-premium resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="btn-accent w-full mt-2"
            >
              {submitting ? "Submitting..." : "Sign Petition"}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="surface p-8 text-center"
          >
            <div className="flex justify-center mb-4">
              <CheckCircle2 size={48} className="text-green" />
            </div>
            <h3 className="text-xl font-bold mb-2">Government Approved</h3>
            <p className="text-sm text-muted mb-6">Your petition has been officially stamped.</p>
            
            <div className="border border-green/20 bg-green/5 p-4 rounded-xl">
              <p className="text-[10px] uppercase tracking-widest text-green mb-1">Petition ID</p>
              <p className="font-mono font-bold text-lg">{successId}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
