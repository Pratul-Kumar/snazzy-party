"use client";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function ProgressAndDebt() {
  return (
    <section id="debt" className="grid lg:grid-cols-2 gap-12">
      {/* Progress Bars */}
      <div className="space-y-8 glass-card p-8 rounded-3xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-success rounded-full"></span> Progress Report
        </h2>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-bold">Subscriber Progress</span>
            <span className="text-success font-bold">100%</span>
          </div>
          <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} whileInView={{ width: "100%" }} 
              viewport={{ once: true }} transition={{ duration: 1.5 }}
              className="h-full bg-success"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="font-bold">Party Progress</span>
            <span className="text-accent font-bold">0%</span>
          </div>
          <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-accent w-[2%]"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="font-bold flex items-center gap-2">Excuse Meter <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full animate-pulse">MAXIMUM</span></span>
            <span className="text-warning font-bold">999%</span>
          </div>
          <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} whileInView={{ width: "100%" }} 
              viewport={{ once: true }} transition={{ duration: 1 }}
              className="h-full bg-warning"
            />
          </div>
        </div>
      </div>

      {/* Debt Calculator */}
      <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/20 rounded-full blur-[50px]"></div>
        
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-accent rounded-full"></span> Debt Calculator
        </h2>
        
        <div className="space-y-4">
          <div className="flex justify-between pb-4 border-b border-white/10">
            <span className="text-gray-400">50K Party</span>
            <span className="font-mono">₹5,000</span>
          </div>
          <div className="flex justify-between pb-4 border-b border-white/10">
            <span className="text-gray-400">Birthday Party</span>
            <span className="font-mono">₹3,000</span>
          </div>
          <div className="flex justify-between pb-4 border-b border-white/10">
            <span className="text-gray-400">100K Celebration</span>
            <span className="font-mono">₹10,000</span>
          </div>
          <div className="flex justify-between pb-4 border-b border-white/10">
            <span className="text-gray-400">Late Fine (₹25/day)</span>
            <span className="font-mono text-warning">+ ₹<CountUp end={819999} duration={5} separator="," /></span>
          </div>
          
          <div className="pt-4 mt-4">
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Total Amount Due</p>
            <p className="text-4xl md:text-5xl font-black text-accent glow-text font-mono">
              ₹<CountUp end={9999999} duration={4} separator="," />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
