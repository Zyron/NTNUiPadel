import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOEMtuFd60J-2_Q-6f4iwi81-btqC3pX8",
  authDomain: "ntnuipadel.firebaseapp.com",
  databaseURL: "https://ntnuipadel-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ntnuipadel",
  storageBucket: "ntnuipadel.appspot.com",
  messagingSenderId: "692474141694",
  appId: "1:692474141694:web:9e0f87e18cc37464293eaf",
  measurementId: "G-T3EHNYZTF6",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;