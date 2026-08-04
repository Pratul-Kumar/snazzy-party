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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// --- Petitions ---
export const subscribeToPetitions = (callback: (data: any[]) => void) => {
  const q = query(
    collection(db, "petitions"), 
    orderBy("timestamp", "desc"), 
    limit(50)
  );

  return onSnapshot(q, (snapshot) => {
    const petitions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(petitions);
  });
};

export const addPetition = async (name: string, comment: string, food: string) => {
  const docRef = await addDoc(collection(db, "petitions"), {
    name,
    comment,
    food,
    timestamp: Date.now(),
  });
  return docRef.id.slice(0, 6).toUpperCase(); // Short friendly ID
};

// --- Polls ---
const POLL_DOC_ID = "results";

export const subscribeToPoll = (callback: (data: any) => void) => {
  const docRef = doc(db, "polls", POLL_DOC_ID);
  
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      // Return defaults if document doesn't exist yet
      callback({
        "50K": 0,
        "Birthday": 0,
        "100K": 0,
        "All": 0,
      });
    }
  });
};

export const votePoll = async (option: "50K" | "Birthday" | "100K" | "All") => {
  const docRef = doc(db, "polls", POLL_DOC_ID);
  
  try {
    // Try to update existing document
    await updateDoc(docRef, {
      [option]: increment(1)
    });
  } catch (error: any) {
    // If document doesn't exist (e.g. first vote ever), create it
    if (error.code === 'not-found') {
      await setDoc(docRef, {
        "50K": option === "50K" ? 1 : 0,
        "Birthday": option === "Birthday" ? 1 : 0,
        "100K": option === "100K" ? 1 : 0,
        "All": option === "All" ? 1 : 0,
      });
    } else {
      console.error("Error voting:", error);
    }
  }
};
