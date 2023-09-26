// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPVpscwZqlX0f8epZXnymFdpObY0ntWqE",
  authDomain: "cuisine-a4659.firebaseapp.com",
  projectId: "cuisine-a4659",
  storageBucket: "cuisine-a4659.appspot.com",
  messagingSenderId: "969360846622",
  appId: "1:969360846622:web:6ba2f7af85fc674db2630f",
  measurementId: "G-WWKJW7BRY1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const firebaseAuth = getAuth(firebaseApp);
export default firebaseApp;

/**
 *
 * Project name - cuisine
 * Project ID - cuisine-a4659
 * Project number - 969360846622
 * Default GCP resource location - Not yet selected
 * Web API Key - AIzaSyAPVpscwZqlX0f8epZXnymFdpObY0ntWqE
 *
 */
