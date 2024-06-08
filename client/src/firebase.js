// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "india-estate.firebaseapp.com",
  projectId: "india-estate",
  storageBucket: "india-estate.appspot.com",
  messagingSenderId: "982890497719",
  appId: "1:982890497719:web:c19dc204d25f5e0a2faf32",
  measurementId: "G-6P828XLPKK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);