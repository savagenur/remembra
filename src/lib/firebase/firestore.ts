// src/lib/firebase/firestore.js
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app, { firestore } from './clientApp';


export const getUserData = async (uid:string) => {
  const userRef = doc(firestore, 'users', uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
};