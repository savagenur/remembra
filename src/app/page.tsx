import { appRoutes } from "@/lib/routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(appRoutes.people);
}
