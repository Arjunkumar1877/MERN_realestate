// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e65f4.firebaseapp.com",
  projectId: "mern-estate-e65f4",
  storageBucket: "mern-estate-e65f4.appspot.com",
  messagingSenderId: "522620913334",
  appId: "1:522620913334:web:2191a2d78257ca4bc98817"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);