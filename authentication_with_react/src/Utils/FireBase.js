import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDG0RtyBdPTzwkIt58KrWuQo0fxqSRFTxk",
  authDomain: "authentication-using-rea-ac214.firebaseapp.com",
  projectId: "authentication-using-rea-ac214",
  storageBucket: "authentication-using-rea-ac214.appspot.com",
  messagingSenderId: "345432398556",
  appId: "1:345432398556:web:5ff9373885c7ca675bb219",
  measurementId: "G-C69N98H4J3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);
export const db=getFirestore(app)
// Export both app and auth
export { auth };  
export default app;
