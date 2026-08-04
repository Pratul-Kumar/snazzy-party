"use client";

import { useEffect, useState } from "react";
import { subscribeToPoll, votePoll } from "../lib/firebase";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export default function PollCard() {
  const [pollData, setPollData] = useState<Record<string, number>>({
    "50K Party": 0,
    "Birthday Party": 0,
    "100K Party": 0,
    "All Together": 0,
  });
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Check localStorage for vote status
    if (typeof window !== "undefined") {
      const voted = localStorage.getItem("snazzy_poll_voted");
      if (voted) setHasVoted(true);
    }

    const unsubscribe = subscribeToPoll((data) => {
      // Map mock data keys to full labels
      setPollData({
        "50K Party": data["50K"] || 0,
        "Birthday Party": data["Birthday"] || 0,
        "100K Party": data["100K"] || 0,
        "All Together": data["All"] || 0,
      });
    });
    return () => unsubscribe();
  }, []);

  const totalVotes = Object.values(pollData).reduce((a, b) => a + b, 0);

  const handleVote = async (option: string) => {
    if (hasVoted) return;
    
    // Map full labels back to mock DB keys
    const keyMap: Record<string, "50K" | "Birthday" | "100K" | "All"> = {
      "50K Party": "50K",
      "Birthday Party": "Birthday",
      "100K Party": "100K",
      "All Together": "All",
    };
    
    await votePoll(keyMap[option]);
    setHasVoted(true);
    localStorage.setItem("snazzy_poll_voted", "true");
  };

  const getPercentage = (val: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((val / totalVotes) * 100);
  };

  return (
    <section className="section-premium !py-16">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="text-[11px] font-medium text-muted uppercase tracking-[0.2em] flex items-center gap-2">
            <BarChart3 size={14} /> Live Public Poll
          </span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <div className="surface p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">
            Which party should happen first?
          </h3>

          <div className="space-y-4">
            {Object.entries(pollData).map(([option, votes]) => {
              const percent = getPercentage(votes);
              return (
                <div key={option} className="relative">
                  {hasVoted ? (
                    <div className="w-full bg-white/5 rounded-xl h-14 relative overflow-hidden flex items-center px-4 justify-between">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`absolute top-0 left-0 h-full opacity-20 ${
                          option === "All Together" ? "bg-accent" : "bg-white"
                        }`}
                      />
                      <span className="font-bold relative z-10">{option}</span>
                      <span className="font-mono relative z-10 text-muted">{percent}%</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleVote(option)}
                      className="w-full bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20 rounded-xl h-14 flex items-center px-4 justify-between transition-all group"
                    >
                      <span className="font-bold group-hover:text-white text-text/80">{option}</span>
                      <span className="w-4 h-4 rounded-full border border-white/30 group-hover:border-white transition-colors" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 text-center text-xs text-muted uppercase tracking-widest font-mono">
            {totalVotes.toLocaleString()} Total Votes
          </div>
        </div>
      </div>
    </section>
  );
}
