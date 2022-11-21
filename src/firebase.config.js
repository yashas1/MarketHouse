// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4vDPjWpSpCZM8G7MfMOxVprm1nDPxK00",
  authDomain: "housesearchapp.firebaseapp.com",
  projectId: "housesearchapp",
  storageBucket: "housesearchapp.appspot.com",
  messagingSenderId: "749969881204",
  appId: "1:749969881204:web:e891e7cd0e805db03cf921",
  measurementId: "G-ZJ4FPFTCWF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
