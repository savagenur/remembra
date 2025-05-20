import { serverTimestamp } from "firebase/firestore";
import { PersonStatus } from "./personStatus";

export interface UserModel {
  uid: string;
  email: string;
  displayName?: string | null;
  photoURL?: string | null;
  createdAt: Date | ReturnType<typeof serverTimestamp>;
  updatedAt?: Date | ReturnType<typeof serverTimestamp> | null;
  onboarded?: boolean | null;
  personStatuses: PersonStatus[]; // User-defined statuses
  language?: string | null;
  phoneNumber?: string | null;
  timezone?: string | null;
}
