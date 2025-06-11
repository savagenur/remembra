import { profilePlaceholder } from "@/config/constants";
import { uploadFirebaseStoragePhoto } from "@/lib/firebase/storage";
import { Edit } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
type EditableAvatarProps = {
  setPhotoFile: Dispatch<SetStateAction<File | null>>;
  photoUrl?: string | null;
};
export default function EditableAvatar({
  setPhotoFile,
  photoUrl,
}: EditableAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newPhotoUrl, setNewPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (newPhotoUrl) {
        URL.revokeObjectURL(newPhotoUrl);
      }
    };
  }, [newPhotoUrl]);
  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewPhotoUrl(url);
      setPhotoFile(file);
    }
  };

  return (
    <div className="relative w-32 h-32">
      {/* Avatar Circle */}
      <div className="rounded-xl overflow-hidden border border-gray-300 w-full h-full">
        <img
          src={newPhotoUrl ?? photoUrl ?? profilePlaceholder}
          alt="Avatar"
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Edit Button */}
      <button
        onClick={handleEditClick}
        className="absolute bottom-0 right-0 bg-white p-1 rounded-sm shadow-md hover:bg-gray-100 border-2 border-gray-600"
      >
        <Edit className="w-4 h-4" />
      </button>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
