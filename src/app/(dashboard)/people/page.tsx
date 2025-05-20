"use client";

import FloatingActionButton from "@/components/common/FloatingActionButton";
import PersonTile from "@/components/common/PersonTile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { appRoutes } from "@/lib/routes";
import { formatDateOfBirth } from "@/lib/utils";
import { usePeopleStore } from "@/stores/people.store";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const PeoplePage = () => {
  const people = usePeopleStore((state) => state.people);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <header className="w-full px-10 py-5">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-3xl">
            People <span className="text-sm">(200)</span>
          </h1>
        </div>
      </header>
      <main className="px-4">
        <Tabs defaultValue="active" className="w-full">
          {/* Centered Tab List */}
          <div className="flex justify-center">
            <TabsList className="w-[400px] justify-center">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="archive">Archive</TabsTrigger>
            </TabsList>
          </div>
          {/* Full-Width Content */}
          <TabsContent value="active" className="mt-4 w-full">
            <div className="w-full flex flex-col  p-4 gap-2">
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
          </TabsContent>
          <TabsContent value="archive" className="mt-4 w-full">
            <div className="w-full flex flex-col  p-4 gap-2">
              {Array.from({ length: 10 }).map((_, index) => {
                return (
                  <Link key={index} href={"/people/1"}>
                    <PersonTile
                      leading="20 feb."
                      title="Nurba Muratbek"
                      subtitle="College"
                    />
                  </Link>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
        <Link href={appRoutes.peopleNew}>
          <FloatingActionButton icon={Plus} />
        </Link>
      </main>
    </div>
  );
};

export default PeoplePage;
