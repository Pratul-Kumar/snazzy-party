import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit,
  doc,
  getDoc,
  setDoc,
  increment,
  updateDoc
} from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAkukCUCxT7r9eKlRzWu39M3Ypj6uS_yIE",
  authDomain: "snazzybois.firebaseapp.com",
  projectId: "snazzybois",
  storageBucket: "snazzybois.firebasestorage.app",
  messagingSenderId: "265898823571",
  appId: "1:265898823571:web:eb3012515a7120a0dbe266",
  measurementId: "G-W6R4PB9MES",
  databaseURL: "https://snazzybois-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

// --- Live Events Feed ---
// Combines petitions, votes, and excuses into one feed.
export const subscribeToEvents = (callback: (data: any[]) => void) => {
  const q = query(
    collection(db, "events"), 
    orderBy("timestamp", "desc"), 
    limit(50)
  );

  return onSnapshot(q, (snapshot) => {
    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(events);
  });
};

export const trackEvent = async (type: "PETITION" | "VOTE" | "EXCUSE", message: string, detail?: string) => {
  await addDoc(collection(db, "events"), {
    type,
    message,
    detail: detail || "",
    timestamp: Date.now(),
  });
};

// --- Petitions (V1 - Legacy) ---
export const addPetition = async (name: string, comment: string, food: string) => {
  const docRef = await addDoc(collection(db, "petitions"), {
    name,
    comment,
    food,
    timestamp: Date.now(),
  });
  
  // Also push to live feed
  await trackEvent("PETITION", `${name} signed the petition`, `Wants: ${food}`);
  
  return docRef.id.slice(0, 6).toUpperCase();
};

// --- Petitions V2 (Community Wall) ---
export interface PetitionV2 {
  id?: string;
  username: string;
  userId: string;
  text: string;
  foodChoice?: string;
  createdAt: number;
  reactions: {
    love: number;
    funny: number;
    hungry: number;
    facts: number;
  };
  pressureAwarded: number;
}

export const submitPetitionV2 = async (petition: Omit<PetitionV2, "id" | "createdAt" | "reactions" | "pressureAwarded">) => {
  const docRef = await addDoc(collection(db, "petitions_v2"), {
    ...petition,
    createdAt: Date.now(),
    reactions: {
      love: 0,
      funny: 0,
      hungry: 0,
      facts: 0,
    },
    pressureAwarded: 5,
  });

  await trackEvent("PETITION", `@${petition.username} signed the petition`, petition.foodChoice ? `Required: ${petition.foodChoice}` : "");
  return docRef.id;
};

export const subscribeToPetitionsV2 = (callback: (data: PetitionV2[]) => void) => {
  const q = query(
    collection(db, "petitions_v2"),
    orderBy("createdAt", "desc"),
    limit(50)
  );

  return onSnapshot(q, (snapshot) => {
    const petitions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PetitionV2[];
    callback(petitions);
  });
};

export const reactToPetition = async (petitionId: string, reactionType: "love" | "funny" | "hungry" | "facts") => {
  const docRef = doc(db, "petitions_v2", petitionId);
  await updateDoc(docRef, {
    [`reactions.${reactionType}`]: increment(1)
  });
};

export const getPetition = async (petitionId: string): Promise<PetitionV2 | null> => {
  const docRef = doc(db, "petitions_v2", petitionId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as PetitionV2;
  }
  return null;
};


// --- Polls ---
const POLL_DOC_ID = "food_results";

export const subscribeToFoodPoll = (callback: (data: any) => void) => {
  const docRef = doc(db, "polls", POLL_DOC_ID);
  
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback({
        "Pizza 🍕": 0,
        "Biryani 🍗": 0,
        "Burger 🍔": 0,
        "Cake 🎂": 0,
        "Cold Drink 🥤": 0,
      });
    }
  });
};

export const voteFoodPoll = async (option: string) => {
  const docRef = doc(db, "polls", POLL_DOC_ID);
  
  try {
    await updateDoc(docRef, {
      [option]: increment(1)
    });
  } catch (error: any) {
    if (error.code === 'not-found') {
      await setDoc(docRef, {
        "Pizza 🍕": option === "Pizza 🍕" ? 1 : 0,
        "Biryani 🍗": option === "Biryani 🍗" ? 1 : 0,
        "Burger 🍔": option === "Burger 🍔" ? 1 : 0,
        "Cake 🎂": option === "Cake 🎂" ? 1 : 0,
        "Cold Drink 🥤": option === "Cold Drink 🥤" ? 1 : 0,
      });
    }
  }
  
  // Track in live feed
  await trackEvent("VOTE", "Someone just voted", `Food: ${option}`);
};

// --- Top Excuses (Leaderboard) ---
const EXCUSE_DOC_ID = "leaderboard";

export const subscribeToExcuses = (callback: (data: any) => void) => {
  const docRef = doc(db, "excuses", EXCUSE_DOC_ID);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback({
        "Next Sunday Bro": 482,
        "Wallet Loading": 381,
        "Busy Editing": 290,
      });
    }
  });
};

export const trackGeneratedExcuse = async (excuse: string) => {
  await trackEvent("EXCUSE", "Someone generated an excuse", `"${excuse}"`);
  
  const docRef = doc(db, "excuses", EXCUSE_DOC_ID);
  try {
    await updateDoc(docRef, {
      [excuse]: increment(1)
    });
  } catch (error: any) {
    if (error.code === 'not-found') {
      // Initialize if missing
      await setDoc(docRef, {
        "Next Sunday Bro": 482,
        "Wallet Loading": 381,
        "Busy Editing": 290,
        [excuse]: 1,
      });
    }
  }
};

// --- Party Arena Leaderboard ---
const ARENA_DOC_ID = "party_arena";

export const subscribeToArenaLeaderboard = (callback: (data: any) => void) => {
  const docRef = doc(db, "leaderboards", ARENA_DOC_ID);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback({});
    }
  });
};

export const updateArenaWin = async (playerName: string) => {
  const docRef = doc(db, "leaderboards", ARENA_DOC_ID);
  try {
    await updateDoc(docRef, {
      [playerName]: increment(1)
    });
  } catch (error: any) {
    if (error.code === 'not-found') {
      await setDoc(docRef, {
        [playerName]: 1,
      });
    }
  }
};

// --- XP System (New) ---
export const syncUserProfile = async (profile: any) => {
  if (!profile || !profile.odId) return;
  const docRef = doc(db, "users", profile.odId);
  try {
    await setDoc(docRef, profile, { merge: true });
  } catch (error) {
    console.error("Error syncing profile:", error);
  }
};

export const subscribeToXPLeaderboard = (callback: (data: any[]) => void) => {
  const q = query(
    collection(db, "users"),
    orderBy("level", "desc"),
    orderBy("xp", "desc"),
    orderBy("stats.wins", "desc"),
    limit(20)
  );

  return onSnapshot(q, (snapshot) => {
    const users = snapshot.docs.map(doc => doc.data());
    callback(users);
  });
};

