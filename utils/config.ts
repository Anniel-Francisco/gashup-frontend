import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyAmJU1PIycZAoBFXBoRiaeoBMQR6XMic5I",
    authDomain: "gashup-72fc2.firebaseapp.com",
    projectId: "gashup-72fc2",
    storageBucket: "gashup-72fc2.appspot.com",
    messagingSenderId: "307691557828",
    appId: "1:307691557828:web:b5737c3d6de79596cfca91",
    measurementId: "G-33ZHY3MPZH",
    databaseURL: "https://gashup-72fc2-default-rtdb.firebaseio.com"
  };

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(firebaseApp);

export { firebaseApp, storage, firestore, database };






