import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "DOMAIN.firebaseapp.com",
  projectId: "PROJECT ID",
  storageBucket: "DOMAIN.appspot.com",
  messagingSenderId: "ID",
  appId: "APP ID",
  measurementId: "G-8HWELT1N1D",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const firestore = firebase.firestore();
const msgReference = firestore.collection("messages");

export {auth, provider, firestore, msgReference}
