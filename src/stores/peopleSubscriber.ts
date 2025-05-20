'use client';
import { useEffect } from "react"
import { usePeopleStore } from "./people.store"

export const PeopleSubscriber=() => {
  const subscribeToPeople = usePeopleStore((state) => state.subscribeToPeople)
  useEffect(() => {
    subscribeToPeople();
  },[subscribeToPeople])
  return null;
}