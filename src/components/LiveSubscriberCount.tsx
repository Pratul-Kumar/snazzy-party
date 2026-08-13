"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSubscriber } from "@/app/context/SubscriberContext";

type Variant = "profile" | "hud" | "quest" | "compact";

interface LiveSubscriberCountProps {
  variant?: Variant;
  className?: string;
}

export default function LiveSubscriberCount({
  variant = "compact",
  className = "",
}: LiveSubscriberCountProps) {
  const { displayCount, toGo, progress, is100K, isLoading, isError } = useSubscriber();

  if (variant === "hud") {
    if (isLoading) {
      return (
        <div className={`flex flex-col ${className}`}>
          <span className="font-gamer-mono text-[8px] md:text-[9px] tracking-[0.2em] text-[var(--muted)] mt-0.5">
            SUBSCRIBERS
          </span>
          <span className="font-gamer-heading text-base md:text-lg tracking-wider text-[var(--muted)] leading-none mt-1">
            LOADING...
          </span>
        </div>
      );
    }

    if (isError) {
      return (
        <div className={`flex flex-col ${className}`}>
          <span className="font-gamer-mono text-[8px] md:text-[9px] tracking-[0.2em] text-[var(--muted)] mt-0.5">
            SUBSCRIBERS
          </span>
          <span className="font-gamer-heading text-base md:text-lg tracking-wider text-[var(--text)] leading-none mt-1">
            --
          </span>
          <span className="font-gamer-mono text-[8px] md:text-[9px] tracking-[0.15em] text-red-500 mt-0.5">
            DATA UNAVAILABLE
          </span>
        </div>
      );
    }

    return (
      <div className={`flex flex-col ${className}`}>
        <AnimatePresence mode="wait">
          <motion.span
            key={displayCount}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="font-gamer-heading text-base md:text-lg tracking-wider text-[var(--text)] leading-none mt-1"
          >
            {displayCount}
          </motion.span>
        </AnimatePresence>
        <span className="font-gamer-mono text-[8px] md:text-[9px] tracking-[0.2em] text-[var(--muted)] mt-0.5">
          SUBSCRIBERS
        </span>
        <div className="flex items-center gap-2 mt-1">
          {!is100K ? (
            <span className="font-gamer-mono text-[8px] md:text-[9px] tracking-[0.15em] text-[var(--accent)]">
              {toGo}
            </span>
          ) : (
            <span className="font-gamer-mono text-[8px] md:text-[9px] tracking-[0.15em] text-[var(--accent-secondary)]">
              🏆 100K ACHIEVED
            </span>
          )}
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-gamer-mono text-[8px] md:text-[9px] tracking-[0.15em] text-red-500">
              LIVE
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "profile") {
    return (
      <motion.div
        className={`flex flex-col space-y-1 ${className}`}
        variants={{
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <span className="font-gamer-mono text-[9px] tracking-[0.25em] text-[var(--muted)] uppercase">
          SUBSCRIBERS
        </span>
        {isLoading ? (
          <span className="font-gamer-body text-[var(--muted)] text-lg md:text-xl uppercase tracking-wider">
            LOADING...
          </span>
        ) : isError ? (
          <div className="flex flex-col">
            <span className="font-gamer-body text-[var(--text)] text-lg md:text-xl uppercase tracking-wider">
              --
            </span>
            <span className="font-gamer-mono text-[7px] tracking-[0.15em] text-red-500 mt-1">
              DATA UNAVAILABLE
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={displayCount}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="font-gamer-body text-[var(--text)] text-lg md:text-xl uppercase tracking-wider"
              >
                {displayCount}
              </motion.span>
            </AnimatePresence>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-gamer-mono text-[7px] tracking-[0.15em] text-red-500">
                LIVE
              </span>
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  if (variant === "quest") {
    return (
      <div className={`${className}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--muted)]">
            {isLoading ? "LOADING..." : isError ? "--" : displayCount} / 100K
          </span>
          <span className="font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--accent)]">
            {isLoading ? "LOADING..." : isError ? "UNAVAILABLE" : is100K ? "✓ ACHIEVED" : toGo}
          </span>
        </div>
        <div className="w-full h-[3px] bg-white/10 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute left-0 top-0 bottom-0 rounded-full"
            style={{
              background: is100K
                ? "var(--accent-secondary)"
                : "var(--accent)",
            }}
            initial={{ width: "0%" }}
            whileInView={{ width: `${Math.min(progress, 100)}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>
    );
  }

  // compact (default)
  if (isLoading) {
    return <span className={`font-gamer-mono text-[var(--muted)] ${className}`}>LOADING...</span>;
  }
  if (isError) {
    return <span className={`font-gamer-mono text-red-500 ${className}`}>UNAVAILABLE</span>;
  }

  return (
    <span className={`font-gamer-mono text-[var(--text)] ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={displayCount}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {displayCount}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
