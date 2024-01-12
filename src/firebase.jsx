import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAXic_QZyTGD8xH6O3Ge9uORiMbKsWevaE",
  authDomain: "chat-8e0e1.firebaseapp.com",
  projectId: "chat-8e0e1",
  storageBucket: "chat-8e0e1.appspot.com",
  messagingSenderId: "1090085515598",
  appId: "1:1090085515598:web:2aac03a1df60469466ae1f",
  measurementId: "G-8HWELT1N1D",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const firestore = firebase.firestore();
const msgReference = firestore.collection("messages");

export {auth, provider, firestore, msgReference}