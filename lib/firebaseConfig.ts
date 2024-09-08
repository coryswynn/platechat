import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC66nchXDRSomjtAmMhvICQQTCGud3DrQ8",
  authDomain: "platechat-aa7f7.firebaseapp.com",
  projectId: "platechat-aa7f7",
  storageBucket: "platechat-aa7f7.appspot.com",
  messagingSenderId: "214646040770",
  appId: "1:214646040770:web:d467d75c07712cfa45b35b",
  measurementId: "G-9W73NH0YX6"
};

// Check if Firebase has been initialized, and initialize only if not already done
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics only in the browser
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app); // Add Firebase Authentication

export { app, analytics };