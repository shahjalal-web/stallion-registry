/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5vrAt909nMC5UXHADXga5IWRDtR_L-0I",
  authDomain: "stallion-registry.firebaseapp.com",
  projectId: "stallion-registry",
  storageBucket: "stallion-registry.firebasestorage.app",
  messagingSenderId: "65666444735",
  appId: "1:65666444735:web:855ae5714864e8178c850a",
  measurementId: "G-4VP4WDP0E4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Services export kora hochche jate onno file-e use kora jay
export const auth = getAuth(app);
export const db = getFirestore(app);