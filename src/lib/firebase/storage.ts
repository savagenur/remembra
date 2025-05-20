import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "./clientApp";

export const uploadFirebaseStoragePhoto = async (file: File, path: string) => {
  const imageRef = ref(
    firebaseStorage,
    path
  );
  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
};


export const deleteFirebaseStoragePhoto = async ( path: string) => {
  const imageRef = ref(
    firebaseStorage,
    path
  );
  await deleteObject(imageRef);
};

