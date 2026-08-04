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
      <div className="p-6 bg-gray-800 rounded border border-green-500 text-white max-w-xl mx-auto">
        <h3 className="text-xl font-bold mb-2">Application Submitted Successfully</h3>
        <p>Application ID: {appId}</p>
        <p>Status: UNDER INVESTIGATION</p>
        <p>Estimated Recovery Time: 3–5 Business Parties</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-gray-900 rounded border border-accent">
      <h2 className="text-2xl font-bold text-center text-white mb-4 glow-text">Party Recovery Application</h2>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Applicant Name</label>
        <input type="text" required className="w-full px-3 py-2 bg-gray-800 text-white rounded" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Relationship</label>
        <select required className="w-full px-3 py-2 bg-gray-800 text-white rounded">
          <option>Friend</option>
          <option>Subscriber</option>
          <option>Hungry Victim</option>
          <option>Family Member</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Reason</label>
        <select required className="w-full px-3 py-2 bg-gray-800 text-white rounded">
          <option>50K Party Pending</option>
          <option>Birthday Pending</option>
          <option>100K Party Pending</option>
          <option>Too Many Excuses</option>
          <option>Emotional Damage</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Expected Compensation</label>
        <div className="flex flex-wrap gap-2">
          {['Pizza','Biryani','Cake','Cold Drink','Gulab Jamun','Other'].map(item => (
            <label key={item} className="inline-flex items-center">
              <input type="checkbox" className="mr-1" /> {item}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Additional Evidence</label>
        <textarea required className="w-full px-3 py-2 bg-gray-800 text-white rounded" rows={3}></textarea>
      </div>
      <div className="flex items-center mb-4">
        <input type="checkbox" required id="confirm" className="mr-2" />
        <label htmlFor="confirm" className="text-gray-400 text-sm">I confirm the accused has repeatedly delayed party-related responsibilities.</label>
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition">Submit Complaint</button>
    </form>
  );
};
