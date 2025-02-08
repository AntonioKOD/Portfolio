import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NavBar from "@/components/NavBar";
import {GoogleAnalytics } from '@next/third-parties/google'


import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { AppSideBar } from "@/components/AppSidebar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "codeWithToni",
  description: "Developing the Digital Backbone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>
          <NavBar/>
          <GoogleAnalytics gaId="G-D9B66HCXSY"/>
        {children}
        </SessionProviderWrapper>
        </body>
    </html>
  );
}
