import Image from "react";
import IconCloud from "./magicui/icon-cloud";
import TextRevealByWord from "./magicui/text-reveal";

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
    "postgresql"
]

export default function Skills(){
    return (
        <div>
        <div className="flex">
            <div className="-mt-48">
            <TextRevealByWord text="Changing the way you develop apps"/>
            </div>
        <div className="absolute right-0 flex max-w-[32rem] items-center justify-center overflow-hidden px-20 pb-20">
            
            <IconCloud iconSlugs={slugs}/>
            
           
        </div>
        </div>
        </div>
        
    )
}