"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import toast from "react-hot-toast";
import { syncUserProfile } from "@/lib/firebase";

export interface UserStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  currentWinStreak: number;
  bestWinStreak: number;
  petitionsCreated: number;
  invites: number;
  partyPressure: number;
}

export interface UserProfile {
  name: string;
  odId: string;
  side: "🍕" | "🍗";
  role: "USER" | "OWNER";
  xp: number;
  level: number;
  title: string;
  stats: UserStats;
  achievements: string[];
  completedEvents: string[];
  createdAt: number;
  updatedAt: number;
}

interface UserContextProps {
  profile: UserProfile | null;
  hasIdentity: boolean;
  createIdentity: (name: string, side: "🍕" | "🍗") => void;
  updateStat: (key: keyof UserStats, delta: number) => void;
  awardXP: (actionType: string, eventId?: string) => void;
  getHungryLevel: () => number;
  isOwner: boolean;
  setLevelOverride: (level: number) => void; // for owner controls
}

const STORAGE_KEY = "snazzy_bois_profile_v2";
const OWNER_ID = "SB_TI32W1VX";

const DEFAULT_STATS: UserStats = {
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  currentWinStreak: 0,
  bestWinStreak: 0,
  petitionsCreated: 0,
  invites: 0,
  partyPressure: 0,
};

// Level Titles
export const getLevelTitle = (level: number) => {
  if (level >= 50) return "👑 SUPREME HUNGRY BOI";
  if (level >= 20) return "🔥 PARTY LEGEND";
  if (level >= 10) return "🎮 PARTY VETERAN";
  if (level >= 5) return "🍗 HUNGRY WARRIOR";
  if (level >= 3) return "🍟 PARTY ROOKIE";
  if (level >= 2) return "🥤 HUNGRY INTERN";
  return "🥲 NEW RECRUIT";
};

// XP Formula: XP(L) = XP(L-1) + 50 * L
export function getXPForLevel(level: number): number {
  if (level <= 1) return 0;
  let totalXP = 0;
  for (let i = 1; i < level; i++) {
    totalXP += 50 + (i * 50);
  }
  return totalXP;
}

export function calculateLevel(xp: number): number {
  let level = 1;
  while (true) {
    let nextXP = getXPForLevel(level + 1);
    if (xp >= nextXP) {
      level++;
    } else {
      break;
    }
  }
  return level;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  const isOwner = profile?.odId === OWNER_ID;

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile({
          ...parsed,
          stats: { ...DEFAULT_STATS, ...(parsed.stats || {}) },
          achievements: parsed.achievements || [],
          completedEvents: parsed.completedEvents || [],
        });
      }
    } catch {
      // Corrupted data, ignore
    }
  }, []);

  // Save to localStorage & Firebase whenever profile changes
  useEffect(() => {
    if (profile) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      syncUserProfile(profile).catch(console.error);
    }
  }, [profile]);

  const createIdentity = useCallback((name: string, side: "🍕" | "🍗") => {
    // Generate new ID unless they type exactly "OWNER_SECRET_LOGIN_Pratul"
    const odId = name === "OWNER_SECRET_LOGIN_Pratul" 
      ? OWNER_ID 
      : "SB_" + Math.random().toString(36).substr(2, 8).toUpperCase();
    
    const role = odId === OWNER_ID ? "OWNER" : "USER";

    const newProfile: UserProfile = {
      name: odId === OWNER_ID ? "PRATUL" : name,
      odId,
      side,
      role,
      xp: 0,
      level: 1,
      title: odId === OWNER_ID ? "🍕 PARTY COMMANDER" : "🥲 NEW RECRUIT",
      stats: { ...DEFAULT_STATS },
      achievements: [],
      completedEvents: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    setProfile(newProfile);
    
    // Defer awardXP to next tick so profile is set
    setTimeout(() => {
      if (role !== "OWNER") {
        setProfile(prev => {
          if (!prev) return prev;
          const updated = { ...prev, xp: 10, achievements: ["🍕 FIRST BITE"] };
          updated.level = calculateLevel(updated.xp);
          updated.title = getLevelTitle(updated.level);
          return updated;
        });
      }
    }, 100);
  }, []);

  const awardXP = useCallback((actionType: string, eventId?: string) => {
    setProfile((prev) => {
      if (!prev || prev.role === "OWNER") return prev;

      // Anti-farming check
      if (eventId && prev.completedEvents.includes(eventId)) {
        return prev;
      }

      let xpGained = 0;
      let newAchievements = [...prev.achievements];

      switch (actionType) {
        case "PETITION":
          xpGained = 25;
          if (!newAchievements.includes("✍️ SIGNED")) newAchievements.push("✍️ SIGNED");
          break;
        case "FOOD_POLL":
          xpGained = 10;
          if (!newAchievements.includes("🍗 FOOD WARRIOR")) newAchievements.push("🍗 FOOD WARRIOR");
          break;
        case "TICTACTOE_PLAY":
          xpGained = 10;
          break;
        case "TICTACTOE_WIN":
          xpGained = 80;
          if (!newAchievements.includes("🎮 FIRST BLOOD")) newAchievements.push("🎮 FIRST BLOOD");
          break;
        case "TICTACTOE_DRAW":
          xpGained = 15;
          break;
        case "TICTACTOE_STREAK_5":
          xpGained = 250;
          if (!newAchievements.includes("🔥 ON FIRE")) newAchievements.push("🔥 ON FIRE");
          break;
      }

      if (xpGained === 0) return prev;

      const newXp = prev.xp + xpGained;
      const newLevel = calculateLevel(newXp);
      const newTitle = getLevelTitle(newLevel);
      
      let events = prev.completedEvents;
      if (eventId) {
        events = [...events, eventId];
      }

      if (newLevel >= 20 && !newAchievements.includes("👑 PARTY LEGEND")) {
        newAchievements.push("👑 PARTY LEGEND");
      }

      if (newLevel > prev.level) {
        // Trigger global animation via event
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('levelUp', { detail: { level: newLevel, title: newTitle } }));
        }
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        title: newTitle,
        achievements: newAchievements,
        completedEvents: events,
        updatedAt: Date.now(),
      };
    });
  }, []);

  const updateStat = useCallback((key: keyof UserStats, delta: number) => {
    setProfile((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        stats: {
          ...prev.stats,
          [key]: prev.stats[key] + delta,
        },
        updatedAt: Date.now(),
      };
    });
  }, []);

  const getHungryLevel = useCallback(() => {
    if (!profile) return 0;
    return Math.min(100, Math.round(profile.stats.partyPressure * 1.2));
  }, [profile]);

  const setLevelOverride = useCallback((level: number) => {
    if (!isOwner) return;
    setProfile((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        level,
        xp: getXPForLevel(level),
        updatedAt: Date.now(),
      };
    });
  }, [isOwner]);

  return (
    <UserContext.Provider
      value={{
        profile,
        hasIdentity: !!profile,
        createIdentity,
        updateStat,
        awardXP,
        getHungryLevel,
        isOwner,
        setLevelOverride,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
