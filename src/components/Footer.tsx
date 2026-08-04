"use client";

export default function Footer() {
  return (
    <footer className="mt-12 sm:mt-16 py-8 sm:py-10 border-t border-white/10 text-center px-4 sm:px-6 relative z-10 bg-black/50 backdrop-blur-md">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 sm:gap-6">
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-white glow-text">
          Party Recovery Department
        </h2>
        <p className="text-gray-400 font-medium italic text-sm sm:text-base">
          Recovering Pending Celebrations Since Forever™
        </p>
        
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full opacity-50"></div>
        
        <div className="space-y-2 text-sm text-gray-500">
          <p>
            Made with <span className="text-accent animate-pulse">❤️</span> by Friends Association
          </p>
          <p className="font-bold">
            Built with ❤️ by SNAZZY JANTA PARTY (AKA SNAXZY BOIS)
          </p>
          <p className="uppercase text-xs tracking-widest mt-2">
            Department of Party Recovery & Celebration Affairs
          </p>
          <p className="italic font-bold text-white/50">
            "No Subscriber Left Hungry"
          </p>
          <p className="pt-4 border-t border-white/5 mt-4 text-xs">
            © 2026 All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
