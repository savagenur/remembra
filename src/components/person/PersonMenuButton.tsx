"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { usePeopleStore } from "@/stores/people.store";
import { PersonModel } from "@/types/person";
import { useRouter } from "next/navigation";
import AppDialog from "../common/AppDialog";
import AppDropdownMenuItem from "../common/AppDropdownMenuItem";
import { dropdownMenuItemClassName } from "@/config/constants";
import { toast } from "sonner";
import { appRoutes } from "@/lib/routes";
import { successToast } from "../toast";

const PersonMenuButton = ({ person }: { person: PersonModel | null }) => {
  const { deletePerson } = usePeopleStore();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleOpen = () => {
    setTimeout(() => {
      console.log("Likely fully shown");
      setOpen(false);
    }, 500);
  };
  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger>
          <Menu />
        </DropdownMenuTrigger>
        {person && (
          <DropdownMenuContent onEscapeKeyDown={(e) => e.preventDefault()}>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => {
                router.push(appRoutes.personEdit(person.id!));
              }}
            >
              Edit
            </DropdownMenuItem>
            <AppDialog
              title="Are you sure you want to delete this person?"
              trigger={
                <div>
                  <AppDropdownMenuItem
                    title="Delete"
                    className={"text-red-600"}
                  />
                </div>
              }
              confirmTitle="Delete"
              onCancel={handleOpen}
              onConfirm={async () => {
                try {
                  await deletePerson(person!.id!);
                  successToast("Person deleted.");
                  router.push("/people");
                } catch (err) {
                  console.error("Failed to delete person:", err);
                }
              }}
            />
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </>
  );
};

export default PersonMenuButton;
