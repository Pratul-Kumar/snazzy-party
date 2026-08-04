"use client";
import React from 'react';

const queueList = [
  'Snazzy Bois',
  'Rahul',
  'Aman',
  'Hungry Subscribers',
  'You',
];

export const RecoveryQueue = () => {
  return (
    <div className="max-w-xl mx-auto p-4 sm:p-5 md:p-6 bg-gray-800 rounded-xl border border-accent">
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 glow-text">National Recovery Queue</h3>
      <ul className="list-decimal list-inside text-gray-200 space-y-1 text-sm sm:text-base">
        {queueList.map((name, idx) => (
          <li key={idx}>{idx + 1}. {name}</li>
        ))}
      </ul>
      <p className="mt-2 text-xs sm:text-sm text-gray-400">Estimated Waiting Time: Until Party Happens</p>
      <p className="text-xs sm:text-sm text-gray-400">Status: Waiting...</p>
    </div>
  );
};
export default RecoveryQueue;
