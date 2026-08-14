import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

const channels = [
  {
    id: "01",
    name: "SNAZZY ZONE",
    desc: "Main channel. Gaming. Experiments. The main journey.",
    url: "https://www.youtube.com/@SnazzyZone",
    action: "WATCH CHANNEL"
  },
  {
    id: "02",
    name: "SNAZZY PLAYZ",
    desc: "Gaming-focused content.",
    url: "#",
    action: "VISIT CHANNEL"
  },
  {
    id: "03",
    name: "SNAZZY FLUX",
    desc: "Another part of the creator's content ecosystem.",
    url: "#",
    action: "VISIT CHANNEL"
  }
];

export default function ChannelsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % channels.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeChannel = channels[activeIndex];

  return (
    <section id="channels" className="section-premium py-24 px-6 sm:px-12 bg-[var(--bg)] text-[var(--text)] font-[family-name:var(--font-inter)] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 border-b border-[var(--surface)] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-tight">
            Three Channels.<br/>
            <span className="text-[var(--muted)]">One Creator.</span>
          </h2>
          
          {/* Loop Indicators */}
          <div className="flex gap-2 pb-2">
            {channels.map((_, idx) => (
              <div 
                key={idx} 
                className="h-1 rounded-full transition-all duration-500 bg-[var(--accent)]"
                style={{ 
                  width: idx === activeIndex ? "32px" : "12px",
                  opacity: idx === activeIndex ? 1 : 0.3
                }}
              />
            ))}
          </div>
        </motion.div>

        <div className="relative min-h-[250px] sm:min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChannel.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
            >
              <div className="flex items-start gap-6 sm:gap-10 flex-1">
                <span className="text-4xl sm:text-6xl font-black text-[var(--accent)] transition-colors duration-300 mt-1 sm:mt-0 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  {activeChannel.id}
                </span>
                <div>
                  <h3 className="text-3xl sm:text-5xl font-bold mb-4 uppercase tracking-tight">
                    {activeChannel.name}
                  </h3>
                  <p className="text-[var(--muted)] text-xl sm:text-2xl max-w-xl leading-relaxed">
                    {activeChannel.desc}
                  </p>
                </div>
              </div>
              
              <a 
                href={activeChannel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-6 rounded-full bg-[var(--surface)] hover:bg-[var(--accent)] hover:text-black transition-all duration-300 font-bold uppercase tracking-widest text-sm mt-4 lg:mt-0 self-start lg:self-center"
              >
                {activeChannel.action}
                <ExternalLink size={20} />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
