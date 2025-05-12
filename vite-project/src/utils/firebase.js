import { initializeApp } from 'firebase/app';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDUs0mvviJ5iaekeYT2d3675R1572VfoY0",
    authDomain: "smart-placement-9a8ad.firebaseapp.com",
    projectId: "smart-placement-9a8ad",
    storageBucket: "smart-placement-9a8ad.firebasestorage.app",
    messagingSenderId: "836849936665",
    appId: "1:836849936665:web:61bef87abdabfc1ecc7d88",
    measurementId: "G-4Y8T6YSLK2"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};