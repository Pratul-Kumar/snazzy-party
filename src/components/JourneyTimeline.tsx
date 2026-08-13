"use client";

import { motion } from "framer-motion";

const timelineEvents = [
  { title: "30 DEC 2021", desc: "CHANNEL STARTED", note: "Day one." },
  { title: "EARLY DAYS", desc: "Learning. Experimenting. Figuring things out.", note: "" },
  { title: "THE BREAKS", desc: "Sometimes life happened. Sometimes motivation disappeared. Some handles came and went.", note: "" },
  { title: "THE RETURN", desc: "Because giving up was never permanent.", note: "" },
  { title: "TODAY", desc: "Still creating. Still gaming. Still building.", note: "" },
  { title: "2026", desc: "Next chapter.", note: "" },
];

export default function JourneyTimeline() {
  return (
    <section className="section-premium py-20 px-6 sm:px-12 bg-[var(--bg)] text-[var(--text)] font-[family-name:var(--font-inter)]">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 uppercase">The Journey</h2>
          <p className="text-[var(--muted)] text-lg md:text-xl max-w-2xl">Not every year was a win. But he kept coming back.</p>
        </motion.div>

        <div className="relative border-l border-[var(--surface)] ml-4 md:ml-6">
          {timelineEvents.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-12 ml-8 md:ml-12 relative"
            >
              <div className="absolute -left-[41px] md:-left-[57px] top-1 bg-[var(--surface)] p-2 rounded-full border border-[var(--bg)]">
                <div className="w-3 h-3 bg-[var(--accent)] rounded-full" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-2">{event.title}</h3>
              <p className="text-[var(--muted)] text-base md:text-lg mb-1">{event.desc}</p>
              {event.note && (
                <span className="text-[var(--text)] font-medium text-sm md:text-base">{event.note}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
