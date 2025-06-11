import { firestore } from "@/lib/firebase/clientApp";
import { deleteFirebaseStoragePhoto } from "@/lib/firebase/storage";
import { firebaseStoragePaths } from "@/lib/utils";
import { PersonModel } from "@/types/person";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { create } from "zustand";
import { useAuthStore } from "./auth.store";


export type PeopleStore = {
  people: PersonModel[];
  peopleBeforeToday: PersonModel[];
  peopleAfterToday: PersonModel[];
  createPerson: (data: PersonModel) => Promise<void>;
  updatePerson: (data: PersonModel) => Promise<void>;
  deletePerson: (id: string) => Promise<void>;
  fetchPeople: () => Promise<void>;
  unsubscribe?: () => void;
  subscribeToPeople: () => void;
};

export const usePeopleStore = create<PeopleStore>((set, get) => ({
  people: [],
  peopleBeforeToday: [],
  peopleAfterToday: [],

  subscribeToPeople: () => {
    get().unsubscribe?.();

    const user = useAuthStore.getState().user;
    if (!user) throw new Error("User not authenticated");

    const peopleRef = collection(firestore, "users", user.uid, "people");

    const unsubscribe = onSnapshot(peopleRef, (snapshot) => {
      const allPeople: PersonModel[] = [];

      const today = new Date();
      const todayMonth = today.getMonth();
      const todayDate = today.getDate();

      snapshot.forEach((doc) => {
        const person = doc.data() as PersonModel;
        const dateOfBirth =
          person.dateOfBirth !== null
            ? (person.dateOfBirth as Timestamp).toDate()
            : null;

        allPeople.push({ ...person, dateOfBirth });
      });

      const beforeToday = allPeople.filter((p) => {
        if (!p.dateOfBirth) return false;
        const dob = p.dateOfBirth as Date;
        const month = dob.getMonth();
        const day = dob.getDate();
        return month < todayMonth || (month === todayMonth && day < todayDate);
      });

      const afterToday = allPeople.filter((p) => {
        if (!p.dateOfBirth) return false;
        const dob = p.dateOfBirth as Date;
        const month = dob.getMonth();
        const day = dob.getDate();
        return month > todayMonth || (month === todayMonth && day >= todayDate);
      });

      set({
        people: allPeople,
        peopleBeforeToday: beforeToday,
        peopleAfterToday: afterToday,
      });
    });

    set({ unsubscribe });
  },

  fetchPeople: async () => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error("User not authenticated");

    const snapshot = await getDocs(
      collection(firestore, "users", user.uid, "people")
    );
    const people: PersonModel[] = [];
    snapshot.forEach((doc) => {
      people.push(doc.data() as PersonModel);
    });
    set({ people });
  },

  createPerson: async (data) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error("User not authenticated");

    const personRef = doc(firestore, "users", user.uid, "people", data.id!);

    await setDoc(personRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("✅ Person created");
  },

  updatePerson: async (data) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error("User not authenticated");

    const personRef = doc(firestore, "users", user.uid, "people", data.id!);

    await setDoc(
      personRef,
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log("✅ Person updated");
  },

  deletePerson: async (id) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error("User not authenticated");

    const personRef = doc(firestore, "users", user.uid, "people", id);
    await deleteDoc(personRef);
    await deleteFirebaseStoragePhoto(firebaseStoragePaths.personProfile(id));
    console.log("🗑️ Person deleted");
  },
}));
