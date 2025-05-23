import { colors } from "@/config/constants";
import { AlertCircle, Check, Info } from "lucide-react";
import { toast } from "sonner";

const baseStyle = {
  backgroundColor: "#0f0f0f", // dark background
  color: "#fff",              // light text
  border: "1px solid #333",   // optional border
};

export function errorToast(title: string) {
  toast(title, {
    icon: <AlertCircle />,
    style: {
      ...baseStyle,
      color: colors.red,
    },
  });
}

export function infoToast(title: string) {
  toast(title, {
    icon: <Info />,
    style: baseStyle,
  });
}

export function successToast(title: string) {
  toast(title, {
    icon: <Check />,
    style: baseStyle,
  });
}
