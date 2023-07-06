import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwLYls4oMkO-RRHduVenW0_oVklDu15es",
  authDomain: "mudium-3ccd2.firebaseapp.com",
  projectId: "mudium-3ccd2",
  storageBucket: "mudium-3ccd2.appspot.com",
  messagingSenderId: "2188291302",
  appId: "1:2188291302:web:73913ba09f0591f9c19f27",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
};
export default app;
