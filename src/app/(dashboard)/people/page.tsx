import PersonTile from "@/components/common/PersonTile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import React from "react";

const PeoplePage = () => {
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
        <Tabs defaultValue="account" className="w-full">
          {/* Centered Tab List */}
          <div className="flex justify-center">
            <TabsList className="w-[400px] justify-center">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
          </div>
          {/* Full-Width Content */}
          <TabsContent value="account" className="mt-4 w-full">
            <div className="w-full flex flex-col  p-4 gap-2">
              {Array.from({ length: 10 }).map((_, index) => {
                return (
                  <Link key={`${index}`} href={"/people/1"}>
                    <PersonTile
                      leading="5 apr."
                      title="Baijan Koshmatov"
                      subtitle="Friend"
                    />
                  </Link>
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="password" className="mt-4 w-full">
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
      </main>
    </div>
  );
};

export default PeoplePage;
