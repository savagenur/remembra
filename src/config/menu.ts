"use client";
import { Home, Inbox, Calendar, Search, Settings } from "lucide-react";
import { routes } from "@/lib/routes";
import { MenuItemModel } from "@/types/menuItem";

export const menuItems: MenuItemModel[] = [
  {
    title: "People",
    url: routes.people,
    icon: Home,
  },
  {
    title: "Birthdays",
    url: routes.birthdays,
    icon: Inbox,
  },

  {
    title: "Settings",
    url: routes.settings,
    icon: Settings,
  },
];
