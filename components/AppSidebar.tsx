"use client";

import {
  Calendar,
  Home,
  User,
  Settings,
  LogOut,
  LayoutTemplate,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";

const items = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Courses", url: "/dashboard/courses", icon: GraduationCap },
  { title: "Schedule a Meeting", url: "/dashboard/calendar", icon: Calendar },
  { title: "Profile", url: "/dashboard/profile", icon: User },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Templates", url: "/dashboard/templates", icon: LayoutTemplate },
  { title: "Log Out", onClick: () => signOut({ callbackUrl: "/" }), icon: LogOut },
];

export function AppSideBar() {
  const pathname = usePathname(); // Get current URL for active state
  const [isOpen, setIsOpen] = useState(false); // Sidebar state (default closed on mobile)

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="absolute top-4 left-4 z-50 md:hidden p-2 rounded-full bg-gray-800 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Sidebar Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-64"} md:relative md:translate-x-0 bg-gray-900 text-white`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-5 flex justify-between items-center border-b border-gray-700">
            <h2 className="text-lg font-bold">Dashboard</h2>
            <button onClick={() => setIsOpen(false)} className="md:hidden">
              <X className="h-6 w-6 text-gray-400 hover:text-white" />
            </button>
          </div>

          {/* Sidebar Menu */}
          <nav className="flex-1 p-4 space-y-2">
            {items.map((item) => (
              <Link
                key={item.title}
                href={item.url || "#"}
                onClick={() => setIsOpen(false)} // Close sidebar on mobile navigation
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  pathname === item.url
                    ? "bg-gray-800 text-blue-400" // Active link
                    : "hover:bg-gray-700"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            ))}

            {/* Logout Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg hover:bg-gray-700 transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}