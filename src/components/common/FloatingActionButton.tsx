import React from "react";
import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";

const FloatingActionButton = ({
  icon: Icon,
}: {
  icon: LucideIcon;
}) => {
  return (
    <Button
      size={"icon"}
      className=" fixed bottom-6 right-6 z-50 rounded-full bg-green-700 hover:bg-green-800 shadow-lg cursor-pointer w-12 h-12"
    >
      <Icon className="w-10 h-10" />
    </Button>
  );
};

export default FloatingActionButton;
