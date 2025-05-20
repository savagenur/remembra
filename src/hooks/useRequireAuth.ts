"use client";
import { useAuthStore } from "@/stores/auth.store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const UseRequireAuth = () => {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const router = useRouter();
  const pathname = usePathname();

  // Redirect authenticated users away from sign-in/sign-up pages
  useEffect(() => {
    
    if (
      isInitialized &&
      user &&
      (pathname === "/sign-in" || pathname === "/sign-up")
    ) {
      router.replace("/");
    }
  }, [user, pathname, router, isInitialized]);

  // Redirect unauthenticated users to sign-in page
  useEffect(() => {
    if (
      isInitialized &&
      !user &&
      pathname !== "/sign-in" &&
      pathname !== "/sign-up"
    ) {
      router.replace("/sign-in");
    }
  }, [user, pathname, router, isInitialized]);

  return null;
};
