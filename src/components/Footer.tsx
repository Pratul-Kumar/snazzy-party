export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 py-12 md:py-24 relative overflow-hidden">
      {/* ═══ MOBILE COMPACT FOOTER (< 768px) ═══ */}
      <div className="md:hidden lg:max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center text-center pb-20">
        <h3 className="text-2xl font-gamer-heading tracking-widest text-white mb-2">SNAZZYZONE</h3>
        <p className="font-gamer-mono text-[8px] text-muted uppercase tracking-[0.3em] mb-8">
          PLAYER WORLD — EST. 2021
        </p>

        <div className="flex items-center gap-6 mb-8 font-gamer-mono text-[9px] text-white/50 tracking-[0.2em]">
          <a href="https://www.youtube.com/@SnazzyZone" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors border-b border-white/20 pb-1">
            YOUTUBE
          </a>
          <a href="mailto:asksnazzyzone@gmail.com" className="hover:text-white transition-colors border-b border-white/20 pb-1">
            CONTACT
          </a>
        </div>

        <p className="font-gamer-mono text-[7px] text-white/20 uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} SNAZZYZONE
        </p>
      </div>

      {/* ═══ DESKTOP FOOTER (≥ 768px) ═══ */}
      <div className="hidden md:block lg:max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-widest text-white">SNAZZYZONE</h3>
            <p className="text-xs font-bold text-muted uppercase tracking-widest leading-relaxed">
              Gaming • Creating • Coming Back<br />
              Since 30 Dec 2021
            </p>
          </div>

          {/* Channels */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Three Channels</h4>
            <ul className="space-y-2 text-xs font-bold text-muted uppercase tracking-widest">
              <li><a href="https://www.youtube.com/@SnazzyZone" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Snazzy Zone</a></li>
              <li><a href="https://www.youtube.com/@Snazzyplayz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Snazzy Playz</a></li>
              <li><a href="https://www.youtube.com/@SnazzyFlux" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Snazzy Flux</a></li>
            </ul>
          </div>

          {/* 2026 Goal */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">2026</h4>
            <p className="text-xs font-bold text-muted uppercase tracking-widest">
              🚗 THE DAD CAR GOAL
            </p>
          </div>

          {/* Socials / Built */}
          <div className="space-y-4 md:text-right lg:text-left">
            <h4 className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">YouTube</h4>
            <p className="text-xs font-bold text-muted uppercase tracking-widest">
              <a href="https://www.youtube.com/@SnazzyZone" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                @SnazzyZone
              </a>
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest text-center md:text-left">
            Built around a journey that isn't finished yet.
          </p>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest text-center md:text-right">
            © {new Date().getFullYear()} SNAZZYZONE
          </p>
        </div>
      </div>
    </footer>
  );
}
