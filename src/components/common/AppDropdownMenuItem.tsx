import React from "react";
type AppDropdownMenuItemProps = {
  title: string;
  className?: string | null;
  onTap?: () => void;
};
const AppDropdownMenuItem = ({
  title,
  className,
  onTap,
}: AppDropdownMenuItemProps) => {
  return (
    <div
      // onClick={onTap}
      className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground ${className}`}
    >
      {title}
    </div>
  );
};

export default AppDropdownMenuItem;
