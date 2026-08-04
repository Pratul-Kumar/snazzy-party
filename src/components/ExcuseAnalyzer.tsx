"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, FileText } from "lucide-react";
import confetti from "canvas-confetti";

const EXCUSES = [
  "Busy Editing", "Next Sunday", "Silver Play Button First", "Budget Updating", 
  "Restaurant Server Down", "Mom Said No", "Wallet Loading", "Internet Lag", 
  "Waiting For 200K", "I Forgot", "I Thought You Forgot", "My Squad Was Offline", 
  "Tournament Season", "Dog ate my wallet", "Bank holiday", "Stuck in traffic",
  "Dieting this week", "Too tired after stream", "Sponsor hasn't paid", 
  "Need to buy new setup", "Waiting for good weather", "Not feeling it today",
  "Gotta push rank", "Editing software crashed", "Power cut in my area",
  "Lost my debit card", "Forgot UPI PIN", "Waiting for cashback", 
  "Let's do it on my birthday", "Next milestone for sure", "I already gave one (lie)",
  "You guys didn't remind me", "Too much work", "Meeting with YouTube",
  "Collab coming up", "Saving for a camera", "My cat is sick", "Gym time",
  "Sleeping schedule messed up", "Not hungry", "I only eat healthy now",
  "Let's wait for everyone", "Someone is out of town", "The place is too crowded",
  "I don't have time", "I'll GPay you guys (never does)", "Tomorrow 100%",
  "Next week 100%", "Next month 100%", "Next year 100%"
];

export default function ExcuseAnalyzer() {
  const [reports, setReports] = useState<any[]>([]);
  const [generating, setGenerating] = useState(false);

  const generateReport = async () => {
    setGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const randomExcuse = EXCUSES[Math.floor(Math.random() * EXCUSES.length)];
    const newReport = {
      id: Math.floor(Math.random() * 900) + 100,
      excuse: randomExcuse,
      truthScore: "0%",
      verdict: "REJECTED"
    };

    setReports((prev) => [newReport, ...prev]);
    setGenerating(false);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#ff3b30", "#ffffff"],
    });
  };

  return (
    <section className="section-premium">
      <div className="w-full">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="text-[11px] font-medium text-muted uppercase tracking-[0.2em] flex items-center gap-2">
            <Cpu size={14} /> AI Excuse Analyzer
          </span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">
            Predictive <span className="text-gradient">Excuse</span> Engine
          </h2>
          <p className="text-sm text-muted max-w-sm mx-auto">
            Our AI generates official reports based on the subject's historical excuse patterns.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <button 
            onClick={generateReport}
            disabled={generating}
            className="btn-primary"
          >
            {generating ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-bg border-t-transparent animate-spin" />
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FileText size={18} /> Generate Excuse Report
              </span>
            )}
          </button>
        </div>

        <div className="space-y-4 w-full max-w-md mx-auto">
          <AnimatePresence>
            {reports.map((report) => (
              <motion.div
                key={report.id + report.excuse}
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="surface p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase font-mono text-muted tracking-widest">
                    REPORT #{report.id}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-accent bg-accent/10 px-2 py-1 rounded-full">
                    {report.verdict}
                  </span>
                </div>
                
                <div className="mb-6">
                  <p className="text-xs text-muted uppercase tracking-widest mb-1">Excuse</p>
                  <p className="text-lg font-bold text-text">"{report.excuse}"</p>
                </div>

                <div className="h-px bg-[var(--border)] mb-4" />

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-muted uppercase tracking-widest mb-1">Truth Score</p>
                    <p className="text-xl font-bold font-mono text-red-500">{report.truthScore}</p>
                  </div>
                  <div className="text-xs font-mono text-muted">
                    Analyzed by Ministry AI
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
