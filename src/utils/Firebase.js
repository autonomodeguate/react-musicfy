

// import 'firebase/firestore';
// import 'firebase/auth';
// import { initializeApp } from "firebase/app";
// import { GoogleAuthProvider } from 'firebase/auth';

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAq14B1f3J062MjIZquNl9-LcHL6_RcxsQ",
  authDomain: "app-music-33073.firebaseapp.com",
  databaseURL: "https://app-music-33073-default-rtdb.firebaseio.com",
  projectId: "app-music-33073",
  storageBucket: "app-music-33073.appspot.com",
  messagingSenderId: "117723357480",
  appId: "1:117723357480:web:250f1ee0d280459f95301d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
 
export {
  app,
  db
}