"use client";
import { useEffect } from "react";
import { useAuthStore } from "./auth.store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, firestore } from "@/lib/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { UserModel } from "@/types/user";

export const AuthListener = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const userDocRef = doc(firestore, "users", firebaseUser.uid);
            const userSnap = await getDoc(userDocRef);

            if (userSnap.exists()) {
              useAuthStore.setState({
                user: userSnap.data() as UserModel,
                isInitialized: true,
              });
            } else {
              console.warn("User document not found in Firestore.");
              useAuthStore.setState({ user: null, isInitialized: true });
            }
          } catch (error) {
            console.error("Failed to fetch user document:", error);
            useAuthStore.setState({ user: null, isInitialized: true });
          }
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return null;
};
