"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";
import { AppSidebarProps } from "@/types/props";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import ConfirmLogoutDialog from "./auth/ConfirmLogoutDialog";
import { profilePlaceholder } from "@/config/constants";

export function AppSidebar({ items }: AppSidebarProps) {
  const pathName = usePathname();
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const handleSignOut = async () => {
    await useAuthStore.getState().signOut();
  };

  return (
    <Sidebar className="h-screen">
      <SidebarContent className="h-full">
        <SidebarGroup className="h-full">
          <SidebarGroupLabel>
            <div>Remembra</div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="h-full">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex gap-3 items-center pb-3">
                  <img
                    src={
                      user?.photoURL ||
                      profilePlaceholder
                    }
                    alt="User Avatar"
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }} // optional: round image
                  />
                  {isInitialized ? (
                    <h2 className="italic">Welcome, {user?.displayName}!</h2>
                  ) : (
                    <h2 className="italic">"Loading ..."</h2>
                  )}
                </div>
                <SidebarMenu>
                  {items.map((item) => {
                    const isActive = pathName === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          className={cn({
                            "menu-item_active": isActive,
                            "menu-item": !isActive,
                          })}
                          asChild
                        >
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </div>
              <ConfirmLogoutDialog onConfirm={handleSignOut} />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
