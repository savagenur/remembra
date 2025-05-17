import { firebaseAuth, googleAuthProvider } from "@/lib/firebase/clientApp";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";
type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
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

export const useAuthStore = create<AuthState>()(
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
          set({ user: userCredential.user });
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
          set({ user: result.user });
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
