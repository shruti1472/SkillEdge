// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginskilledge.firebaseapp.com",
  projectId: "loginskilledge",
  storageBucket: "loginskilledge.firebasestorage.app",
  messagingSenderId: "76290671494",
  appId: "1:76290671494:web:0a15eaa5cbd88bfd5be207"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app)
const provider = new GoogleAuthProvider();


export { auth, provider};