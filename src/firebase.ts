// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmw1H-PnUzZY5jNsLa29TspRHcciJ0ypo",
  authDomain: "super-to-do-list-68aab.firebaseapp.com",
  projectId: "super-to-do-list-68aab",
  storageBucket: "super-to-do-list-68aab.appspot.com",
  messagingSenderId: "419453083740",
  appId: "1:419453083740:web:2480c047cae2e7d750c699",
  measurementId: "G-2Y3840P0JQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
