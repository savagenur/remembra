import { UserModel } from "@/types/user";
import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import { User } from "firebase/auth";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateToString(date: Date): string {
  return date.toISOString().split("T")[0];
}
export function dateFromString(dateStr: string): Date {
  return new Date(dateStr);
}
export function convertToSafeDate(value: string): Date | null {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return isNaN(date.getTime()) ? null : date;
}

export function convertToUserModel(user: User): UserModel {
  return {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    createdAt: new Date(), // or `null` if you'll fetch it from Firestore
    personStatuses: [], // or fetch from Firestore
  };
}
export const formatDateOfBirth = (date?: Date | null) =>
  date ? format(date, "dd MMM") : "N/A";
export const formatDateFull = (date?: Date | null) =>
  date ? format(date, "dd MMM, yyyy") : "N/A";
export function formatToDateString(date?: Date | null): string {
  return date ? format(date, "MM/dd/yyyy") : "No date";
}
export function formatDateToInputField(date: string | Date): string {
  const d = new Date(date);
  console.log(d.toISOString().split("T")[0]);
  
  return d.toISOString().split("T")[0]; // Returns "YYYY-MM-DD"
}
export function getContrastTextColor(bgColor: string) {
  if (!bgColor) return "black";

  // Remove # if present
  const color = bgColor.replace("#", "");

  // Parse RGB
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black for light backgrounds, white for dark ones
  return brightness > 150 ? "black" : "white";
}
export const firebaseStoragePaths = {
  personProfile: (personId: string) => `people_profiles/${personId}.jpg`,
};
