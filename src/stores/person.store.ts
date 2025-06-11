import { firebaseAuth, firestore } from "@/lib/firebase/clientApp";
import { PersonModel } from "@/types/person";
import { PersonStatus } from "@/types/personStatus";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { v4 } from "uuid";
import { create } from "zustand";

export type PersonStore = {
  person?: PersonModel | null;

  setPerson: (data: PersonModel) => void;
  setStatus: (status: PersonStatus) => void;
  resetPerson: () => void;
  // uploadImage:() => Promise<void>;
  fetchPerson: (id: string) => Promise<void>;
};

export const usePersonStore = create<PersonStore>((set) => ({
  person: null,
  setPerson: (data) => set({ person: data }),
  setStatus: (status) =>
    set((state) => ({
      person: {
        ...state.person,
        status: status,
      },
    })),
  resetPerson: function () {
    set({
      person: {
        id: v4(),
        firstName: "",
        lastName: "",
        dateOfBirth: null,
        status: null,
        description: null,
      },
    });
  },

  fetchPerson: async (id) => {
    const user = firebaseAuth.currentUser;
    if (!user) {
      return;
    }

    const docRef = doc(firestore, "users", user.uid, "people", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data: PersonModel = docSnap.data();
      const dateOfBirth =
        data.dateOfBirth instanceof Timestamp
          ? data.dateOfBirth.toDate()
          : null;
      set({
        person: {
          ...data,
          dateOfBirth,
        },
      });
    } else {
      set({ person: null }); // or handle person not found
    }
  },
}));
