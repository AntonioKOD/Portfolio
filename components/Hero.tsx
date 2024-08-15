import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import ShineBorder from "./magicui/shine-border";
import Meteors from "./magicui/meteors";
import BlurIn from "./magicui/blur-in";
import ShinyButton from "./magicui/shiny-button";


export default function Hero() {
  return (
    <div className="flex -mx-24">
    <ShineBorder className="container mx-auto w-full relative flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl space-between space-y-6" color={["#2CD4D9","#3A3D98"]}>
      <Meteors></Meteors>
      <div className='flex flex-row'>
        <ShinyButton className="inline-flex items-center justify-center font-medium text-black-500 rounded-lg hover:text-gray-900" text="Project Inquiries"></ShinyButton>
    </div>
    <div className="flex flex-row">
      <div>
      <BlurIn className="text-4xl font-bold text-indigo dark:text-white" word="Coding the Digital Backbone." >
        </BlurIn>
        <BlurIn word="Creating Emotional, Meaningful & Innovative Digital Experiences" className=" m-12 text-4xl font-bold text-black dark:text-white"></BlurIn>
        <p className="text-center text-2xl p-8 text-gray-400">I'm a software developer specialized in building exceptional digital experiences.
          Providing smart solutions that enhance performance, engage customer, and foster growth.
          Designing and coding beautifully simple things.
        </p>
      </div>
    </div>
    </ShineBorder>
    
    </div>
    
  );
}
