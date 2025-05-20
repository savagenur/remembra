import { LucideIcon, Phone } from "lucide-react";
import React from "react";

const PersonInfoTile = ({
  icon:Icon,
  label,
  text,
}: {
  icon: LucideIcon;
  label: string;
  text?: string | null;
}) => {
  return (
    <div className="border rounded-xl px-5 py-3 border-gray-600 max-sm:mb-3">
      <div className="flex gap-5  items-center">
        <Icon className="text-green-700" />
        <div>
          <p className="text-gray-300 pb-1">{label}:</p>
          <p className="font-bold text-lg">{text??"N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonInfoTile;
