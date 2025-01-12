// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgsbKXaHhwRIsyzrhgr5Y9zbAUONMEjVQ",
  authDomain: "goldie-database.firebaseapp.com",
  projectId: "goldie-database",
  storageBucket: "goldie-database.firebasestorage.app",
  messagingSenderId: "667829362482",
  appId: "1:667829362482:web:ee32642b15a2c6bff8012b",
  measurementId: "G-10RG6V04X9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };