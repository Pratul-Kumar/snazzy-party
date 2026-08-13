"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HorizontalJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  const panels = [
    { year: "2021", title: "CHANNEL CREATED 30 DEC", text: "Let's see where this goes." },
    { year: "2022", title: "SOMEWHERE ALONG THE WAY", text: "Things didn't always go as planned." },
    { year: "2024", title: "PAUSED", text: "Sometimes the uploads stopped." },
    { year: "2025", title: "RETURN", text: "But somehow... he came back." },
    { year: "2026", title: "2026", text: "Still here." },
  ];

  return (
    <section ref={containerRef} className="relative h-[300vh] section-premium bg-black cyber-grid scanlines">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-10 left-6 sm:left-10 z-10 text-muted tracking-widest text-sm font-bold font-gamer-heading">
          THE JOURNEY
        </div>
        
        <motion.div style={{ x }} className="flex h-full w-[500vw]">
          {panels.map((panel, index) => (
            <div 
              key={index} 
              className="relative flex h-full w-screen items-center justify-center p-6 sm:p-12"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <span className="text-[30vw] sm:text-[20vw] font-black tracking-tighter text-white">
                  {panel.year}
                </span>
              </div>
              
              <div className="z-10 w-full max-w-4xl text-center px-4">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-10%" }}
                  className="text-4xl sm:text-5xl md:text-7xl font-gamer-heading font-black tracking-tight text-white mb-6 uppercase leading-tight"
                >
                  {panel.title}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-xl sm:text-2xl md:text-4xl text-muted font-medium font-gamer-body"
                >
                  {panel.text}
                </motion.p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
