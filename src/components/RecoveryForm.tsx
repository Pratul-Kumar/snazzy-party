"use client";

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { usePortal } from '../app/context/PortalContext';

export const RecoveryForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');
  const { generateId } = usePortal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = generateId('PRD-2026-');
    setAppId(id);
    setSubmitted(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  if (submitted) {
    return (
      <div className="p-4 sm:p-5 md:p-6 bg-gray-800 rounded-xl border border-green-500 text-white max-w-xl mx-auto">
        <h3 className="text-lg sm:text-xl font-bold mb-2">Application Submitted Successfully</h3>
        <p className="text-sm sm:text-base">Application ID: {appId}</p>
        <p className="text-sm sm:text-base">Status: UNDER INVESTIGATION</p>
        <p className="text-sm sm:text-base">Estimated Recovery Time: 3–5 Business Parties</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 sm:p-5 md:p-6 bg-gray-900 rounded-xl border border-accent">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-3 sm:mb-4 glow-text">Party Recovery Application</h2>
      <div className="mb-3 sm:mb-4">
        <label className="block text-gray-300 mb-1 text-sm sm:text-base">Applicant Name</label>
        <input type="text" required className="w-full px-3 py-2.5 sm:py-2 bg-gray-800 text-white rounded min-h-[44px] text-sm sm:text-base" />
      </div>
      <div className="mb-3 sm:mb-4">
        <label className="block text-gray-300 mb-1 text-sm sm:text-base">Relationship</label>
        <select required className="w-full px-3 py-2.5 sm:py-2 bg-gray-800 text-white rounded min-h-[44px] text-sm sm:text-base">
          <option>Friend</option>
          <option>Subscriber</option>
          <option>Hungry Victim</option>
          <option>Family Member</option>
        </select>
      </div>
      <div className="mb-3 sm:mb-4">
        <label className="block text-gray-300 mb-1 text-sm sm:text-base">Reason</label>
        <select required className="w-full px-3 py-2.5 sm:py-2 bg-gray-800 text-white rounded min-h-[44px] text-sm sm:text-base">
          <option>50K Party Pending</option>
          <option>Birthday Pending</option>
          <option>100K Party Pending</option>
          <option>Too Many Excuses</option>
          <option>Emotional Damage</option>
        </select>
      </div>
      <div className="mb-3 sm:mb-4">
        <label className="block text-gray-300 mb-1 text-sm sm:text-base">Expected Compensation</label>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {['Pizza','Biryani','Cake','Cold Drink','Gulab Jamun','Other'].map(item => (
            <label key={item} className="inline-flex items-center py-2 text-sm sm:text-base min-h-[44px]">
              <input type="checkbox" className="mr-1.5 w-4 h-4" /> {item}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-3 sm:mb-4">
        <label className="block text-gray-300 mb-1 text-sm sm:text-base">Additional Evidence</label>
        <textarea required className="w-full px-3 py-2.5 sm:py-2 bg-gray-800 text-white rounded text-sm sm:text-base" rows={3}></textarea>
      </div>
      <div className="flex items-start gap-2 mb-3 sm:mb-4">
        <input type="checkbox" required id="confirm" className="mt-1 w-4 h-4 flex-shrink-0" />
        <label htmlFor="confirm" className="text-gray-400 text-xs sm:text-sm leading-relaxed">I confirm the accused has repeatedly delayed party-related responsibilities.</label>
      </div>
      <button type="submit" className="w-full px-4 py-2.5 sm:py-2 bg-green-600 rounded hover:bg-green-700 transition min-h-[44px] font-bold text-sm sm:text-base">Submit Complaint</button>
    </form>
  );
};
export default RecoveryForm;
