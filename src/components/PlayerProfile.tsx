"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import LiveSubscriberCount from "@/components/LiveSubscriberCount";

export default function PlayerProfile() {
  const [imageError, setImageError] = useState(false);

  return (
    <>
      {/* ═══ MOBILE HOME SCREEN (< 768px) ═══ */}
      <section className="md:hidden min-h-[100dvh] w-full flex flex-col relative overflow-hidden pt-6 pb-24 px-6">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <img 
            src="/images/profile_bg.jpg" 
            alt="Profile Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/50 to-transparent" />
        </div>

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <a 
            href="https://www.youtube.com/@SnazzyZone" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 active:scale-95 transition-transform p-1 -m-1"
          >
            <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-full border border-[var(--accent)]/30" />
            <span className="font-gamer-heading text-lg tracking-widest text-[var(--text)]">SNAZZYZONE</span>
          </a>
          <div className="text-right">
            <span className="font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--muted)] block">PLAYER</span>
            <span className="font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--accent)]">LVL 01</span>
          </div>
        </div>

        {/* Hero Photo */}
        <div className="relative w-full aspect-[4/5] max-h-[40vh] border border-[var(--accent)]/30 rounded-2xl overflow-hidden mb-8 shadow-2xl">
          {!imageError ? (
            <img 
              src="/images/snazzyzone-profile.webp" 
              alt="Player Profile" 
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-[var(--surface)] flex items-center justify-center">
              <span className="font-gamer-mono text-[10px] tracking-[0.25em] text-[var(--muted)]">NO SIGNAL</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="font-gamer-heading text-4xl text-white tracking-wider leading-none mb-2">SNAZZY<br/>ZONE</h2>
            <p className="font-gamer-mono text-[8px] tracking-[0.2em] text-white/70 uppercase">
              Still playing. Still creating. Still coming back.
            </p>
          </div>
        </div>

        {/* Quick Quest Info */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-auto">
          <span className="font-gamer-mono text-[8px] tracking-[0.3em] text-[var(--accent)] block mb-3">CURRENT QUEST</span>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl">🚗</span>
            <div>
              <span className="font-gamer-heading text-xl text-white tracking-widest block">GET DAD A CAR</span>
              <span className="font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--muted)]">2026 ERA</span>
            </div>
          </div>
          <button 
            onClick={() => document.getElementById("questlog")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full py-3 bg-[var(--accent)] text-white font-gamer-mono text-[10px] tracking-[0.3em] rounded-xl text-center"
          >
            [ EXPLORE ]
          </button>
        </div>
      </section>

      {/* ═══ DESKTOP PLAYER PROFILE (≥ 768px) ═══ */}
      <section className="hidden md:flex min-h-screen w-full flex-col md:flex-row items-center py-20 md:py-0 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <img 
            src="/images/profile_bg.jpg" 
            alt="Profile Background" 
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--bg)]/80 to-[var(--bg)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
        </div>

        {/* Left Side: Photo */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 flex justify-center md:justify-end md:pr-10 lg:pr-20 px-6 md:px-0 mb-12 md:mb-0"
        >
          <div className="relative w-full max-w-[400px] md:max-w-[450px] aspect-[16/9] md:aspect-[3/4] border-l-[3px] border-[var(--accent)] overflow-hidden">
            {!imageError ? (
              <img 
                src="/images/snazzyzone-profile.webp" 
                alt="Player Profile" 
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] flex items-center justify-center">
                <span className="font-gamer-mono text-[10px] tracking-[0.25em] text-[var(--muted)]">NO SIGNAL</span>
              </div>
            )}
            {/* Grain overlay */}
            <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay pointer-events-none" style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}></div>
          </div>
        </motion.div>

        {/* Right Side: Info */}
        <div className="w-full md:w-1/2 px-6 md:pl-10 lg:pl-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="font-gamer-mono text-[10px] tracking-[0.25em] text-[var(--accent)] mb-4">
              // PLAYER PROFILE
            </div>
            <h2 className="font-gamer-heading text-5xl md:text-7xl text-[var(--text)] uppercase leading-none mb-2">
              SNAZZYZONE
            </h2>
            <div className="font-gamer-mono text-[10px] tracking-[0.4em] text-[var(--muted)] mb-12">
              GAMING CREATOR
            </div>

            <div className="w-full h-[1px] bg-[var(--muted)]/10 mb-8"></div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 gap-y-6 gap-x-8 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              <StatItem label="CREATING SINCE" value="30 DEC 2021" />
              <StatItem label="CHANNELS" value="03" />
              <StatItem label="CURRENT ERA" value="2026" />
              <LiveSubscriberCount variant="profile" />
              <motion.div 
                className="flex flex-col space-y-1"
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <span className="font-gamer-mono text-[9px] tracking-[0.25em] text-[var(--muted)] uppercase">
                  STATUS
                </span>
                <div className="font-gamer-body text-[var(--text)] text-lg md:text-xl uppercase tracking-wider flex items-center space-x-2 mt-1">
                  <span>ACTIVE</span>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mt-0.5"></span>
                </div>
              </motion.div>
            </motion.div>

            <div className="w-full h-[1px] bg-[var(--muted)]/10 mb-8"></div>

            {/* Metadata */}
            <motion.div 
              className="flex flex-col space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              <MetaItem label="PLAYER ID" value="SNAZZYZONE" />
              <MetaItem label="SAVE POINT" value="2026" />
              <MetaItem label="CURRENT QUEST" value="🚗 GET DAD A CAR" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <motion.div 
      className="flex flex-col space-y-1"
      variants={{
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 }
      }}
    >
      <span className="font-gamer-mono text-[9px] tracking-[0.25em] text-[var(--muted)] uppercase">
        {label}
      </span>
      <span className="font-gamer-body text-[var(--text)] text-lg md:text-xl uppercase tracking-wider">
        {value}
      </span>
    </motion.div>
  );
}

function MetaItem({ label, value }: { label: string, value: string }) {
  return (
    <motion.div 
      className="grid grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-baseline gap-4"
      variants={{
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 }
      }}
    >
      <span className="font-gamer-mono text-[9px] tracking-[0.25em] text-[var(--muted)] uppercase">
        {label}
      </span>
      <span className="font-gamer-body text-[var(--text)] text-base md:text-lg uppercase tracking-wider">
        {value}
      </span>
    </motion.div>
  );
}
