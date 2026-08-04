"use client";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Users, Pizza, AlertCircle, ShieldAlert } from "lucide-react";

export default function StatsSection() {
  const stats = [
    { label: "Pending Parties", value: 3, icon: Pizza, color: "text-warning" },
    { label: "Subscribers", value: 100000, suffix: "+", icon: Users, color: "text-success" },
    { label: "Excuses Used", value: 999, suffix: "+", icon: AlertCircle, color: "text-accent" },
    { label: "Trust Level", value: 0, suffix: "%", icon: ShieldAlert, color: "text-gray-400" },
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="glass-card p-4 sm:p-5 md:p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-3 sm:gap-4 group hover:bg-white/5 transition-colors text-center sm:text-left"
        >
          <div className={`p-3 sm:p-4 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform flex-shrink-0`}>
            <stat.icon size={24} className="sm:w-7 sm:h-7" />
          </div>
          <div className="min-w-0">
            <p className="text-gray-400 text-xs sm:text-sm font-medium truncate">{stat.label}</p>
            <p className="text-xl sm:text-2xl font-black">
              <CountUp end={stat.value} duration={3} separator="," />
              {stat.suffix}
            </p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
