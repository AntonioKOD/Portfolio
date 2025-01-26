// app/dashboard/layout.tsx
"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSideBar } from "@/components/AppSidebar";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect if not logged in
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) return null; // Prevent rendering if no session

  return (
    <SidebarProvider>
      <div className="flex">
        <AppSideBar />
       
        <main className="flex-1">
          <SessionProviderWrapper>{children}</SessionProviderWrapper>
        </main>
      </div>
    </SidebarProvider>
  );
}