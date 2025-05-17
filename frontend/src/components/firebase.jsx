// src/firebase.js

// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // For database
import { getAnalytics } from "firebase/analytics"; // Optional

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAoCnMcCeAIBg74HsSgj1D_XR31Ic07QWE",
  authDomain: "tailor-6e1aa.firebaseapp.com",
  projectId: "tailor-6e1aa",
  storageBucket: "tailor-6e1aa.firebasestorage.app",
  messagingSenderId: "838080357712",
  appId: "1:838080357712:web:6bac5a451339a9117e3855",
  measurementId: "G-2P2EKM568B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//gives warning thsts y canceled
//const analytics = getAnalytics(app);

// Firestore database instance
const db = getFirestore(app);

// Export database to use in your app
export { db };
