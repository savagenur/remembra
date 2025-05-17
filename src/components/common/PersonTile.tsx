import { ReactNode } from "react";

const PersonTile = ({
  leading,
  title,
  subtitle,
  trailing,
}: {
  leading?: string;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-2 cursor-pointer rounded-xl shadow-grey-300 shadow-xs hover:bg-muted transition ">
      <div className="flex items-center gap-4">
        {<div className="bg-accent p-2 rounded">{leading}</div>}
        <div>
          <p className="font-medium">{title}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {trailing}
    </div>
  );
};

export default PersonTile;
