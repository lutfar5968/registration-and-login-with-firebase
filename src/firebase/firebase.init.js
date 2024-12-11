// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAny3bahLtb_wlEEO5nPtB646sWxpG6-xQ",
  authDomain: "email-password-register19.firebaseapp.com",
  projectId: "email-password-register19",
  storageBucket: "email-password-register19.firebasestorage.app",
  messagingSenderId: "812832379577",
  appId: "1:812832379577:web:bcee60feb2ed5935e34168"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};