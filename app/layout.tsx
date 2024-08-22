import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DockMenu from "@/components/Docks";
import {Toaster} from "react-hot-toast"


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
        <Toaster position="top-center"/>
        {children}</body>
    </html>
  );
}
