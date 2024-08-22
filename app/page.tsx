import Image from "next/image";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import { Separator } from "@/components/ui/separator";
import LayoutGridDemo from "@/components/CardSkills";
import DockMenu from "@/components/Docks";
import { Projects } from "@/components/Projects";
import Footer from "@/components/Footer";



export default function Home() {
  return (
    
    <div className="flex flex-col ">
      <NavBar></NavBar>
      <div className="mt-40">
        <div className="px-36">
          <Hero></Hero>
        </div>
      </div>
      <div id='skills' className="p-12">
        <Separator/>
          <LayoutGridDemo/>
          <Skills></Skills>
       </div>
      <div>
        <Separator/>
        <Projects />
        <Separator/>
      </div>
      <Footer/>
    </div>
    

  );
}
