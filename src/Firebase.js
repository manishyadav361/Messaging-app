import firebase from "firebase";

const appConfig = {
 apiKey:"AIzaSyDdV9XhHOvwTJ4kOiGg1TDTsq0cK6mW7Wg",
 authDomain:"messaging-app-92828.firebaseapp.com",
 projectId:"messaging-app-92828",
 storageBucket:"messaging-app-92828.appspot.com",
 messagingSenderId:"613407718740",
 appId:"1:613407718740:web:687de227d6e034f635dcc1",
 measurementId:"G-6LK97NNFWN"
};

const firebaseApp = firebase.initializeApp(appConfig);

const auth = firebase.auth();

const db = firebaseApp.firestore();

export {db,auth};