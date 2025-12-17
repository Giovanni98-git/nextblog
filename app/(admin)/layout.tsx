import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="p-6 w-full">
        {/* <SidebarTrigger /> */}
        {children}
      </div>
    </SidebarProvider>
  );
}
