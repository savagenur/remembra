import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { menuItems } from "@/config/menu";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar items={menuItems} />
      <main className="w-full flex">
        <div className="py-3 pl-1 absolute ">
          <SidebarTrigger hidden={false} />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
