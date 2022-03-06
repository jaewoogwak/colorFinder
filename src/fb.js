// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoHgLlDyMRSXX7FcrCHVQ2B1JzCiVS6Po",
  authDomain: "rankingdb-a29fe.firebaseapp.com",
  projectId: "rankingdb-a29fe",
  storageBucket: "rankingdb-a29fe.appspot.com",
  messagingSenderId: "730276427861",
  appId: "1:730276427861:web:fb69d92b6482926617fcdc",
};

export default firebaseConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export { app };
export { db };
