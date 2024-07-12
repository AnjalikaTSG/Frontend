// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB-Kd0Vay8jnmrblz4Xogf20_69NYkQivY",
    authDomain: "parttimesl.firebaseapp.com",
    projectId: "parttimesl",
    storageBucket: "parttimesl.appspot.com",
    messagingSenderId: "716476605935",
    appId: "1:716476605935:web:550f7f83ac20703c08021a",
    measurementId: "G-6VRRYK5HRW"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);