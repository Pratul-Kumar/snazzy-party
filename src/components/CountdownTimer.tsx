"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(72 * 60 * 60); // 72 hours in seconds
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <section className="py-12 flex justify-center">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="glass-card p-8 md:p-12 rounded-3xl text-center border-t border-accent max-w-3xl w-full"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-8 text-gray-400 uppercase tracking-widest">
          Ultimatum Deadline
        </h2>
        
        {!isFinished ? (
          <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-8 mb-4">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-7xl font-black text-white font-mono">{hours.toString().padStart(2, '0')}</span>
              <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-widest mt-2">Hours</span>
            </div>
            <span className="text-3xl sm:text-4xl md:text-7xl font-black text-accent animate-pulse">:</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-7xl font-black text-white font-mono">{minutes.toString().padStart(2, '0')}</span>
              <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-widest mt-2">Minutes</span>
            </div>
            <span className="text-3xl sm:text-4xl md:text-7xl font-black text-accent animate-pulse">:</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-7xl font-black text-accent font-mono">{seconds.toString().padStart(2, '0')}</span>
              <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-widest mt-2">Seconds</span>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="py-8"
          >
            <h3 className="text-3xl md:text-5xl font-black text-accent glow-text uppercase mb-2">
              Time is Up!
            </h3>
            <p className="text-xl text-white font-bold">"Friends have occupied the restaurant."</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
