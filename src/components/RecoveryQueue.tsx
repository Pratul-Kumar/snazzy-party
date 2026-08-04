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
    <div className="p-4 md:p-6 bg-gray-800 rounded border border-accent">
      <h3 className="text-xl font-bold text-white mb-2 glow-text">National Recovery Queue</h3>
      <ul className="list-decimal list-inside text-gray-200 space-y-1">
        {queueList.map((name, idx) => (
          <li key={idx}>{idx + 1}. {name}</li>
        ))}
      </ul>
      <p className="mt-2 text-sm text-gray-400">Estimated Waiting Time: Until Party Happens</p>
      <p className="text-sm text-gray-400">Status: Waiting...</p>
    </div>
  );
};
export default RecoveryQueue;
