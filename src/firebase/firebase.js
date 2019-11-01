import app from "firebase/app";
import "firebase/database";
import "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyCk4P8mf_gaiGtKHq5oqBv4Ndz7lTYekXI",
    authDomain: "expensify-5eab5.firebaseapp.com",
    databaseURL: "https://expensify-5eab5.firebaseio.com",
    projectId: "expensify-5eab5",
    storageBucket: "expensify-5eab5.appspot.com",
    messagingSenderId: "1047123225534",
    appId: "1:1047123225534:web:bf32d1335345902337a7ef"
};

app.initializeApp(firebaseConfig);
const db = app.database();
const googleAuthProvider = new app.auth.GoogleAuthProvider();


export { app, googleAuthProvider, db as default };







