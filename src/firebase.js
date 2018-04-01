import * as firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAtz5Ck1hfRNitdh3lgN03xXtNPo9JD25Q",
  authDomain: "react-chat-fd34a.firebaseapp.com",
  databaseURL: "https://react-chat-fd34a.firebaseio.com",
  projectId: "react-chat-fd34a",
  storageBucket: "react-chat-fd34a.appspot.com",
  messagingSenderId: "1033411127648",
};
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
export const database = firebaseApp.database();
