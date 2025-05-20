import { profilePlaceholder } from "@/config/constants";
import { getContrastTextColor } from "@/lib/utils";
import { PersonModel } from "@/types/person";
import { ReactNode } from "react";

const PersonTile = ({
  person,
  leading,
  title,
  subtitle,
  trailing,
}: {
  person?: PersonModel;
  leading?: string;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
}) => {
  const bgColor = person?.status?.color ?? "#ffffff";
  const textColor = getContrastTextColor(bgColor);
  return (
    <div className="flex items-center justify-between p-4 border-2 cursor-pointer rounded-xl shadow-grey-300 shadow-xs hover:bg-muted transition ">
      <div className="flex items-center gap-4">
        {
          <div className="bg-accent p-2 rounded w-[70px] text-center">
            {leading}
          </div>
        }
        <div>
          <p className="font-medium pb-1">{title}</p>
          {subtitle && (
            <div
              className="inline-block px-2 py-0.5 rounded-2xl"
              style={{
                backgroundColor: bgColor,
                color: textColor,
              }}
            >
              <p className="text-sm  font-bold ">{subtitle}</p>
            </div>
          )}
        </div>
      </div>
      {trailing}
      <div>
        <img src={person?.photoUrl??profilePlaceholder} alt="Profile" className="w-15 h-15 object-cover rounded-sm" />
      </div>
    </div>
  );
};

export default PersonTile;
