"use client";

import { motion } from "framer-motion";

export default function ProofHeForgot() {
  return (
    <section className="section-premium">
      <div className="w-full">
        <h2 className="text-4xl sm:text-5xl font-black text-center mb-12 uppercase tracking-tight">
          Proof He <span className="text-accent">Forgot 😂</span>
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="surface-interactive p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-black uppercase text-accent tracking-widest bg-accent/10 px-2 py-1 rounded">Milestone 1</span>
              <h3 className="text-2xl font-black mt-4 mb-2">50K Subs</h3>
              <p className="text-sm font-medium text-muted">Bro said &quot;100K pe ek sath karenge.&quot; Big lie.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-xs uppercase font-bold text-muted">Status</span>
              <span className="text-red-500 font-black">STILL WAITING</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="surface-interactive p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-black uppercase text-gold tracking-widest bg-gold/10 px-2 py-1 rounded">Milestone 2</span>
              <h3 className="text-2xl font-black mt-4 mb-2">Birthday</h3>
              <p className="text-sm font-medium text-muted">Didn&apos;t even buy a cake. &quot;I don&apos;t celebrate birthdays.&quot; Yeah right.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-xs uppercase font-bold text-muted">Status</span>
              <span className="text-red-500 font-black">NO CAKE</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="surface-interactive p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-black uppercase text-green tracking-widest bg-green/10 px-2 py-1 rounded">Incoming</span>
              <h3 className="text-2xl font-black mt-4 mb-2">100K Subs</h3>
              <p className="text-sm font-medium text-muted">Approaching fast. 99.9% chance he dodges this too.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-xs uppercase font-bold text-muted">Status</span>
              <span className="text-accent font-black animate-pulse">EXTREME RISK</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
