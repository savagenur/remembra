import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { firebaseStorage } from "./clientApp";

export const uploadFirebaseStoragePhoto = async (file: File, path: string) => {
  const imageRef = ref(firebaseStorage, path);
  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
};

export const deleteFirebaseStoragePhoto = async (path: string) => {
  const imageRef = ref(firebaseStorage, path);
  try {
    await deleteObject(imageRef);
  } catch (error: any) {
    if (error.code === "storage/object-not-found") {
      console.warn("Photo not found, skipping delete.");
    } else {
      console.error("Failed to delete person:", error);
    }
  }
};
