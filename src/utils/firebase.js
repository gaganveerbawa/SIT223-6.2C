import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import { updateDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDysR9BSC3q0wSDm3BqLrCUcywEA2W14_g",
  authDomain: "dev-deakin-gaganveer.firebaseapp.com",
  projectId: "dev-deakin-gaganveer",
  storageBucket: "dev-deakin-gaganveer.appspot.com",
  messagingSenderId: "640190767045",
  appId: "1:640190767045:web:d0b5215558e88338ad75ac"
};

export const firebaseapp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const imageDb = getStorage(firebaseapp);

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore();

export const createuserdocfromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth.email) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef)

  const userSnapShots = await getDoc(userDocRef);
  console.log(userSnapShots)
  console.log(userSnapShots.exists())

  if (!userSnapShots.exists()) {
    const { displayName, email, uid } = userAuth
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        uid,
        displayName,
        email,
        createdAt,
        plan: 'Free',
        ...additionalInformation
      })
    }
    catch (error) {
      console.log('error in creating', error.message)
    }

  }
  return userDocRef;
}


export async function createAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password)
    return
  return await createUserWithEmailAndPassword(auth, email, password)
}


export async function signinAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password)
    return
  return await signInWithEmailAndPassword(auth, email, password)
}

export const updatePlanForUser = async (uid, plan) => {
  const userRef = doc(db, 'users', uid);
  return updateDoc(userRef, { plan });
};
