"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface SubscriberData {
  subscriberCount: number | null;
  displayCount: string;
  channelTitle: string;
  is100K: boolean;
  isLoading: boolean;
  isError: boolean;
  toGo: string;
  progress: number;
  refetch: () => void;
}

const SubscriberContext = createContext<SubscriberData | undefined>(undefined);

function formatToGo(count: number | null): string {
  if (count === null) return "-- --";
  if (count >= 100_000) return "ACHIEVED";
  const remaining = 100_000 - count;
  if (remaining >= 1_000) {
    const k = remaining / 1_000;
    if (k % 1 === 0) return `${k}K TO GO`;
    return `${k.toFixed(1)}K TO GO`;
  }
  return `${remaining} TO GO`;
}

function calculateProgress(count: number | null): number {
  if (count === null) return 0;
  if (count >= 100_000) return 100;
  return Math.min((count / 100_000) * 100, 99.9);
}

export function SubscriberProvider({ children }: { children: ReactNode }) {
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState("-- --");
  const [channelTitle, setChannelTitle] = useState("SnazzyZone");
  const [is100K, setIs100K] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/youtube/stats");
      const data = await res.json();

      if (res.ok && data.success && data.subscriberCount !== null && data.subscriberCount !== undefined) {
        setSubscriberCount(data.subscriberCount);
        setDisplayCount(data.displayCount);
        setIs100K(data.is100K || false);
        setIsError(false);
      } else {
        // API returned an error structure or a non-200 status
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();

    // Refresh every 5 minutes for users who stay on-site
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  const toGo = formatToGo(subscriberCount);
  const progress = calculateProgress(subscriberCount);

  return (
    <SubscriberContext.Provider
      value={{
        subscriberCount,
        displayCount,
        channelTitle,
        is100K,
        isLoading,
        isError,
        toGo,
        progress,
        refetch: fetchStats,
      }}
    >
      {children}
    </SubscriberContext.Provider>
  );
}

export function useSubscriber() {
  const context = useContext(SubscriberContext);
  if (!context) {
    throw new Error("useSubscriber must be used within a SubscriberProvider");
  }
  return context;
}
