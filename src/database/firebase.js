// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnvwmt0ms1argvYNPTDIQH7vb0vycgJto",
  authDomain: "authentication-firebase-19bfa.firebaseapp.com",
  projectId: "authentication-firebase-19bfa",
  storageBucket: "authentication-firebase-19bfa.appspot.com",
  messagingSenderId: "472373835343",
  appId: "1:472373835343:web:7301720d395a8281ac1c3a",
  measurementId: "G-35QRJM2MX2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();
const storage = getStorage(app);

export { auth, db, storage };
