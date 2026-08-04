"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";

const NOTIFICATIONS = [
  "Rahul joined the protest.",
  "Aman rejected another excuse.",
  "Three hungry friends are nearby.",
  "Warning: Pizza has been ordered without permission.",
  "SnazzyZone tried escaping.",
  "New excuse detected: 'I forgot my wallet'.",
  "Threat level increased: Friends have forks.",
];

export default function FakeNotifications() {
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const showRandomNotification = () => {
      const randomMsg = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
      setNotification(randomMsg);
      
      setTimeout(() => {
        setNotification(null);
      }, 4000); // Hide after 4 seconds
    };

    // First notification after 3 seconds
    const initialTimer = setTimeout(showRandomNotification, 3000);
    
    // Then every 8 seconds
    const interval = setInterval(showRandomNotification, 8000);
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass-card bg-black/80 border border-white/10 shadow-2xl p-4 rounded-xl flex items-start gap-3 max-w-sm pointer-events-auto"
          >
            <div className="bg-accent/20 p-2 rounded-lg mt-1 text-accent animate-pulse">
              <Bell size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase mb-1">Live Update</p>
              <p className="text-sm font-medium">{notification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
