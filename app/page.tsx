import Image from "next/image";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import { Separator } from "@/components/ui/separator";
import  CardSkills  from "@/components/CardSkills";



export default function Home() {
  return (
    <div className="flex flex-col ">
      <NavBar></NavBar>
      <div className="mt-40">
        <div className="px-36">
          <Hero></Hero>
        </div>
      </div>
      
      <div id='skills' className="p-24">
        <Separator/>
          <CardSkills/>
          <Skills></Skills>
       </div>
    </div>
  );
}
