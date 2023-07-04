// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBYNvgxRIMl-w4wJ65ARn3Kk5Gfao7Xsc",
  authDomain: "real-estate-dashboard-test.firebaseapp.com",
  projectId: "real-estate-dashboard-test",
  storageBucket: "real-estate-dashboard-test.appspot.com",
  messagingSenderId: "411616676396",
  appId: "1:411616676396:web:649700e280c09953431f89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
