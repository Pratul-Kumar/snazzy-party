"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ExcuseAnalyzer – a premium interactive widget that lets users enter a
 * "complaint" and receive a humorous, AI‑generated excuse. The UI follows the
 * same glassmorphism, dark‑mode styling used throughout the site.
 */
export default function ExcuseAnalyzer() {
  const [input, setInput] = useState('');
  const [excuse, setExcuse] = useState('');
  const [loading, setLoading] = useState(false);

  const generateExcuse = async () => {
    if (!input) return;
    setLoading(true);
    // Mock AI generation – in a real app this would call an API.
    const mockExcuse = `Because the party was too wild, the ${input.toLowerCase()} got lost in the confetti!`;
    // Simulate async delay
    await new Promise((r) => setTimeout(r, 800));
    setExcuse(mockExcuse);
    setLoading(false);
  };

  return (
    <section className="max-w-2xl mx-auto p-4 md:p-6 bg-gray-900 bg-opacity-80 rounded-xl shadow-xl backdrop-blur-sm text-white">
      <h2 className="text-2xl font-bold mb-4 text-center glow-text">Excuse Analyzer</h2>
      <p className="mb-4 text-center text-gray-300">
        Type a reason why a celebration went sideways and get a witty, official‑style excuse.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="e.g., missing cake"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          onClick={generateExcuse}
          disabled={loading}
          className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/90 transition disabled:opacity-50"
        >
          {loading ? 'Analyzing…' : 'Generate'}
        </button>
      </div>
      {excuse && (
        <motion.div
          className="p-4 bg-gray-800 rounded mt-2 border-l-4 border-accent"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-mono text-sm">{excuse}</p>
        </motion.div>
      )}
    </section>
  );
}
