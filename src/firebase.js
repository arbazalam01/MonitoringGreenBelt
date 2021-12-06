import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAK4uhj4HXeHQqEe43zFypPofc5DasG9Oo",
  authDomain: "rasberrypi-60435.firebaseapp.com",
  databaseURL: "https://rasberrypi-60435-default-rtdb.firebaseio.com",
  projectId: "rasberrypi-60435",
  storageBucket: "rasberrypi-60435.appspot.com",
  messagingSenderId: "660863521212",
  appId: "1:660863521212:web:28f02a4c0dfdbebcb9dbb9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const imgDataRef = ref(db, "images");

export { db, imgDataRef, auth };
