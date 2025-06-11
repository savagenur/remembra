"use client";

import FloatingActionButton from "@/components/common/FloatingActionButton";
import PersonTile from "@/components/common/PersonTile";
import { appRoutes } from "@/lib/routes";
import { formatDateOfBirth } from "@/lib/utils";
import { usePeopleStore } from "@/stores/people.store";
import { Loader, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const PeoplePage = () => {
  const { people } = usePeopleStore();
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowEmptyMessage(true);
    }, 1000);

    return () => clearTimeout(timeout); // cleanup
  }, []);

  if (people.length === 0) {
    return (
      <div className="flex w-full justify-center items-center min-h-screen">
        {showEmptyMessage ? (
          <div className="text-3xl text-gray-400">
            There are no friends yet.
          </div>
        ) : (
          <Loader className="animate-spin" />
        )}
        <Link href={appRoutes.peopleNew}>
          <FloatingActionButton icon={Plus} />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <header className="w-full px-10 py-5">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-3xl pl-4">
            People <span className="text-sm">{`(${people.length})`}</span>
          </h1>
        </div>
      </header>
      <main className="px-4">
        <div className="w-full flex flex-col  p-3 gap-2">
          {people.map((person) => {
            return (
              <Link key={person.id} href={`/people/${person.id}`}>
                <PersonTile
                  person={person}
                  leading={formatDateOfBirth(person.dateOfBirth as Date)}
                  title={`${person.firstName} ${person.lastName}`}
                  subtitle={person.status?.label ?? ""}
                />
              </Link>
            );
          })}
        </div>
        <Link href={appRoutes.peopleNew}>
          <FloatingActionButton icon={Plus} />
        </Link>
      </main>
    </div>
  );
};

export default PeoplePage;
