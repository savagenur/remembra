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
  updateDoc,
} from "firebase/firestore";
import { create } from "zustand";

export type PeopleStore = {
  people: PersonModel[];
  createPerson: (data: PersonModel) => Promise<void>;
  updatePerson: (data: PersonModel) => Promise<void>;
  deletePerson: (id: string) => Promise<void>;
  fetchPeople: () => Promise<void>;
  unsubscribe?: () => void;
  subscribeToPeople: () => void;
};

export const usePeopleStore = create<PeopleStore>((set, get) => ({
  people: [],
  subscribeToPeople: () => {
    get().unsubscribe?.();
    const peopleRef = collection(firestore, "people");
    const unsubscribe = onSnapshot(peopleRef, (snapshot) => {
      const people: PersonModel[] = [];
      snapshot.forEach((doc) => {
        const person = doc.data() as PersonModel;
        const dateOfBirth =
          person.dateOfBirth !== null
            ? (person.dateOfBirth as Timestamp).toDate()
            : null;
        people.push({ ...person, dateOfBirth });
      });
      set({ people });
    });
    set({ unsubscribe });
  },
  fetchPeople: async () => {
    const snapshot = await getDocs(collection(firestore, "people"));
    const people: PersonModel[] = [];
    snapshot.forEach((doc) => {
      people.push(doc.data() as PersonModel);
    });
    set({ people });
  },
  createPerson: async (data) => {
    const personRef = doc(firestore, "people", data.id!);

    await setDoc(personRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("Person created!");
  },
  updatePerson: async (data) => {
    const personRef = doc(firestore, "people", data.id!);
    const personData = {
      email: data.email,
      phoneNumber: data.phoneNumber,
      photoUrl: data.photoUrl,
      firstName: data.firstName,
      lastName: data.lastName,
      description: data.description,
      dateOfBirth: data.dateOfBirth,
      status: data.status,
    };
    await updateDoc(personRef, {
      ...personData,
      updatedAt: serverTimestamp(),
    });
    console.log("Person updated!");
  },
  deletePerson: async (id) => {
    const personRef = doc(firestore, "people", id);
    await deleteDoc(personRef);
    await deleteFirebaseStoragePhoto(firebaseStoragePaths.personProfile(id));
    console.log("Person Deleted!");
  },
}));
