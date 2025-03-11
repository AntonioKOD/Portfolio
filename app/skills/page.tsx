import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {FaReact,} from "react-icons/fa"
import {SiNextdotjs} from "react-icons/si"
import {SiTypescript} from "react-icons/si"
import {SiHtml5} from "react-icons/si"
import {SiTailwindcss} from "react-icons/si"
import {SiRedux} from "react-icons/si"
import {SiVuedotjs} from "react-icons/si"
import {SiAngular} from "react-icons/si"
import {SiNodedotjs} from "react-icons/si"
import {SiExpress} from "react-icons/si"
import {SiMongodb} from "react-icons/si"
import {SiPostgresql} from "react-icons/si"
import { SiGraphql } from "react-icons/si"
import {VscFileCode} from "react-icons/vsc"
import { SiFirebase, SiAmazonwebservices, SiGit, SiDocker, SiJest, SiWebpack, SiFigma, SiVsco, SiPostman } from "react-icons/si"
import Link from "next/link"


export default function SkillsPage() {
  // Skill categories
  const skillCategories = [
    {
      name: "Frontend",
      skills: [
        { name: "React", level: 95, logo: FaReact },
        { name: "Next.js", level: 90, logo: SiNextdotjs },
        { name: "TypeScript", level: 85, logo: SiTypescript },
        { name: "HTML/CSS", level: 95, logo: SiHtml5 },
        { name: "Tailwind CSS", level: 90, logo: SiTailwindcss },
        { name: "Redux", level: 80, logo: SiRedux },
        { name: "Vue.js", level: 75, logo: SiVuedotjs },
        { name: "Angular", level: 70, logo: SiAngular },
      ],
    },
    {
      name: "Backend",
      skills: [
        { name: "Node.js", level: 90, logo: SiNodedotjs },
        { name: "Express", level: 85, logo: SiExpress },
        { name: "MongoDB", level: 80, logo: SiMongodb },
        { name: "PostgreSQL", level: 75, logo: SiPostgresql },
        { name: "GraphQL", level: 80, logo: SiGraphql },
        { name: "Firebase", level: 85, logo: SiFirebase },
        { name: "AWS", level: 70, logo: SiAmazonwebservices },
      ],
    },
    {
      name: "Tools",
      skills: [
        { name: "Git", level: 90, logo: SiGit },
        { name: "Docker", level: 75, logo: SiDocker },
        { name: "Jest", level: 80, logo: SiJest },
        { name: "Webpack", level: 75, logo:     SiWebpack },
        { name: "Figma", level: 85, logo: SiFigma },
        { name: "VS Code", level: 95, logo: VscFileCode },
        { name: "Postman", level: 90, logo: SiPostman },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              Expertise
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Technical <span className="text-primary">Skills</span>
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              A comprehensive overview of my technical expertise and proficiency
            </p>
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="Frontend" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                {skillCategories.map((category) => (
                  <TabsTrigger key={category.name} value={category.name}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {skillCategories.map((category) => (
              <TabsContent key={category.name} value={category.name} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 h-12 shrink-0">
                        {typeof skill.logo === "string" ? (
                          <Image
                            src={skill.logo || "/placeholder.svg"}
                            alt={skill.name}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        ) : (
                          <skill.logo size={48} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Professional Experience</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              My journey in software development and the experience I've gained
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {[
              {
                period: "2024 - Present",
                title: "Founder",
                company: "Pioneer UI",
                description:
                  "Leading Development of the component library that is used by developers to create landing pages and websites with ease, using React and Tailwind CSS.",
              },
              {
                period: "2022 - 2024",
                title: "CEO",
                company: "Digital Dynasty",
                description:
                  "Developed responsive web applications and e-commerce platforms using React and Vue.js. Built custom APIs with Node.js and Express.",
              },
              {
                period: "2019 - Present",
                title: "Web Developer",
                company: "Freelance",
                description:
                  "Built and maintained websites and web applications for clients across various industries. Utilized HTML, CSS, JavaScript, and React to create custom solutions.",
              },
            ].map((experience, index) => (
              <div
                key={index}
                className="mb-8 relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary"
              >
                <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-primary -translate-x-[3px]"></div>
                <div className="text-sm text-muted-foreground mb-1">{experience.period}</div>
                <h3 className="text-xl font-bold">{experience.title}</h3>
                <div className="text-primary font-medium mb-2">{experience.company}</div>
                <p className="text-muted-foreground">{experience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Education */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Education</h2>
              <div className="space-y-6">
                {[
                  {
                    degree: "Full Stack Web Development Bootcamp",
                    institution: "UC Berkeley Extension",
                    period: "2024 - 2024",
                    description: "Specialized in Software Engineering and Web Technologies",
                  },
                ].map((education, index) => (
                  <Card key={index} className="border-none shadow-md">
                    <CardContent className="p-6">
                      <div className="text-sm text-muted-foreground mb-1">{education.period}</div>
                      <h3 className="text-lg font-bold">{education.degree}</h3>
                      <div className="text-primary font-medium mb-2">{education.institution}</div>
                      <p className="text-muted-foreground">{education.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

