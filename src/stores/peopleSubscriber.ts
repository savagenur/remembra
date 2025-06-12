"use client";
import { useEffect } from "react";
import { usePeopleStore } from "./people.store";
import { useAuthStore } from "./auth.store";

export const PeopleSubscriber = () => {
  const subscribeToPeople = usePeopleStore((state) => state.subscribeToPeople);
  const { user, isInitialized } = useAuthStore();

  useEffect(() => {
    if (isInitialized && user) {
      subscribeToPeople();
    }
  }, [isInitialized, user, subscribeToPeople]);

  return null;
};
