import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase} from "firebase/database";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyAmlSfM56nhS6SiZLwNKUWnkSq6-nlBswU",
    authDomain: "info-dashboar.firebaseapp.com",
    projectId: "info-dashboar",
    storageBucket: "info-dashboar.appspot.com",
    messagingSenderId: "481469338924",
    appId: "1:481469338924:web:64ec977415da39189a4889"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);


export { app, auth, db, storage };