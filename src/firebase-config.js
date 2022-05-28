// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaCnNl4dbaxtNsDNy4eNKcJaQmvIUdB44",
  authDomain: "test2-28bb3.firebaseapp.com",
  databaseURL: "https://test2-28bb3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test2-28bb3",
  storageBucket: "test2-28bb3.appspot.com",
  messagingSenderId: "1082756251503",
  appId: "1:1082756251503:web:f6a917aaf94a1c940e729a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//utile pour authentification
export const auth = getAuth(app)

//utile pour la base de donnée
export const db = getFirestore(app)