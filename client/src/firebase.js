// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-unirentfinder.firebaseapp.com",
  projectId: "mern-unirentfinder",
  storageBucket: "mern-unirentfinder.appspot.com",
  messagingSenderId: "866872723114",
  appId: "1:866872723114:web:96160022639d7799e0f2d3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);