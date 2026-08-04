"use client";

import { useEffect, useState } from "react";
import { subscribeToFoodPoll, voteFoodPoll } from "../lib/firebase";
import { motion } from "framer-motion";

export default function LiveFoodPoll() {
  const [pollData, setPollData] = useState<Record<string, number>>({
    "Pizza 🍕": 0,
    "Biryani 🍗": 0,
    "Burger 🍔": 0,
    "Cake 🎂": 0,
    "Cold Drink 🥤": 0,
  });
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const voted = localStorage.getItem("snazzy_food_voted");
      if (voted) setHasVoted(true);
    }

    const unsubscribe = subscribeToFoodPoll((data) => {
      setPollData({
        "Pizza 🍕": data["Pizza 🍕"] || 0,
        "Biryani 🍗": data["Biryani 🍗"] || 0,
        "Burger 🍔": data["Burger 🍔"] || 0,
        "Cake 🎂": data["Cake 🎂"] || 0,
        "Cold Drink 🥤": data["Cold Drink 🥤"] || 0,
      });
    });
    return () => unsubscribe();
  }, []);

  const totalVotes = Object.values(pollData).reduce((a, b) => a + b, 0);

  const handleVote = async (option: string) => {
    if (hasVoted) return;
    await voteFoodPoll(option);
    setHasVoted(true);
    localStorage.setItem("snazzy_food_voted", "true");
  };

  const getPercentage = (val: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((val / totalVotes) * 100);
  };

  return (
    <section className="section-premium !py-16">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-bold text-accent uppercase tracking-widest mb-2">Live Food Poll</p>
          <h3 className="text-2xl sm:text-3xl font-black leading-tight">
            If he finally gives party...<br/>
            <span className="text-muted">What are YOU eating first?</span>
          </h3>
        </div>

        <div className="surface p-4 sm:p-6 space-y-3">
          {Object.entries(pollData).map(([option, votes]) => {
            const percent = getPercentage(votes);
            const isWinner = hasVoted && percent === Math.max(...Object.values(pollData).map(getPercentage));

            return (
              <div key={option} className="relative">
                {hasVoted ? (
                  <div className={`w-full rounded-2xl h-16 relative overflow-hidden flex items-center px-5 justify-between border ${isWinner ? 'border-accent' : 'border-white/5'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`absolute top-0 left-0 h-full opacity-20 ${isWinner ? "bg-accent" : "bg-white"}`}
                    />
                    <span className="font-black relative z-10 text-lg">{option}</span>
                    <span className={`font-mono font-bold relative z-10 ${isWinner ? 'text-accent' : 'text-muted'}`}>{percent}%</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleVote(option)}
                    className="w-full bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20 rounded-2xl h-16 flex items-center px-5 justify-between transition-all group active:scale-95"
                  >
                    <span className="font-black text-lg text-text/80 group-hover:text-white">{option}</span>
                    <span className="w-5 h-5 rounded-full border-2 border-white/20 group-hover:border-white transition-colors" />
                  </button>
                )}
              </div>
            );
          })}
          
          <div className="mt-6 text-center text-[10px] text-muted uppercase tracking-widest font-mono font-bold">
            {totalVotes.toLocaleString()} Hungry Votes
          </div>
        </div>
      </div>
    </section>
  );
}
