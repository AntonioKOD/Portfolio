import Image from "react";
import IconCloud from "./magicui/icon-cloud";




const slugs= [
    "javascript",
    "python",
    "nodedotjs",
    "express",
    "react",
    "html5",
    "css3",
    "vercel",
    "tailwindcss",
    "github",
    "figma",
    "gitlab",
    "git",
    "firebase",
    "postgresql",
]

export default function Skills(){
 
    return (
        <div id="skills">
       
        <div className=" flex max-w-[50rem] items-center justify-center overflow-hidden mx-auto ">
            
            <IconCloud iconSlugs={slugs}/>
            
           
        </div>
        </div>
      
        
    )
}