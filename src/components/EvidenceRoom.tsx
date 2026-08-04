"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FolderOpen, X } from "lucide-react";

const EVIDENCE = [
  {
    id: "001",
    title: "50K Reached",
    status: "CONFIRMED",
    party: "Missing",
    color: "text-green-500",
    details: "Defendant crossed the 50K subscriber milestone. A celebration was promised but never delivered. Subject claims they 'forgot' and offered a fake apology.",
  },
  {
    id: "002",
    title: "Birthday",
    status: "CONFIRMED",
    party: "Missing",
    color: "text-green-500",
    details: "Subject successfully aged by one year. Friends gathered in anticipation of cake. No cake was provided. Excuses cited: 'I don't celebrate birthdays anymore'.",
  },
  {
    id: "003",
    title: "100K Incoming",
    status: "PENDING",
    party: "EXTREME RISK",
    color: "text-red-500",
    details: "The 100K milestone is approaching rapidly. Historical data indicates a 99.9% probability of another fake promise. Immediate intervention required.",
  },
];

export default function EvidenceRoom() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedEvidence = EVIDENCE.find((e) => e.id === selectedId);

  return (
    <section className="section-premium">
      <div className="w-full">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="text-[11px] font-medium text-muted uppercase tracking-[0.2em] flex items-center gap-2">
            <FolderOpen size={14} /> Classified Evidence
          </span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {EVIDENCE.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onClick={() => setSelectedId(item.id)}
              className="surface-interactive p-5 cursor-pointer relative group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-[var(--border)] group-hover:bg-accent transition-colors rounded-l-2xl" />
              <p className="text-[10px] uppercase tracking-widest text-muted mb-2 font-mono">
                Evidence #{item.id}
              </p>
              <h3 className="text-lg font-bold mb-4">{item.title}</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Status</span>
                  <span className={`font-bold ${item.status === 'CONFIRMED' ? 'text-green-500' : 'text-yellow-500'}`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Party</span>
                  <span className={`font-bold ${item.color}`}>
                    {item.party}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvidence && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="surface max-w-md w-full p-6 sm:p-8 relative"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 text-muted hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <Search className="text-accent" />
                <h3 className="text-xl font-bold">Investigation File</h3>
              </div>

              <div className="surface p-4 mb-6">
                <p className="text-[10px] text-muted uppercase tracking-widest mb-1 font-mono">Evidence #{selectedEvidence.id}</p>
                <h4 className="text-2xl font-bold mb-4">{selectedEvidence.title}</h4>
                
                <div className="space-y-2 mb-4 border-t border-[var(--border)] pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Milestone Status</span>
                    <span className="font-bold">{selectedEvidence.status}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Party Status</span>
                    <span className={`font-bold ${selectedEvidence.color}`}>{selectedEvidence.party}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted uppercase tracking-widest mb-2 font-bold">Field Notes</p>
                <p className="text-sm text-text leading-relaxed">
                  {selectedEvidence.details}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
