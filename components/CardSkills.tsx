import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HyperText from "./magicui/hyper-text";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ShinyButton from "./magicui/shiny-button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Skills from "./Skills";
import pythonImage from "@/assets/python.png";

import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";

export default function LayoutGridDemo() {
  return (
    <div className="h-screen py-20 w-full">
      <div className="text-center -mt-12">
        <h1 className="text-4xl font-bold">Skills</h1>
      </div>
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>React</CardTitle>
        <CardDescription>
          My go-to tool for building fast, interactive user interfaces that
          deliver exceptional experiences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        With React, I build robust applications that are not only lightning-fast
        but also SEO-friendly, thanks to its server-side rendering capabilities.
        React empowers me to construct reusable components, ensuring that every
        interaction feels smooth and every page loads instantly.
      </CardContent>
      <CardFooter>
        <Link href="https://react.dev/" className=" outline-double p-2 rounded">
          Learn More About React
        </Link>
      </CardFooter>
    </Card>
  );
};

const SkeletonTwo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Express</CardTitle>
        <CardDescription>
          The backend magic, powering robust and scalable server-side
          applications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        The backbone of any great application lies in its backend, and Express
        is where I work my backend sorcery. Express, a minimal and flexible
        Node.js web application framework, provides the structure needed to
        build powerful APIs and backend services.
      </CardContent>
      <CardFooter>
        <Popover>
          <PopoverTrigger className="outline-double rounded p-2">
            Learn More
          </PopoverTrigger>
          <PopoverContent>
            <ul>
              <li>
                <Link href="https://python.org">Python</Link>
              </li>
              <li>
                <Link href="https://expressjs.com/">Express</Link>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
};
const SkeletonThree = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Node.js</CardTitle>
        <CardDescription>
          The engine that drives my server-side scripts with power and
          efficiency
        </CardDescription>
      </CardHeader>
      <CardContent>
        Built on Chrome&apos;s VB Javascript engine, Node.js allows me to write
        server-side code that is fast, scalable, and efficient. It&apos;s
        perfect for handling multiple connections simultaneously, making it
        ideal for real-time applications like chat servers, APIs, and
        single-page applications. With a vast ecosystem of libraries and tools,
        Node.js allows me to build everything from simple scripts to complex
        microservices architecture.
      </CardContent>
      <CardFooter>
        <Link href="https://nodejs.org" className="outline-double p-2 rounded">
          Learn More About NodeJS
        </Link>
      </CardFooter>
    </Card>
  );
};
const SkeletonFour = () => {
  return (
    <div className="scroll">
      <Card>
        <CardHeader>
          <CardTitle>Other Skills</CardTitle>
          <CardDescription>
            These tools and technologies ensure that my projects are not only
            functional but also well-designed, efficiently managed, and scalable
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            <li>
              <span className="font-bold">GitHub</span>: Essential for version
              control and collaboration, GitHub helps me manage code, track
              changes, and ensure seamless project workflows.
            </li>
            <li>
              <span className="font-bold">Firebase</span>: A comprehensive suite
              for building real-time, scalable applications with features like
              authentication, database management, and serverless functions.
            </li>
            <li>
              <span className="font-bold">Tailwind</span>: A utility-first CSS
              framework that allows me to create custom, responsive designs
              directly in my codebase, speeding up development.
            </li>
            <li>
              <span className="font-bold">MongoDB</span>: My preferred NoSQL
              database for handling large, flexible data sets, allowing for
              aagile development and easy scalability.
            </li>
            <li>
              <span className="font-bold">Vercel</span>: The go-to platform for
              deploying and hosting web applications, offering quick deployment,
              automatic scaling, and global content delivery.(This site is deployed in Vercel)
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsEjCQNyD3_JGsmTZ1Ng0a3WefsXra98wzCw&s`,
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://d2ms8rpfqc4h24.cloudfront.net/feature_image_152a3e6669.jpg",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://www.iconbolt.com/preview/facebook/radix-icons/vercel-logo.svg",
  },
];
