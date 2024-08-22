"use client"
import { FloatingDock } from "./ui/floating-dock";
import React from "react";
import {
  IconBrandTwitterFilled,
  IconBrandGithub,
  IconHome,
} from "@tabler/icons-react";

export default function DockMenu() {
    const links = [
        {
            title: "Home",
            icon: (<IconHome className="h-full w-full text-black-500 dark:text-neutral-300"/>),
        
        href:"#",
        },
        {
          title: "GitHub",
          icon: (<IconBrandGithub className="h-full w-full text-black-500 dark:text-neutral-300"/>),
          href: "https://github.com/AntonioKOD",
        },
        {
          title: "Instagram",
          icon: (<IconBrandTwitterFilled className="h-full w-full text-black-500 dark:text-neutral-300"/>),
          href: "https://x.com/antonio_kodheli"
        },

    ]
  return (
  <div className="flex items-center justify-center h-[35rem] w-full z-20 fixed mt-[35rem]">
    <FloatingDock items={links}/>
  </div>
  );
}
