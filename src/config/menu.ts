"use client";
import { Home, Inbox, Calendar, Search, Settings } from "lucide-react";
import { appRoutes } from "@/lib/routes";
import { MenuItemModel } from "@/types/menuItem";

export const menuItems: MenuItemModel[] = [
  {
    title: "People",
    url: appRoutes.people,
    icon: Home,
  },
  {
    title: "Birthdays",
    url: appRoutes.birthdays,
    icon: Inbox,
  },

  {
    title: "Settings",
    url: appRoutes.settings,
    icon: Settings,
  },
];
