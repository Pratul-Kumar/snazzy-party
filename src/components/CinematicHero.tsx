"use client";

import { motion } from "framer-motion";

export default function CinematicHero() {
  const floatingItems = [
    { text: "CREATING SINCE 2021", delay: 0 },
    { text: "3 CHANNELS", delay: 0.2 },
    { text: "2026 GOAL", delay: 0.4 },
    { text: "∞ RETRIES", delay: 0.6 }
  ];

  return (
    <section className="relative min-h-[100svh] w-full bg-[#050505] text-white overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-24 cyber-grid scanlines">
      {/* Background Gradient/Glow Effects */}
      <div className="absolute top-0 right-0 w-[80vw] md:w-[50vw] h-full pointer-events-none">
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-72 h-72 bg-[#ff3b30]/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 right-[20%] w-64 h-64 bg-[#ffcc00]/10 rounded-full blur-[80px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10 w-full max-w-7xl mx-auto">
        {/* Left: Typography & Command Bar */}
        <div className="flex flex-col items-start gap-6 pt-24 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#ff3b30] font-gamer-heading text-sm md:text-base tracking-widest mb-4">
              GAMING CREATOR
            </h2>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-gamer-heading font-black tracking-tighter leading-[0.85] mb-6">
              SNAZZY<br />ZONE
            </h1>
            <p className="text-lg md:text-xl text-white/60 font-gamer-body font-light max-w-md">
              Still playing. Still creating. Still coming back.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 w-full max-w-2xl bg-[#111111]/80 backdrop-blur-md gamer-border p-6"
          >
            <p className="font-gamer-heading text-xs text-white/50 mb-4 uppercase">
              WHAT DO YOU WANT TO EXPLORE?
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              {[
                { label: "[ THE JOURNEY ]", href: "#journey" },
                { label: "[ THE GAMES ]", href: "#games" },
                { label: "[ THE CHANNELS ]", href: "#channels" },
                { label: "[ THE GOAL ]", href: "#2026" },
                { label: "[ PLAY ]", href: "#arena" }
              ].map((cmd, i) => (
                <a 
                  key={i} 
                  href={cmd.href}
                  className="bg-white/5 hover:bg-white/10 gamer-border px-4 py-3 sm:py-2 font-gamer-body text-sm text-center sm:text-left text-white/80 transition-all w-full sm:w-auto"
                >
                  {cmd.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Ambient Representation & Floating Elements */}
        <div className="relative h-[400px] md:h-[600px] flex items-center justify-center mt-12 lg:mt-0">
          <div className="absolute inset-0 bg-[#111111] rounded-3xl border border-white/5 overflow-hidden shadow-2xl shadow-black/50">
             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
             <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
             <div className="w-full h-full border border-white/5 rounded-3xl" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center flex-wrap gap-4 p-8 z-20">
            {floatingItems.map((item, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut"
                }}
                className="bg-black/60 backdrop-blur-md gamer-border px-6 py-3 shadow-lg m-2"
              >
                <span className="font-gamer-body text-sm tracking-widest text-white/90">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
