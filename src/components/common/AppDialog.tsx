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
import React from "react";

interface AppDialogProps {
  onConfirm: () => void;
  onCancel?: () => void;
  confirmTitle: string;
  title: string;
  description?: string | null;
  confirmClass?: string;
  trigger?: React.ReactElement;
}

export default function AppDialog({
  onConfirm,
  onCancel,
  trigger,
  confirmTitle,
  confirmClass,
  title,
  description,
}: AppDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onCancel}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className={confirmClass}>
            {confirmTitle}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
