"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const COMPLAINTS = [
  { name: "Rahul", review: "I subscribed at 20K. Still waiting for samosa." },
  { name: "Aman", review: "Bro promised biryani in 2024. Still waiting." },
  { name: "Priya", review: "My grandchildren will get the party probably." },
  { name: "Vikram", review: "Used my 5 accounts to subscribe. Zero parties received." },
  { name: "Neha", review: "He bought a new setup but no budget for pizza?" },
  { name: "Rohan", review: "The excuse generator is 100% accurate. I've heard all of them." },
  { name: "Aditi", review: "I am starving since 50K." },
  { name: "Karan", review: "We should unsub until we get a treat." },
];

export default function ComplaintWall() {
  return (
    <section id="complaint" className="glass-card p-6 md:p-8 rounded-3xl h-auto flex flex-col">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-warning rounded-full"></span> Official Complaints
      </h2>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {COMPLAINTS.map((complaint, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/30 p-4 rounded-2xl border border-white/5 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={14} className="text-warning fill-warning" />
              ))}
            </div>
            <p className="text-lg italic mb-2">"{complaint.review}"</p>
            <p className="text-gray-400 text-sm font-bold">— {complaint.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
