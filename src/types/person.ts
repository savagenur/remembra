import { serverTimestamp, Timestamp } from "firebase/firestore";
import { PersonStatus } from "./personStatus";
import { CustomField } from "./customField";

export interface PersonModel {
  id?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  photoUrl?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  occupation?: string | null;
  description?: string | null;
  dateOfBirth?: Date | Timestamp | null;
  status?: PersonStatus | null;
  customFields?: CustomField[] ;
  createdAt?: Date | Timestamp | ReturnType<typeof serverTimestamp> | null;
  updatedAt?: Date | Timestamp | ReturnType<typeof serverTimestamp> | null;
}
