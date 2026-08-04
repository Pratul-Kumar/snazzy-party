"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { usePortal } from "../app/context/PortalContext";

export default function RecoveryApplication() {
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");
  const { generateId } = usePortal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = generateId("PRD-2026-");
    setAppId(id);
    setSubmitted(true);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.5 } });
  };

  return (
    <section className="section-snap">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-lg w-full"
      >
        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-[0.2em]">
            Recovery Application
          </span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-center">
                File Your <span className="text-accent-gradient">Complaint</span>
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mb-8 text-center max-w-sm mx-auto leading-relaxed">
                Submit an official party recovery request. All complaints are forwarded directly to the accused.
              </p>

              <form onSubmit={handleSubmit} className="surface p-5 sm:p-6 space-y-4">
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider block mb-1.5">
                    Your Name
                  </label>
                  <input type="text" required placeholder="Enter your name" className="input" />
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider block mb-1.5">
                    Relationship
                  </label>
                  <select required className="input">
                    <option value="">Select...</option>
                    <option>Friend</option>
                    <option>Subscriber</option>
                    <option>Hungry Victim</option>
                    <option>Family Member</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider block mb-1.5">
                    What are you owed?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Pizza", "Biryani", "Cake", "Cold Drink", "Gulab Jamun", "Everything"].map((item) => (
                      <label
                        key={item}
                        className="surface-interactive flex items-center justify-center gap-1.5 p-2.5 cursor-pointer text-xs font-medium text-center has-[:checked]:border-red-500/30 has-[:checked]:bg-red-500/5 has-[:checked]:text-red-400"
                      >
                        <input type="checkbox" className="sr-only" />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider block mb-1.5">
                    Additional Evidence
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe the emotional damage..."
                    className="input resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full mt-2">
                  Submit Complaint
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="surface p-8 sm:p-10 text-center"
            >
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">Complaint Filed</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">Your complaint has been registered.</p>

              <div className="surface p-4 space-y-2 text-left mb-6">
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-muted)] uppercase tracking-wider">Application ID</span>
                  <span className="font-mono font-medium">{appId}</span>
                </div>
                <div className="h-px bg-[var(--border)]" />
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-muted)] uppercase tracking-wider">Status</span>
                  <span className="font-medium text-orange-400">Under Investigation</span>
                </div>
                <div className="h-px bg-[var(--border)]" />
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-muted)] uppercase tracking-wider">ETA</span>
                  <span className="font-medium">3–5 Business Parties</span>
                </div>
              </div>

              <button onClick={() => setSubmitted(false)} className="btn-secondary text-xs">
                File Another Complaint
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
