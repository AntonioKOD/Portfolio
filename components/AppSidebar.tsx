'use client'
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
  import { Calendar, Home, User, Settings, LogOut, LayoutTemplate, GraduationCap } from "lucide-react";
  import Link from "next/link";
  import React from "react";
  import { signOut } from "next-auth/react";
  
  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
        title: "Courses",
        url: "/courses",
        icon: GraduationCap,
    },
    {
      title: "Schedule a Meeting",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: LayoutTemplate,
    },
    {
        title: "Log Out",
        onClick: () => signOut({ callbackUrl: "/" }), // Log Out Action
        icon: LogOut,
    },
  
  ];
  
  export function AppSideBar() {
    return (
      <div className="h-screen w-64 bg-gray-800 text-white">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 py-2 text-sm font-semibold uppercase text-gray-400">
                Dashboard
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title} className="hover:bg-gray-700">
                      <SidebarMenuButton asChild>
                        {item.url ? (
                          // Navigation items
                          <Link href={item.url} className="flex items-center gap-2 px-4 py-2">
                            {React.createElement(item.icon, { className: "h-5 w-5" })}
                            <span>{item.title}</span>
                          </Link>
                        ) : (
                          // Action items like Log Out
                          <button
                            onClick={item.onClick}
                            className="flex items-center gap-2 px-4 py-2 w-full text-left"
                          >
                            {React.createElement(item.icon, { className: "h-5 w-5" })}
                            <span>{item.title}</span>
                          </button>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>
    );
  }