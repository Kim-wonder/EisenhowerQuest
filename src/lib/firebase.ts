// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANxN3WOGLRm8EM_s4n9rf39KtmMON8Sok",
  authDomain: "project-260204.firebaseapp.com",
  databaseURL: "https://project-260204-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-260204",
  storageBucket: "project-260204.firebasestorage.app",
  messagingSenderId: "474588064179",
  appId: "1:474588064179:web:dc975ef20fc656124c83c6",
  measurementId: "G-3GRPEH41E4"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Analytics conditionally (Analytics works only in the browser)
const analytics = typeof window !== "undefined" ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null;

export { app, analytics };
