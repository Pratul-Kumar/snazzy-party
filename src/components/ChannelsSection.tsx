"use client";

import { motion } from "framer-motion";
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
  return (
    <section className="section-premium py-24 px-6 sm:px-12 bg-[var(--bg)] text-[var(--text)] font-[family-name:var(--font-inter)]">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 border-b border-[var(--surface)] pb-8"
        >
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-tight">
            Three Channels.<br/>
            <span className="text-[var(--muted)]">One Creator.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-12 sm:gap-16">
          {channels.map((channel, index) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
            >
              <div className="flex items-start gap-6 sm:gap-10 flex-1">
                <span className="text-3xl sm:text-5xl font-black text-[var(--surface)] group-hover:text-[var(--accent)] transition-colors duration-300 mt-1 sm:mt-0">
                  {channel.id}
                </span>
                <div>
                  <h3 className="text-2xl sm:text-4xl font-bold mb-3 uppercase tracking-tight">
                    {channel.name}
                  </h3>
                  <p className="text-[var(--muted)] text-lg sm:text-xl max-w-xl leading-relaxed">
                    {channel.desc}
                  </p>
                </div>
              </div>
              
              <a 
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-5 rounded-full bg-[var(--surface)] hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase tracking-wider text-sm mt-4 lg:mt-0 self-start lg:self-center"
              >
                {channel.action}
                <ExternalLink size={18} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
