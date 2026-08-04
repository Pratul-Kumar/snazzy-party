"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const predictions = [
  {
    title: 'Prediction Failed',
    subtitle: 'Party Not Found',
    date: 'UNKNOWN',
    confidence: '0.0001%',
    action: 'File Another Complaint',
  },
  {
    title: 'After 200K',
    subtitle: 'Next Sunday™',
    date: '🗓️',
    confidence: '99.9%',
    action: 'Celebrate',
  },
  { title: 'Loading...', subtitle: 'Try Again Next Birthday', date: '-', confidence: '-', action: '-' },
  { title: '404 Party Not Found', subtitle: 'Waiting For Silver Play Button', date: '-', confidence: '-', action: '-' },
  { title: 'Ask His Wallet', subtitle: 'Prediction Timeout', date: '-', confidence: '-', action: '-' },
];

export const PartyPredictor = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [step, setStep] = useState(0);

  const startPrediction = () => {
    setLoading(true);
    setResult(null);
    setStep(0);
    const messages = [
      'Checking Wallet...',
      'Consulting Government Database...',
      'Checking Restaurant Availability...',
      'Analyzing Excuse History...',
      'Contacting ISRO...',
      'Consulting Grandma...',
      'Calculating...',
    ];
    messages.forEach((msg, idx) => {
      setTimeout(() => setStep(idx + 1), idx * 300);
    });
    setTimeout(() => {
      const random = predictions[Math.floor(Math.random() * predictions.length)];
      setResult(random);
      setLoading(false);
    }, messages.length * 300 + 300);
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-5 md:p-6 bg-gray-900 bg-opacity-80 rounded-xl border border-red-600 shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-3 sm:mb-4 glow-text">Party Date Prediction Engine</h2>
      <p className="text-center text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">Powered by the Ministry of Party Intelligence</p>
      <div className="flex justify-center mb-4">
        <button
          onClick={startPrediction}
          disabled={loading}
          className="px-4 py-2.5 sm:py-2 bg-red-600 rounded hover:bg-red-700 transition disabled:opacity-50 text-sm sm:text-base min-h-[44px]"
        >
          Predict Party Date
        </button>
      </div>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-400"
          >
            {Array.from({ length: step }).map((_, i) => (
              <p key={i} className="text-xs sm:text-sm mb-1">
                {['Checking Wallet...','Consulting Government Database...','Checking Restaurant Availability...','Analyzing Excuse History...','Contacting ISRO...','Consulting Grandma...','Calculating...'][i]}
              </p>
            ))}
          </motion.div>
        )}
        {result && (
          <motion.div
            key="result"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="text-center text-white"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-2">{result.title}</h3>
            <p className="mb-1 text-sm sm:text-base">{result.subtitle}</p>
            <p className="mb-1 text-sm sm:text-base">Estimated Date: {result.date}</p>
            <p className="mb-1 text-sm sm:text-base">Confidence: {result.confidence}</p>
            <p className="font-semibold text-sm sm:text-base">Recommended Action: {result.action}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default PartyPredictor;
