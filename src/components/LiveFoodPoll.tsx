"use client";

import { useEffect, useState } from "react";
import { subscribeToFoodPoll, voteFoodPoll } from "../lib/firebase";
import { motion } from "framer-motion";
import { useShare } from "../app/context/ShareContext";
import toast from "react-hot-toast";

const OPTIONS = [
  "🍗 Biryani 👑",
  "🍕 Pizza",
  "🍔 Burger",
  "🌮 Momos",
  "🍟 Fries",
  "🌯 Shawarma",
  "🍜 Noodles",
  "🍛 Paneer Butter Masala + Naan",
  "🥩 Chicken Tandoori",
  "🍖 Chicken Lollipop",
  "🥟 Samosa + Chai",
  "🥤 Cold Drink",
  "🍰 Cake",
  "🍦 Ice Cream",
  "🍫 Brownie + Ice Cream",
  "🍿 Popcorn (Just Watching 😂)",
  "🤷 Whatever He's Paying For",
  "🥲 I Just Came For Free Food",
  "😤 Everything"
];

export default function LiveFoodPoll() {
  const [pollData, setPollData] = useState<Record<string, number>>({});
  const [hasVoted, setHasVoted] = useState(false);
  const { openShare } = useShare();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const voted = localStorage.getItem("snazzy_food_voted");
      if (voted) setHasVoted(true);
    }

    const unsubscribe = subscribeToFoodPoll((data) => {
      const formattedData: Record<string, number> = {};
      OPTIONS.forEach((opt) => {
        formattedData[opt] = data[opt] || 0;
      });
      setPollData(formattedData);
    });
    return () => unsubscribe();
  }, []);

  const totalVotes = Object.values(pollData).reduce((a, b) => a + b, 0);

  const handleVote = async (option: string) => {
    if (hasVoted) return;
    
    // Custom toasts
    if (option.includes("Everything")) {
      toast("😂 Bro... Just book the whole restaurant.", { icon: "🔥" });
    } else if (option.includes("Free Food")) {
      toast("At least someone is honest 😂", { icon: "💯" });
    } else if (option.includes("Whatever He's Paying For")) {
      toast("Wallet under pressure detected 💸");
    } else if (option.includes("Biryani")) {
      toast("The people have spoken 👑🍗");
    } else if (option.includes("Cake")) {
      toast("Birthday vibes detected 🎂");
    } else {
      toast.success("Vote locked! Now invite friends.");
    }

    await voteFoodPoll(option);
    setHasVoted(true);
    localStorage.setItem("snazzy_food_voted", "true");
    
    setTimeout(() => {
      openShare();
    }, 1500);
  };

  const getPercentage = (val: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((val / totalVotes) * 100);
  };

  return (
    <section className="section-premium !py-16">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-muted uppercase tracking-[0.2em] mb-4">If SnazzyZone finally gives the party...</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-center uppercase tracking-tight text-white">
            🍽️ WHAT&apos;S THE FIRST THING<br/>YOU&apos;RE GRABBING? 😋
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {OPTIONS.map((option) => {
            const votes = pollData[option] || 0;
            const percent = getPercentage(votes);
            const maxPercent = Math.max(...Object.values(pollData).map(getPercentage));
            const isWinner = hasVoted && percent > 0 && percent === maxPercent;

            return (
              <div key={option} className="relative">
                {hasVoted ? (
                  <div className={`w-full rounded-2xl h-16 relative overflow-hidden flex items-center px-5 justify-between border transition-colors ${isWinner ? 'border-accent bg-accent/5' : 'border-white/5 bg-white/5'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`absolute top-0 left-0 h-full opacity-20 ${isWinner ? "bg-accent" : "bg-white"}`}
                    />
                    <span className="font-black relative z-10 text-[13px] sm:text-sm">{option}</span>
                    <span className={`font-mono font-bold relative z-10 ${isWinner ? 'text-accent' : 'text-muted'}`}>{percent}%</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleVote(option)}
                    className="w-full bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20 rounded-2xl h-16 flex items-center px-5 justify-between transition-all group active:scale-95"
                  >
                    <span className="font-black text-[13px] sm:text-sm text-text/80 group-hover:text-white text-left pr-4">{option}</span>
                    <span className="w-5 h-5 flex-shrink-0 rounded-full border-2 border-white/20 group-hover:border-white transition-colors" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
          
        <div className="mt-12 text-center text-[10px] text-muted uppercase tracking-widest font-mono font-bold">
          {totalVotes.toLocaleString()} Hungry Votes
        </div>
      </div>
    </section>
  );
}
