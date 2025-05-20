// components/ConfirmLogoutDialog.tsx
"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { LogOut } from "lucide-react";

interface ConfirmLogoutDialogProps {
  onConfirm: () => void;
}

export default function ConfirmLogoutDialog({ onConfirm }: ConfirmLogoutDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <p className="flex items-center gap-2 cursor-pointer text-red-600">
          <LogOut />
          <span>Logout</span>
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently log you out.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="text-red-600">
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
