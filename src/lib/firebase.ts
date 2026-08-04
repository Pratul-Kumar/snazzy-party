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

const firebaseConfig = {
  apiKey: "AIzaSyAkukCUCxT7r9eKlRzWu39M3Ypj6uS_yIE",
  authDomain: "snazzybois.firebaseapp.com",
  projectId: "snazzybois",
  storageBucket: "snazzybois.firebasestorage.app",
  messagingSenderId: "265898823571",
  appId: "1:265898823571:web:eb3012515a7120a0dbe266",
  measurementId: "G-W6R4PB9MES"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

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

// --- Petitions ---
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
