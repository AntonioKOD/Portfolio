import Image from "next/image";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import { Separator } from "@/components/ui/separator";
import LayoutGridDemo from "@/components/CardSkills";
import { Projects } from "@/components/Projects";
import Footer from "@/components/Footer";
import Head from "next/head";



export default function Home() {
  return (
    <>
   <Head>
  {/* Primary Meta Tags */}
  <title>codeWithToni | Portfolio</title>
  <meta name="description" content="Explore Toni's portfolio showcasing cutting-edge projects, skills, and insights on modern web development." />
  <meta name="author" content="Toni" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#000000" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="canonical" href="https://www.codewithtoni.com" />

  {/* Open Graph / Facebook Meta Tags */}
  <meta property="og:title" content="codeWithToni | Portfolio" />
  <meta property="og:description" content="Discover Toni's work as a full-stack developer, featuring innovative projects and modern design." />
  <meta property="og:image" content="https://www.codewithtoni.com/og-image.png" />
  <meta property="og:url" content="https://www.codewithtoni.com" />
  <meta property="og:type" content="website" />

  {/* Twitter Meta Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="codeWithToni | Portfolio" />
  <meta name="twitter:description" content="Explore a curated collection of projects and skills from Toni, a passionate developer building modern web experiences." />
  <meta name="twitter:image" content="https://www.codewithtoni.com/twitter-image.png" />

  {/* Structured Data using JSON-LD */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "http://schema.org",
      "@type": "Person",
      "name": "Toni",
      "url": "https://www.codewithtoni.com",
      "sameAs": [
        "https://twitter.com/antonio_kodheli",
        "https://github.com/AntonioKOD",
        "https://www.linkedin.com/in/antonio-kodheli-1430aa290"
      ],
      "jobTitle": "Full-Stack Developer",
      "description": "Toni's portfolio showcasing modern web projects, design skills, and innovative coding solutions."
    })}
  </script>
</Head>
    <div className="flex flex-col w-full h-full overflow-auto relative">
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
      <div id="projects">
        <Separator />
        <Projects  />
        <Separator/>
      </div>
      <div>
      <Footer/>
      </div>
    </div>
    
    </>
  );
}
