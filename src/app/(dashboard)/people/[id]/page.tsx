"use client";
import PersonInfoTile from "@/components/person/PersonInfoTile";
import PersonMenuButton from "@/components/person/PersonMenuButton";
import { profilePlaceholder } from "@/config/constants";
import { formatDateFull, getContrastTextColor } from "@/lib/utils";
import { usePersonStore } from "@/stores/person.store";
import { FileText, Heart, Mail, PartyPopper, Phone } from "lucide-react";
import { use, useEffect } from "react";

const PersonDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { person, fetchPerson, resetPerson } = usePersonStore();
  const bgColor = person?.status?.color ?? "#ffffff";
  const textColor = getContrastTextColor(bgColor);
  useEffect(() => {
    resetPerson();
    fetchPerson(id);
  }, []);
  return (
    <div className="flex p-5  flex-col  w-full text-start">
      <header className="flex pb-4  max-sm:flex-col gap-3  items-center  w-full   max-sm:justify-center">
        <div>
          <img
            src={person?.photoUrl ?? profilePlaceholder}
            className="rounded-xl object-cover  w-32 h-32"
            alt="Profile"
          />
        </div>
        <div className="flex flex-col max-sm:items-center">
          <h1 className="text-2xl pb-2">
            {person ? `${person?.firstName} ${person?.lastName}` : "Loading..."}
          </h1>
          <div
            className="inline-block w-fit justify-center px-2 py-0.5 rounded-2xl"
            style={{
              backgroundColor: bgColor,
              color: textColor,
            }}
          >
            <p className="text-sm  font-bold max-sm:justify-center ">
              {person?.status?.label}
            </p>
          </div>
        </div>
        <div className="absolute right-4 top-3">
          <PersonMenuButton person={person ? person : null} />
        </div>
      </header>
      <hr className="my-4 border-gray-500 mb-7 " />
      {/* <div className="">
        <p className="p-2 bg-card inline-block rounded-2xl py-1 px-3 ">
          {formatToDateString(person?.dateOfBirth)}
        </p>
      </div> */}
      <div className="grid-cols-2 sm:grid gap-3">
        <PersonInfoTile label="Email" icon={Mail} text={person?.email} />
        <PersonInfoTile label="Phone" icon={Phone} text={person?.phoneNumber} />
        <PersonInfoTile
          label="DOB"
          icon={PartyPopper}
          text={formatDateFull(person?.dateOfBirth as Date)}
        />
        <PersonInfoTile label="Hobby" icon={Heart} />
      </div>
      <div className="sm:pb-3" />
      <PersonInfoTile
        label="Description"
        icon={FileText}
        text={person?.description}
      />
    </div>
  );
};

export default PersonDetailPage;
