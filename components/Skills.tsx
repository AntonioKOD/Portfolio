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
    "postgresql"
]

export default function Skills(){
    return (
        <div>
            <IconCloud iconSlugs={slugs}></IconCloud>
        </div>
    )
}