import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4u5gTEetrtXPj__1Ut9x080mFNxULq64",
  authDomain: "cedar-ad46f.firebaseapp.com",
  projectId: "cedar-ad46f",
  storageBucket: "cedar-ad46f.appspot.com",
  messagingSenderId: "822448731142",
  appId: "1:822448731142:web:2396c5a94df9a9485f3f87"
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
