// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA8UQcvxHIVDd6caBK4TRlCWD18Kysd29s",

  authDomain: "doc-marvel.firebaseapp.com",

  projectId: "doc-marvel",

  storageBucket: "doc-marvel.appspot.com",

  messagingSenderId: "414749591970",

  appId: "1:414749591970:web:4a8ca8bcf7a4bd93b28afb",

  measurementId: "G-DP6Y4C948N",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
