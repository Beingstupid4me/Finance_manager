import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvAXx60iwDRBvLqK4knBEtDQVU9h4ErMQ",
  authDomain: "stocks-manager-4c06d.firebaseapp.com",
  projectId: "stocks-manager-4c06d",
  storageBucket: "stocks-manager-4c06d.appspot.com",
  messagingSenderId: "54530159942",
  appId: "1:54530159942:web:3170e80bfe29832651a147",
  measurementId: "G-BF6LZ3SRXM"
};

export const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth first
export const auth = getAuth(app);

// Initialize other Firebase services after Auth
export const database = getFirestore(app);
