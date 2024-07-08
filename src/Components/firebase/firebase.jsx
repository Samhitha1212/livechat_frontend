// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlhxQ97-vqMMhCBkN2X1OxRO6JecbkXm4",
  authDomain: "chatapp-e1d00.firebaseapp.com",
  projectId: "chatapp-e1d00",
  storageBucket: "chatapp-e1d00.appspot.com",
  messagingSenderId: "203581452342",
  appId: "1:203581452342:web:d3797108883f64d10c6897"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}