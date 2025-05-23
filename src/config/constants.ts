import { PersonStatus } from "@/types/personStatus";

export const colors = {
  primary: "#000000", // black
  secondary: "#ffffff", // white
  background: "#ffffff", // white background
  surface: "#f5f5f5", // light gray for cards or sections
  text: "#000000", // black text
  muted: "#888888", // muted gray text
  border: "#e5e5e5", // light gray border
  accent: "#1a1a1a", // near-black for emphasis
  hover: "#111111", // hover black shade
  red: "#ef4444",
};
export const defaultStatuses: PersonStatus[] = [
  { id: "friend", label: "Friend", color: "#22C55E" },
  { id: "relative", label: "Relative", color: "#2563EB" },
  { id: "coworker", label: "Coworker", color: "#F59E0B" },
  { id: "acquaintance", label: "Acquaintance", color: "#6B7280" },
  { id: "partner", label: "Partner", color: "#EC4899" },
  { id: "classmate", label: "Classmate", color: "#8B5CF6" },
  { id: "neighbor", label: "Neighbor", color: "#10B981" },
  { id: "mentor", label: "Mentor", color: "#0EA5E9" },
  { id: "client", label: "Client", color: "#F97316" },
  { id: "other", label: "Other", color: "#9CA3AF" },
];

export const profilePlaceholder =
  "https://mastertondental.co.nz/wp-content/uploads/2022/12/team-profile-placeholder.jpg";

export const dropdownMenuItemClassName =
  "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground";
