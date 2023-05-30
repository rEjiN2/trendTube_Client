
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDnfSmju029PTR88DrWdlNGv3qQNuELzKo",
  authDomain: "videosharingapp-d1e2e.firebaseapp.com",
  projectId: "videosharingapp-d1e2e",
  storageBucket: "videosharingapp-d1e2e.appspot.com",
  messagingSenderId: "120392448140",
  appId: "1:120392448140:web:e407e0f11583d8bd36e3a9"
};


const app = initializeApp(firebaseConfig);

export const  auth = getAuth()
export const provider = new GoogleAuthProvider();
export default app