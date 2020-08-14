import firebase from 'firebase/app';
import 'firebase/firestore'; 

// referencing configuration values from .env.development
var firebaseConfig = {
  apiKey: "AIzaSyDny14HmAGVIW03oTT7jo31uiTQfUwNN5c",
  authDomain: "rayacarlo-vue.firebaseapp.com",
  databaseURL: "https://rayacarlo-vue.firebaseio.com",
  projectId: "rayacarlo-vue",
  storageBucket: "rayacarlo-vue.appspot.com",
  messagingSenderId: "742964636968",
  appId: "1:742964636968:web:dbe929af64dd7183d6b41d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();

// Mucho muy demasiado importante
//export const auth = firebaseApp.auth();