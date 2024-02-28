// firebase.js

// Import the Firebase SDK
// import 'firebase/database';

const firebase = require("firebase");

// Initialize Firebase with your project config
const firebaseConfig = {
    apiKey: "AIzaSyCle7Se8PM5To1aOlKIoofv1dlXy-FX1Sg",
    authDomain: "stories-b7599.firebaseapp.com",
    projectId: "stories-b7599",
    storageBucket: "stories-b7599.appspot.com",
    messagingSenderId: "656633850674",
    appId: "1:656633850674:web:770a3c2ff4bbb92f13452b"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Reference to your Firebase Realtime Database
const database = firebase.database();

// Function to add story data to the database
function addStory(storyData) {
    const storiesRef = database.ref('stories');
    storiesRef.push(storyData);
}


module.exports = {addStory, db}

