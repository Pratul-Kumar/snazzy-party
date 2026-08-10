"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import toast from "react-hot-toast";
import { syncUserProfile } from "@/lib/firebase";
import { auth, db } from "@/lib/firebase";
import { 
  onAuthStateChanged, 
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  linkWithCredential,
  EmailAuthProvider
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
  uid: string; // Firebase UID
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
  isAnonymous: boolean;
  setLevelOverride: (level: number) => void; 
  signUpWithEmail: (email: string, pass: string, name: string, side: "🍕" | "🍗") => Promise<void>;
  logInWithEmail: (email: string, pass: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const STORAGE_KEY = "snazzy_bois_profile_v2";

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

export const getLevelTitle = (level: number) => {
  if (level >= 50) return "👑 SUPREME HUNGRY BOI";
  if (level >= 20) return "🔥 PARTY LEGEND";
  if (level >= 10) return "🎮 PARTY VETERAN";
  if (level >= 5) return "🍗 HUNGRY WARRIOR";
  if (level >= 3) return "🍟 PARTY ROOKIE";
  if (level >= 2) return "🥤 HUNGRY INTERN";
  return "🥲 NEW RECRUIT";
};

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
  const [firebaseUid, setFirebaseUid] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(true);
  
  // Is this the owner?
  const OWNER_UID = process.env.NEXT_PUBLIC_OWNER_UID || "no_owner_uid_configured";
  const isOwner = profile?.uid === OWNER_UID || profile?.role === "OWNER";

  // 1. Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setFirebaseUid(user.uid);
        setIsAnonymous(user.isAnonymous);
        
        // Fetch from firestore if exists
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;
          const isActuallyOwner = (user.uid === OWNER_UID || user.email === "pratul21oklife@gmail.com");
          setProfile({
            ...data,
            name: isActuallyOwner ? "Pratul" : data.name,
            title: isActuallyOwner ? "👑 THE OG" : data.title,
            stats: { ...DEFAULT_STATS, ...(data.stats || {}) },
            achievements: data.achievements || [],
            completedEvents: data.completedEvents || [],
            role: isActuallyOwner ? "OWNER" : (data.role || "USER"),
          });
        } else if (user.uid === OWNER_UID || user.email === "pratul21oklife@gmail.com") {
          // If the owner just logged in for the very first time and has no profile in Firestore, auto-create it!
          const ownerProfile: UserProfile = {
            name: "Pratul",
            odId: "SB_TI32W1VX",
            uid: user.uid,
            side: "🍕",
            role: "OWNER",
            xp: 0,
            level: 100,
            title: "👑 THE OG",
            stats: { ...DEFAULT_STATS },
            achievements: [],
            completedEvents: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          setProfile(ownerProfile);
        }
      } else {
        setFirebaseUid(null);
        // If not logged in, auto sign-in anonymously
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error("Anonymous auth failed", error);
        }
      }
    });

    return () => unsubscribe();
  }, [OWNER_UID]);

  // Sync to Firestore & LocalStorage
  useEffect(() => {
    if (profile && firebaseUid) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      // Sync using the UID as the document ID
      const docRef = doc(db, "users", firebaseUid);
      setDoc(docRef, profile, { merge: true }).catch(console.error);
    }
  }, [profile, firebaseUid]);

  const signUpWithEmail = async (email: string, pass: string, name: string, side: "🍕" | "🍗") => {
    if (auth.currentUser && auth.currentUser.isAnonymous) {
      try {
        const credential = EmailAuthProvider.credential(email, pass);
        await linkWithCredential(auth.currentUser, credential);
        createIdentity(name, side); // Initialize the profile data
      } catch (err: any) {
        throw new Error(err.message || "Failed to upgrade anonymous account");
      }
    } else {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      // createIdentity logic will run but we need to wait for auth state change or do it here
      // But it's easier to just call createIdentity directly.
      // Wait, createIdentity uses firebaseUid which might not be updated yet.
      // Let's manually create it.
      const odId = "SB_" + Math.random().toString(36).substr(2, 8).toUpperCase();
      const newProfile: UserProfile = {
        name,
        odId,
        uid: cred.user.uid,
        side,
        role: "USER",
        xp: 10,
        level: 1,
        title: getLevelTitle(1),
        stats: { ...DEFAULT_STATS },
        achievements: ["🍕 FIRST BITE"],
        completedEvents: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setProfile(newProfile);
    }
  };

  const logInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
    // auth listener will handle the rest
  };

  const logOut = async () => {
    await signOut(auth);
    setProfile(null);
    setFirebaseUid(null);
    // auth listener will automatically sign in anonymously
  };

  const createIdentity = useCallback((name: string, side: "🍕" | "🍗") => {
    if (!firebaseUid) return;

    // We do not check for Pratul string anymore for owner. Auth decides.
    const isOwnerNow = firebaseUid === OWNER_UID;
    const odId = isOwnerNow ? "SB_TI32W1VX" : "SB_" + Math.random().toString(36).substr(2, 8).toUpperCase();
    
    const newProfile: UserProfile = {
      name,
      odId,
      uid: firebaseUid,
      side,
      role: isOwnerNow ? "OWNER" : "USER",
      xp: 0,
      level: 1,
      title: isOwnerNow ? "👑 THE OG" : "🥲 NEW RECRUIT",
      stats: { ...DEFAULT_STATS },
      achievements: [],
      completedEvents: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    setProfile(newProfile);
    
    setTimeout(() => {
      if (!isOwnerNow) {
        setProfile(prev => {
          if (!prev) return prev;
          const updated = { ...prev, xp: 10, achievements: ["🍕 FIRST BITE"] };
          updated.level = calculateLevel(updated.xp);
          updated.title = getLevelTitle(updated.level);
          return updated;
        });
      }
    }, 100);
  }, [firebaseUid, OWNER_UID]);

  const awardXP = useCallback((actionType: string, eventId?: string) => {
    setProfile((prev) => {
      if (!prev || prev.role === "OWNER") return prev;

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
        isAnonymous,
        setLevelOverride,
        signUpWithEmail,
        logInWithEmail,
        logOut,
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
