import Image from "next/image";
import React from "react";
import List from "@/assets/list.svg"
import portfolioLogo from "/assets/portfolioLogo.svg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

import  Link  from "next/link";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
export default function NavBar() {
  return (
    <div>
    <div className="bg-white dark:bg-gray fixed w-full z-20 top-0 start-0 border-b-4 border-border-900 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto -m-12">
        
        <Image
          src={portfolioLogo}
          width={200}
          alt="logo"
        ></Image>
        
        <div className="flex md:order-2 space-x-3 md:space-x-0">
            <div className="space-x-12 hidden lg:block">
            <Link href='#' className="hover:underline font-serif text-lg">Projects</Link>
            <Link href='#' className="hover:underline font-serif text-lg">About</Link>
            <Link href='#' className="hover:underline font-serif text-lg">Skills</Link>
            </div>
            <div className="lg:hidden mx-auto p-14">
            <DropdownMenu>
            <DropdownMenuTrigger><Image src={List} alt="icon"></Image></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Portfolio</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>Projects</DropdownMenuItem>
                <DropdownMenuItem>About</DropdownMenuItem >
                <DropdownMenuItem>Skills</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </div>
      </div>
    
    </div>
    </div>
  );
}
