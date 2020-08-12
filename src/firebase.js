import firebase from 'firebase/app';
import 'firebase/firestore'; 

// referencing configuration values from .env.development
var firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_DATABASEURL,
  projectId: "rayacarlo-vue",
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();

// Mucho muy demasiado importante
//export const auth = firebaseApp.auth();