// // src/firebase.js

// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyDhNOVISD9DH7HjQkPiM5sMKKWka7F7XvY",
//   authDomain: "devalayas-project.firebaseapp.com",
//   projectId: "devalayas-project",
//   storageBucket: "devalayas-project.firebasestorage.app",
//   messagingSenderId: "713471432921",
//   appId: "1:713471432921:web:ab790ba93d6c55708986c8",
//   measurementId: "G-LPVTXV1718"
// };

// // Initialize Firebase app
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Auth
// const auth = getAuth(app);
// auth.useDeviceLanguage(); // Automatically set language to the user's device

// // Google Auth Provider
// const provider = new GoogleAuthProvider();

// export { auth, provider, RecaptchaVerifier };





// src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDtv0fNj2JuvVppvCmyOvZGaqSn8-QPPsk",
//   authDomain: "devotee-7c463.firebaseapp.com",
//   projectId: "devotee-7c463",
//   storageBucket: "devotee-7c463.appspot.com",
//   messagingSenderId: "196593785407",
//   appId: "1:196593785407:web:2ee5c24de0b8668a46368a",
//   measurementId: "G-1NHD2B13X0",
// };

// // Initialize Firebase App
// const app = initializeApp(firebaseConfig);

// // Export Firebase services for use in your app
// const auth = getAuth(app);
// const db = getFirestore(app);

// export { auth, db, RecaptchaVerifier };





// src/firebase.js
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

// // ✅ Your new Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyDhNOVISD9DH7HjQkPiM5sMKKWka7F7XvY",
//   authDomain: "devalayas-project.firebaseapp.com",
//   projectId: "devalayas-project",
//   storageBucket: "devalayas-project.firebasestorage.app",
//   messagingSenderId: "713471432921",
//   appId: "1:713471432921:web:ab790ba93d6c55708986c8",
//   measurementId: "G-LPVTXV1718"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // Firebase Auth
// const auth = firebase.auth();
// const googleProvider = new firebase.auth.GoogleAuthProvider();

// export { auth, googleProvider, firebase };







import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Replace these with your Firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyDhNOVISD9DH7HjQkPiM5sMKKWka7F7XvY",
  authDomain: "devalayas-project.firebaseapp.com",
  projectId: "devalayas-project",
  storageBucket: "devalayas-project.firebasestorage.app",
  messagingSenderId: "713471432921",
  appId: "1:713471432921:web:ab790ba93d6c55708986c8",
  measurementId: "G-LPVTXV1718"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Auth setup
const auth = getAuth(firebase);
const provider = new GoogleAuthProvider();

// ✅ Fix: export properly
export { auth, provider, signInWithPopup, firebase };
