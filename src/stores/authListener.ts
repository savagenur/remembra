"use client";
import { useEffect } from "react";
import { useAuthStore } from "./authstore";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase/clientApp";

export const AuthListener = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      useAuthStore.setState({ user, isInitialized: true });
    });
    return () => unsubscribe();
  }, []);
  return null;
};
