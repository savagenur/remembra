// src/lib/firebase/auth.js
import app, { firebaseAuth } from "./clientApp";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const loginUser = async (email: string, password: string) => {
  return signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const logoutUser = async () => {
  return signOut(firebaseAuth);
};
