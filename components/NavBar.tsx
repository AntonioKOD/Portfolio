'use client'
import Image from "next/image";
import React from "react";
import List from "@/assets/list.svg"
import portfolioLogo from "/assets/portfolioLogo.svg";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";  


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
  const {data: session} = useSession();
  const user = session?.user;
  return (
    <div>
    <div className="bg-white dark:bg-gray fixed w-full z-20 top-0 start-0 border-b-4 border-border-900 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto -m-12">
        <Link href={'/'}>
        <Image
          src={portfolioLogo}
          width={200}
          alt="logo"
          
        ></Image>
        </Link>
        
        <div className="flex md:order-2 space-x-3 md:space-x-0">
            <div className="space-x-12 hidden lg:block">
             
            <Link href='/services' className="hover:underline font-serif text-lg">Services</Link>
            <Link href='/#projects' className="hover:underline font-serif text-lg">Projects</Link>
            <Link href='/#about' className="hover:underline font-serif text-lg">Contact</Link>
            <Link href='/#skills' className="hover:underline font-serif text-lg">Skills</Link>
            {user ? (
               <><Link href="/templates">Templates</Link><Button onClick={() => signOut({callbackUrl: '/'})}>Logout</Button></>)
              : (
                <Link href="/login">Login</Link>
              )}
            </div>
            <div className="lg:hidden mx-auto p-14">
            <DropdownMenu>
            <DropdownMenuTrigger><Image src={List} alt="icon"></Image></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Portfolio</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem><Link href="/services">Services</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href="/#projects">Projects</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href="/#about">Contact</Link></DropdownMenuItem >
                <DropdownMenuItem><Link href="/#skills">Skills</Link></DropdownMenuItem>
                {user ? (
                <><DropdownMenuItem><Link href="/templates">Templates</Link></DropdownMenuItem><Button onClick={() => signOut({callbackUrl: '/'})} className="mt-4 mx-4">Logout</Button></>)
                : (
                  <DropdownMenuItem><Link href="/login">Login</Link></DropdownMenuItem>
                )}
                
            </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </div>
      </div>
    
    </div>
    </div>
  );
}
