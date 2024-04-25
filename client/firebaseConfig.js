import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArpz53ONvuQ9Kn9oun0u8_H5SC_ztQ1EI",
  authDomain: "mealmate-bd7ec.firebaseapp.com",
  projectId: "mealmate-bd7ec",
  storageBucket: "mealmate-bd7ec.appspot.com",
  messagingSenderId: "879758885826",
  appId: "1:879758885826:web:df7604967772e763630c5b",
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = firebase.auth();

// Initialize Firebase Firestore
const db = firebase.firestore();

// Initialize Firebase Storage
const storage = firebase.storage();

export { auth, db, storage };
