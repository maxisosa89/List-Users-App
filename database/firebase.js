import firebase from "firebase";
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAcAz3vCBUt0zTTmmImVPGp0y48cA-dNkQ",
  authDomain: "listapp-e6ab5.firebaseapp.com",
  projectId: "listapp-e6ab5",
  storageBucket: "listapp-e6ab5.appspot.com",
  messagingSenderId: "253058103599",
  appId: "1:253058103599:web:4ad77dcced932769ab09da"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()



export default {
    firebase,
    db
}