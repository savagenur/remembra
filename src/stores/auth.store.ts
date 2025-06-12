import { defaultStatuses } from "@/config/constants";
import {
  firebaseAuth,
  firestore,
  googleAuthProvider,
} from "@/lib/firebase/clientApp";
import { UserModel } from "@/types/user";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
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
import { usePeopleStore } from "./people.store";
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
  signUp: ({
    name,
    email,
    password,
  }: {
    name: string;
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
      signUp: async ({ name, email, password }) => {
        set({ loading: true, error: null });
        try {
          // Create user with Firebase
          const userCredential = await createUserWithEmailAndPassword(
            firebaseAuth,
            email,
            password
          );
          const user = userCredential.user;

          // ✅ Set display name in Firebase Auth
          if (name) {
            await updateProfile(user, { displayName: name });
          }

          // Check if user data exists in Firestore
          const userRef = doc(firestore, "users", user.uid);
          const userSnap = await getDoc(userRef);

          let userData: UserModel;

          if (!userSnap.exists()) {
            // Create new user data
            userData = {
              uid: user.uid,
              email: user.email || "",
              displayName: name || null,
              photoURL: user.photoURL || null,
              createdAt: serverTimestamp(),
              personStatuses: defaultStatuses,
              phoneNumber: user.phoneNumber || null,
            };

            // Save to Firestore
            await setDoc(userRef, userData);
            console.log("✅ New user created in Firestore");
          } else {
            userData = userSnap.data() as UserModel;
            console.log("📥 Existing user loaded from Firestore");
          }

          set({ user: userData });
        } catch (err: any) {
          console.error("❌ Sign up error:", err);
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },
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
          throw err;
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
          usePeopleStore.setState({
            people: [],
            peopleBeforeToday: [],
            peopleAfterToday: [],
          });
          localStorage.removeItem("auth-store");
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
      partialize: (state) => ({
        user: state.user,
        error: state.error,
        isInitialized: state.isInitialized,
      }),
    }
  )
);
