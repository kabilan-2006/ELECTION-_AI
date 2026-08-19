
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA3pp3c5HamUwuj9nX9fQQnkzFbctp3qJQ",
    authDomain: "election-info-e5eee.firebaseapp.com",
    projectId: "election-info-e5eee",
    storageBucket: "election-info-e5eee.firebasestorage.app",
    messagingSenderId: "119778111636",
    appId: "1:119778111636:web:0ec9f1a79ba242c1b94481",
    measurementId: "G-XQJHMX9LND"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  console.log("firebase connected successfuliy");
