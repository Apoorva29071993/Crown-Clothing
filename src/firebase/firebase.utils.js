import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA_lzpLSm8rOc2Mp7Qq-cuY95XHl3F5gHs",
    authDomain: "crwn-db-f7e71.firebaseapp.com",
    projectId: "crwn-db-f7e71",
    storageBucket: "crwn-db-f7e71.appspot.com",
    messagingSenderId: "122283392197",
    appId: "1:122283392197:web:22a4ce1db7509e0c1904ac",
    measurementId: "G-EQJRBMZH7D"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

