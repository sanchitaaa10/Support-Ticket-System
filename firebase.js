// ==================== FIREBASE INITIALIZATION ====================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  signInAnonymously, 
  signInWithCustomToken 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, // <--- EXPLICITLY IMPORTED
  setDoc, 
  getDoc, 
  addDoc, 
  updateDoc,
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  onSnapshot, 
  serverTimestamp,
  deleteDoc // <--- EXPLICITLY IMPORTED
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

// ==================== CONFIGURATION ====================
const firebaseConfig = {
  apiKey: "AIzaSyDGTJtFqWov20YSEAjtj3nH6a3TikoWawY",
  authDomain: "support-ticket-system-e467d.firebaseapp.com",
  projectId: "support-ticket-system-e467d",
  storageBucket: "support-ticket-system-e467d.firebasestorage.app",
  messagingSenderId: "985794520033",
  appId: "1:985794520033:web:8c60c5a4941e34861268a0",
  measurementId: "G-4WX6VXQ1WT"
};

// ==================== INITIALIZE APP ====================
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Global variables (optional)
const appId = firebaseConfig.appId;

// ==================== EXPORTS (ENSURING ALL FUNCTIONS ARE AVAILABLE) ====================
export {
  app,
  auth,
  db,
  analytics,
  appId,
  firebaseConfig,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInAnonymously,
  signInWithCustomToken,
  doc, // <--- NOW EXPORTED
  setDoc,
  getDoc,
  addDoc,
  updateDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  onSnapshot,
  serverTimestamp,
  deleteDoc // <--- NOW EXPORTED
};