import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "firebase_api_key",
  authDomain: "firebase_authdomain_name",
  projectId: "firebase_project_id",
  storageBucket: "firebase_storage_bucket",
  messagingSenderId: "firebase_sender_id",
  appId: "firebase_app_id",
  measurementId: "firebase_measurment_id"
};


export const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth first
export const auth = getAuth(app);

// Initialize other Firebase services after Auth
export const database = getFirestore(app);
