"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { usePersonStore } from "@/stores/person.store";
import { use, useEffect, useState } from "react";
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
import {
  convertToSafeDate,
  firebaseStoragePaths,
  formatDateToInputField,
} from "@/lib/utils";
import { toast } from "sonner";
import { FileWarning, Info, StopCircle } from "lucide-react";
import { appRoutes } from "@/lib/routes";
import { uploadFirebaseStoragePhoto } from "@/lib/firebase/storage";
import { PersonModel } from "@/types/person";
import EditableAvatar from "@/components/person/EditableAvatar";

export default function EditPersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const { person, setPerson, fetchPerson, setStatus } = usePersonStore();
  const { updatePerson } = usePeopleStore();
  const user = useAuthStore((state) => state.user);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  useEffect(() => {
    firstInit();
  }, []);

  useEffect(() => {
    if (person?.dateOfBirth) {
      setDateOfBirth(person?.dateOfBirth as Date);
    }
  }, [person?.dateOfBirth]);

  const firstInit = async () => {
    await fetchPerson(id);
    console.log(dateOfBirth);
  };
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
      toast("Something went wrong.");
      return null;
    }
  };
  const handleSubmit = async () => {
    if (person?.firstName && person.firstName.trim() !== "") {
      try {
        let updatedPerson: PersonModel = person;
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

        await updatePerson(updatedPerson);
        toast("Person updated.");
        router.push(appRoutes.people);
      } catch (error) {
        toast(`Something went wrong!`);
        console.log(error);
      }
    } else {
      toast("First name is required.", {
        style: {
          color: "red",
        },

        icon: <Info />,
      });
    }
  };
  const handleStatus = (status: PersonStatus) => {
    setStatus(status);
  };

  return (
    <div className="flex flex-col w-full p-8 mx-auto md:min-w-3xl ">
      <h2 className="text-2xl font-bold mb-4">Edit Person</h2>
      <div className="flex max-sm:justify-center mb-4">
        <EditableAvatar
          photoUrl={person?.photoUrl}
          setPhotoFile={setPhotoFile}
        />
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

        <div className="">
          <Label className="ml-2 text-gray-300 pb-2" htmlFor="dob">
            Date of birth
          </Label>
          <Input
            id="dob"
            type="date"
            value={
              person?.dateOfBirth
                ? formatDateToInputField(person.dateOfBirth as Date)
                : ""
            }
            onChange={(e) => {
              const date = convertToSafeDate(e.target.value);
              setPerson({
                ...person,
                dateOfBirth: e.target.value ? date : null,
              });
            }}
          />
        </div>

        <Textarea
          placeholder="Description"
          value={person?.description || ""}
          rows={4}
          onChange={(e) =>
            setPerson({ ...person, description: e.target.value })
          }
        />
        <Button className="w-full" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
