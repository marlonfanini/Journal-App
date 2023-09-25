// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6RagfaANK6ir5KnDT07U8ndfqxI8IM7g",
  authDomain: "react-curso-3079b.firebaseapp.com",
  projectId: "react-curso-3079b",
  storageBucket: "react-curso-3079b.appspot.com",
  messagingSenderId: "135704450168",
  appId: "1:135704450168:web:7a5fc4210f6887abbc498d"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)
