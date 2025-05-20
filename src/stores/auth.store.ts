import { defaultStatuses } from "@/config/constants";
import {
  firebaseAuth,
  firestore,
  googleAuthProvider,
} from "@/lib/firebase/clientApp";
import { UserModel } from "@/types/user";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { create } from "zustand";
import { persist } from "zustand/middleware";
type AuthStore = {
  user: UserModel | null;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
  setUser: (user: UserModel | null) => void;
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  signInWithGoogle: () => Promise<void>;

  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      isInitialized: false,
      signIn: async ({ email, password }) => {
        set({ loading: true, error: null });
        try {
          const userCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            email,
            password
          );
          const user = userCredential.user;
          const userRef = doc(firestore, "users", user.uid);
          const userSnap = await getDoc(userRef);
          let userData: UserModel;

          if (!userSnap.exists()) {
            userData = {
              uid: user.uid,
              email: user.email || "",
              displayName: user.displayName || null,
              photoURL: user.photoURL,
              createdAt: serverTimestamp(),
              personStatuses: defaultStatuses,
              phoneNumber: user.phoneNumber,
            };
            console.log("New user created!");
          } else {
            userData = userSnap.data() as UserModel;
            console.log("Loaded user from firestore!");
          }
          set({ user: userData });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },
      signInWithGoogle: async () => {
        set({ loading: true, error: null });
        try {
          const result = await signInWithPopup(
            firebaseAuth,
            googleAuthProvider
          );
          
          const user = result.user;
          const userRef = doc(firestore, "users", user.uid);
          const userSnap = await getDoc(userRef);
          let userData: UserModel;
          if (!userSnap.exists()) {
            // Create user if it doesn't exist
            userData = {
              uid: user.uid,
              email: user.email || "",
              displayName: user.displayName || null,
              photoURL: user.photoURL,
              createdAt: serverTimestamp(),
              personStatuses: defaultStatuses,
              phoneNumber: user.phoneNumber,
            };
            await setDoc(userRef, userData);
            console.log("New user created!");
          } else {
            // Load user from firestore
            userData = userSnap.data() as UserModel;
            console.log("Loaded user from firestore!");
          }
          set({ user: userData });
          console.log(`Logged in user: ${user}`);
        } catch (err: any) {
          console.error("Error logging in:", err);
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },
      signOut: async () => {
        set({ loading: true });
        try {
          await signOut(firebaseAuth);
          set({ user: null });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },
      setUser: (user) => {
        set({ user });
      },
    }),
    {
      name: "auth-store",
    }
  )
);
