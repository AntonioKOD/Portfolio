import Image from "next/image";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col ">
      <NavBar></NavBar>
      <div className="mt-40">
        <div className="px-36">
          <Hero></Hero>
        </div>
      </div>
    </div>
  );
}
