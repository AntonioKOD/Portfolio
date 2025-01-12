// app/dashboard/layout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSideBar } from "@/components/AppSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSideBar />
        <SidebarTrigger/>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
