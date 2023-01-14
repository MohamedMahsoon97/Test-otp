import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCl_SVzGxpo2SSu8UazoJRyF9bAKYQWzmo",
    authDomain: "send-otp-auth.firebaseapp.com",
    projectId: "send-otp-auth",
    storageBucket: "send-otp-auth.appspot.com",
    messagingSenderId: "685077365006",
    appId: "1:685077365006:web:b8fe94149e643e4344975f"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);