"use client";

import FloatingActionButton from "@/components/common/FloatingActionButton";
import PersonTile from "@/components/common/PersonTile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { appRoutes } from "@/lib/routes";
import { formatDateOfBirth } from "@/lib/utils";
import { usePeopleStore } from "@/stores/people.store";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
const birthdayTabs = {
  active: "active",
  archive: "archive",
};
const BirthdaysPage = () => {
  const { people, peopleAfterToday, peopleBeforeToday } = usePeopleStore();
  const [tab, setTab] = useState<string | null>(null);

  useEffect(() => {
    const savedTab = localStorage.getItem("peopleTab");
    setTab(savedTab ?? "active");
  }, []);
  console.log(tab);
  const isTabActive = (activeTab: string) => {
    if (tab === activeTab) {
      return true;
    }
    return false;
  };
  const handleTabChange = (newTab: string) => {
    setTab(newTab);
    localStorage.setItem("peopleTab", newTab);
  };
  if (!tab) return null;
  return (
    <div className="w-full min-h-screen flex flex-col">
      <header className="w-full px-10 py-5">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-3xl">
            People <span className="text-sm">{`(${people.length})`}</span>
          </h1>
        </div>
      </header>
      <main className="px-4">
        <Tabs
          defaultValue={tab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          {/* Centered Tab List */}
          <div className="flex justify-center">
            <TabsList className="w-[400px] justify-center">
              <TabsTrigger value={birthdayTabs.active}>Active</TabsTrigger>
              <TabsTrigger value={birthdayTabs.archive}>Archive</TabsTrigger>
            </TabsList>
          </div>
          {/* Full-Width Content */}
          <TabsContent value="active" className="mt-4 w-full">
            <div className="w-full flex flex-col  p-4 gap-2">
              {peopleAfterToday.map((person) => {
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
              {peopleBeforeToday.map((person) => {
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
        </Tabs>
        <Link href={appRoutes.peopleNew}>
          <FloatingActionButton icon={Plus} />
        </Link>
      </main>
    </div>
  );
};

export default BirthdaysPage;
