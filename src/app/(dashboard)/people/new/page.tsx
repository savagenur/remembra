"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePersonStore } from "@/stores/person.store";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth.store";
import { PersonStatus } from "@/types/personStatus";
import { Textarea } from "@/components/ui/textarea";
import { usePeopleStore } from "@/stores/people.store";
import { convertToSafeDate, firebaseStoragePaths } from "@/lib/utils";
import { toast } from "sonner";
import { Delete, FileWarning, Info, StopCircle, Trash } from "lucide-react";
import { appRoutes } from "@/lib/routes";
import EditableAvatar from "@/components/person/EditableAvatar";
import { uploadFirebaseStoragePhoto } from "@/lib/firebase/storage";
import { PersonModel } from "@/types/person";
import { CustomField } from "@/types/customField";
import { errorToast, infoToast, successToast } from "@/components/toast";
import { colors } from "@/config/constants";

export default function CreatePersonPage() {
  const router = useRouter();
  const { person, setPerson, resetPerson, setStatus } = usePersonStore();
  const { createPerson } = usePeopleStore();
  const user = useAuthStore((state) => state.user);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  const hasEmptyField = () => {
    const isEmpty = customFields.some(
      (field) => field.key.trim() === "" || field.value.trim() === ""
    );
    if (isEmpty) {
      errorToast("Please fill in all existing custom fields.");
      return true;
    }
    return false;
  };
  const handleAddField = () => {
    if (hasEmptyField()) {
      return;
    }

    setCustomFields([...customFields, { key: "", value: "" }]);
  };
  const handleFieldChange = (index: number, key: string, value: string) => {
    const updated = [...customFields];
    updated[index] = { ...updated[index], [key]: value };
    setCustomFields(updated);
  };
  const handleFieldRemove = async (index: number) => {
    const updated = customFields.filter((_, i) => i !== index);
    setCustomFields(updated);
  };
  useEffect(() => {
    resetPerson(); // clear store after submit
  }, []);
  useEffect(() => {
    if (user) {
      setStatus(user.personStatuses[0]);
    }
  }, [user]);

  const uploadProfilePhoto = async (file: File) => {
    try {
      const url = await uploadFirebaseStoragePhoto(
        file,
        firebaseStoragePaths.personProfile(person?.id!)
      );
      return url;
    } catch (error) {
      infoToast("Something went wrong.");
      return null;
    }
  };

  const handleSubmit = async () => {
    if (person?.firstName && person.firstName.trim() !== "") {
      if (hasEmptyField()) {
        return;
      }
      try {
        let updatedPerson: PersonModel = { ...person, customFields };
        let photoUrl = null;
        if (photoFile) {
          photoUrl = await uploadProfilePhoto(photoFile);
          updatedPerson = {
            ...person,
            photoUrl,
          };
        }
        if (!person) {
          throw new Error("Person data is missing.");
        }

        await createPerson(updatedPerson);
        successToast("Person created.");
        router.push(appRoutes.people);
      } catch (error) {
        infoToast("Something went wrong!");
      }
    } else {
      errorToast("First name is required.");
    }
  };
  const handleStatus = (status: PersonStatus) => {
    setStatus(status);
  };

  return (
    <div className="flex flex-col w-full p-8 mx-auto  md:min-w-3xl ">
      <h2 className="text-2xl font-bold mb-4">Create New Person</h2>
      <div className="flex max-sm:justify-center mb-4">
        <EditableAvatar setPhotoFile={setPhotoFile} />
      </div>
      <div className="space-y-4">
        <Input
          autoFocus
          placeholder="First Name"
          value={person?.firstName || ""}
          onChange={(e) => setPerson({ ...person, firstName: e.target.value })}
        />
        <Input
          placeholder="Last Name"
          value={person?.lastName || ""}
          onChange={(e) => setPerson({ ...person, lastName: e.target.value })}
        />

        <Input
          placeholder="Phone"
          value={person?.phoneNumber || ""}
          onChange={(e) =>
            setPerson({ ...person, phoneNumber: e.target.value })
          }
        />

        <Input
          placeholder="Email"
          value={person?.email || ""}
          onChange={(e) => setPerson({ ...person, email: e.target.value })}
        />
        <Input
          placeholder="Occupation"
          value={person?.occupation || ""}
          onChange={(e) => setPerson({ ...person, occupation: e.target.value })}
        />

        {
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Input
                className="text-start font-bold"
                style={{ color: person?.status?.color }}
                placeholder="Status"
                value={person?.status?.label ?? ""}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={person?.status?.id}
                // onValueChange={(value) =>
                //   personStatus !== null ?  : null
                // }
              >
                {user &&
                  user.personStatuses.map((status) => (
                    <DropdownMenuRadioItem
                      style={{ color: status.color ?? "white" }}
                      onSelect={() => {
                        handleStatus(status);
                      }}
                      key={status.id}
                      value={status.id}
                    >
                      {status.label}
                    </DropdownMenuRadioItem>
                  ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        }
        <Label className="ml-2 text-gray-300 mb-2" htmlFor="dob">
          Date of birth
        </Label>
        <DatePicker
          selected={dateOfBirth}
          minDate={new Date("1950-01-01")}
          maxDate={new Date()}
          onChange={(date: Date | null) => {
            setDateOfBirth(date);
            setPerson({
              ...person,
              dateOfBirth: date ?? null,
            });
          }}
          dateFormat="dd.MM.yyyy"
          placeholderText="dd.MM.yyyy"
          className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          wrapperClassName="w-full"
        />

        <hr className="border" />
        <h1>Custom Fields</h1>
        {customFields.map((field, index) => {
          return (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                placeholder="Title"
                autoFocus
                value={field.key}
                onChange={(e) =>
                  handleFieldChange(index, "key", e.target.value)
                }
              />
              <Input
                placeholder="Value"
                value={field.value}
                onChange={(e) =>
                  handleFieldChange(index, "value", e.target.value)
                }
              />
              <Button
                onClick={() => handleFieldRemove(index)}
                style={{
                  color: colors.red,
                }}
              >
                <Trash />
              </Button>
            </div>
          );
        })}
        <Button onClick={handleAddField}>+ Add field</Button>

        <Textarea
          placeholder="Description"
          value={person?.description || ""}
          rows={4}
          onChange={(e) =>
            setPerson({ ...person, description: e.target.value })
          }
        />
        <Button className="w-full" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
}
