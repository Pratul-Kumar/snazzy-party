"use client";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export default function Timeline() {
  const events = [
    { title: "10K Subscribers", achievement: true, party: false },
    { title: "20K Subscribers", achievement: true, party: false },
    { title: "50K Subscribers", achievement: true, party: false },
    { title: "Birthday", achievement: true, party: false },
    { title: "100K Subscribers", achievement: "Almost Complete", party: "CRITICAL" },
  ];

  return (
    <section id="timeline" className="glass-card p-5 sm:p-8 md:p-12 rounded-3xl">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 uppercase tracking-tight">Timeline of Crimes</h2>
        <p className="text-gray-400 text-sm sm:text-base">A detailed history of broken promises.</p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 md:-translate-x-1/2"></div>
        
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className={`relative flex items-center mb-8 sm:mb-10 md:mb-8 last:mb-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-4 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-accent md:-translate-x-1/2 shadow-[0_0_10px_rgba(255,56,56,0.8)] z-10"></div>
            
            {/* Spacer for alternating sides */}
            <div className="hidden md:block md:w-1/2"></div>
            
            <div className="ml-10 sm:ml-12 md:ml-0 md:w-1/2 px-2 sm:px-4 md:px-8">
              <div className="bg-black/40 border border-white/5 p-4 sm:p-6 rounded-2xl hover:bg-white/5 transition-colors relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{event.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="text-success flex-shrink-0" size={16} />
                    <span className="text-xs sm:text-sm">Achievement: {event.achievement === true ? "✔ Done" : event.achievement}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {event.party === false ? (
                      <XCircle className="text-accent flex-shrink-0" size={16} />
                    ) : (
                      <AlertTriangle className="text-warning animate-pulse flex-shrink-0" size={16} />
                    )}
                    <span className={`text-xs sm:text-sm font-bold ${event.party === false ? "text-accent" : "text-warning"}`}>
                      Party: {event.party === false ? "❌ Missing" : `🚨 ${event.party}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
