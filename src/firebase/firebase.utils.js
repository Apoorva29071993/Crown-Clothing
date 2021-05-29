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


  //This method is , After getting auth object by logging in , it checks if there is values using snapshot object
  //if 26 line , i.e snapshot doesnot exists a new document is saved with the new crdentials in the database
  export const createUserProfileDocument = async (userAuth , additionalData) => {
       
    if (!userAuth) {
          return;
        }
       
        const userRef = firestore.doc(`users/${userAuth.uid}`)
        const snapShot = await userRef.get();
        if (!snapShot.exists) {
            const { displayName , email } = userAuth;
            const createdAt = new Date();

            console.log(displayName , email , createdAt);

            try {
              await userRef.set({
                displayName ,
                email ,
                createdAt ,
                ...additionalData
              })
            } catch (error) {
              console.log("Error creating user");
            }
        }

        return userRef;

  }

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

