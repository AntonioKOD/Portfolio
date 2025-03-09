"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Code, Database, Download, ExternalLink, Globe, Layout, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { AnimatedButton } from "@/components/animated-button"
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardFooter } from "@/components/animated-card"
import { ScrollAnimationObserver } from "@/components/scroll-animation-observer"
import { getTemplates } from "@/app/web-templates/actions"
import { getProjects } from "@/app/projects/actions"
import { useState, useEffect } from "react"

export default function HomePage() {

  interface Project {
    id: string;
    name: string;
    link: string;
    content: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    technologies: string[];
    featured: boolean;
  }
  
  const [projects, setProjects] = useState<Project[]>([])
  interface Template {
    id: string;
    name: string;
    content: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    install: string;
    icon: string;
    features: string[];
    tags: string[];
    category: string;
    price: string;
    downloads: number;
    previewLink: string;
  }

  const [templates, setTemplates] = useState<Template[]>([])


    useEffect(() => {
        const fetchProjects = async () => {
        const data = await getProjects()
        setProjects(data)
        }
    
        fetchProjects()
    }, [])

    useEffect(() => {
        const fetchTemplates = async () => {
        const data = await getTemplates()
        setTemplates(data.map(template => ({
          ...template,
          imageUrl: template.ImageUrl
        })))
        }
    
        fetchTemplates()
    }, [])

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "As Hotel",
      role: "Owner, As Hotel",
      quote:
        "Working with Toni was a game-changer for our business. The website they built not only looks amazing but has significantly improved our conversion rates.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Invetory App",
      role: "Founder, Invetory App",
      quote:
        "Toni's technical expertise and attention to detail are unmatched. They delivered our project ahead of schedule and exceeded all our expectations.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="flex flex-col">
      <style jsx global>{`
  .code-editor-container::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.05) 50%, transparent 100%);
    background-size: 200% 100%;
    animation: sheen 3s linear infinite;
    pointer-events: none;
    z-index: 10;
  }
  
  @keyframes sheen {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`}</style>
      {/* Hero Section with cleaner design */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-background">
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-muted/30" />
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 animate-fade-in">
                Web Development & Technical Solutions
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Building <span className="text-primary">Modern Web</span> Experiences
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Expert web development services specializing in responsive, high-performance applications that drive
                real business results.
              </p>
              <div
                className="flex flex-col gap-2 min-[400px]:flex-row pt-4 animate-fade-in"
                style={{ animationDelay: "300ms" }}
              >
                <Link href="/contact">
                  <Button size="lg" className="font-medium">
                    Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button size="lg" variant="outline" className="font-medium">
                    View My Work
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div
                className="relative w-full max-w-[500px] aspect-square animate-fade-in code-editor-container"
                style={{ animationDelay: "300ms" }}
              >
                {/* Code editor mockup */}
                <div className="absolute inset-0 rounded-lg border bg-card shadow-xl overflow-hidden">
                  <div className="h-10 bg-muted border-b flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="mx-auto font-mono text-xs text-muted-foreground flex items-center">
                      <span className="mr-2">awesome-component.tsx</span>
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="p-4 font-mono text-sm overflow-hidden">
                    <div className="text-muted-foreground">// Welcome to CodeWithToni</div>
                    <div className="mt-2">
                      <span className="text-blue-500">import</span> <span className="text-foreground">{"{"}</span>{" "}
                      <span className="text-amber-500">motion, AnimatePresence</span>{" "}
                      <span className="text-foreground">{"}"}</span> <span className="text-blue-500">from</span>{" "}
                      <span className="text-green-500">&apos;framer-motion&apos;</span>
                      <span className="text-foreground">;</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-blue-500">import</span>{" "}
                      <span className="text-amber-500">
                        {"{"} useState, useEffect {"}"}
                      </span>{" "}
                      <span className="text-blue-500">from</span>{" "}
                      <span className="text-green-500">&apos;react&apos;</span>
                      <span className="text-foreground">;</span>
                    </div>
                    <div className="mt-4">
                      <span className="text-purple-500">const</span>{" "}
                      <span className="text-amber-500">AwesomeComponent</span>{" "}
                      <span className="text-foreground">= () {"=>"}</span>{" "}
                      <span className="text-foreground">{`{`}</span>
                    </div>
                    <div className="mt-1 ml-4">
                      <span className="text-blue-500">const</span>{" "}
                      <span className="text-amber-500">[isAnimating, setIsAnimating]</span>{" "}
                      <span className="text-foreground">= useState(</span>
                      <span className="text-blue-500">false</span>
                      <span className="text-foreground">);</span>
                    </div>
                    <div className="mt-1 ml-4">
                      <span className="text-blue-500">const</span> <span className="text-amber-500">variants</span>{" "}
                      <span className="text-foreground">= {"{"}</span>
                    </div>
                    <div className="mt-1 ml-8">
                      <span className="text-amber-500">hidden:</span> <span className="text-foreground">{"{"}</span>{" "}
                      <span className="text-purple-500">opacity:</span> <span className="text-blue-500">0</span>
                      <span className="text-foreground">, </span>
                      <span className="text-purple-500">y:</span> <span className="text-blue-500">20</span>{" "}
                      <span className="text-foreground">{"}"}</span>
                      <span className="text-foreground">,</span>
                    </div>
                    <div className="mt-1 ml-8">
                      <span className="text-amber-500">visible:</span> <span className="text-foreground">{"{"}</span>{" "}
                      <span className="text-purple-500">opacity:</span> <span className="text-blue-500">1</span>
                      <span className="text-foreground">, </span>
                      <span className="text-purple-500">y:</span> <span className="text-blue-500">0</span>{" "}
                      <span className="text-foreground">{"}"}</span>
                    </div>
                    <div className="mt-1 ml-4">
                      <span className="text-foreground">{"}"};</span>
                    </div>
                    <div className="mt-3 ml-4">
                      <span className="text-blue-500">return</span> <span className="text-foreground">(</span>
                    </div>
                    <div className="mt-1 ml-8">
                      <span className="text-foreground">{"<"}</span>
                      <span className="text-amber-500">motion.div</span>
                      <span className="text-purple-500"> initial</span>
                      <span className="text-foreground">=&lbrace;</span>
                      <span className="text-amber-500">"hidden"</span>
                      <span className="text-foreground">&rbrace;</span>
                    </div>
                    <div className="mt-1 ml-8">
                      <span className="text-purple-500"> animate</span>
                      <span className="text-foreground">=&lbrace;</span>
                      <span className="text-amber-500">"visible"</span>
                      <span className="text-foreground">&rbrace;</span>
                    </div>
                    <div className="mt-1 ml-8">
                      <span className="text-purple-500"> variants</span>
                      <span className="text-foreground">=&lbrace;variants&rbrace;</span>
                      <span className="text-foreground">{">"}</span>
                    </div>
                    <div className="mt-1 ml-12">
                      <span className="text-foreground">{"<"}</span>
                      <span className="text-amber-500">h1</span>
                      <span className="text-foreground">{">"}</span>
                      <span className="text-green-500">Build something amazing!</span>
                      <span className="text-foreground">{"</"}</span>
                      <span className="text-amber-500">h1</span>
                      <span className="text-foreground">{">"}</span>
                    </div>
                    <div className="mt-1 ml-8">
                      <span className="text-foreground">{"</"}</span>
                      <span className="text-amber-500">motion.div</span>
                      <span className="text-foreground">{">"}</span>
                    </div>
                    <div className="mt-1 ml-4">
                      <span className="text-foreground">);</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-foreground">{"}"};</span>
                    </div>
                    <div className="mt-4">
                      <span className="text-blue-500">export</span> <span className="text-blue-500">default</span>{" "}
                      <span className="text-amber-500">AwesomeComponent</span>
                      <span className="text-foreground">;</span>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center">
                      <div className="text-xs text-primary animate-pulse">
                        // Crafting digital experiences with code
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { value: "100+", label: "Projects Completed" },
              { value: "50+", label: "Happy Clients" },
              { value: "5+", label: "Years Experience" },
              { value: "15+", label: "Technologies" },
            ].map((stat, index) => (
              <ScrollAnimationObserver key={index} animation="fade-up" delay={index * 100}>
                <div className="flex flex-col items-center text-center p-4">
                  <span className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</span>
                  <span className="text-sm md:text-base text-muted-foreground mt-2">{stat.label}</span>
                </div>
              </ScrollAnimationObserver>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <ScrollAnimationObserver animation="fade-up">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Services
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Expert <span className="gradient-text">Solutions</span> for Your Digital Needs
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Comprehensive development and consulting services to bring your digital vision to life
              </p>
            </div>
          </ScrollAnimationObserver>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Layout className="h-10 w-10 text-primary" />,
                title: "Web Development",
                description: "Creating responsive, performant websites and web applications using modern technologies.",
              },
              {
                icon: <Code className="h-10 w-10 text-primary" />,
                title: "Frontend Engineering",
                description:
                  "Building intuitive user interfaces with React, Next.js, and other cutting-edge frameworks.",
              },
              {
                icon: <Database className="h-10 w-10 text-primary" />,
                title: "Backend Development",
                description: "Developing robust server-side applications and APIs to power your digital products.",
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Performance Optimization",
                description: "Enhancing application speed and efficiency for better user experience.",
              },
              {
                icon: <Globe className="h-10 w-10 text-primary" />,
                title: "API Development",
                description: "Building robust and well-documented APIs for seamless integration.",
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-primary" />,
                title: "Technical Consultation",
                description: "Expert advice on technology stack selection and implementation strategies.",
              },
            ].map((service, index) => (
              <ScrollAnimationObserver key={index} animation="fade-up" delay={index * 100}>
                <AnimatedCard className="h-full">
                  <AnimatedCardHeader>
                    <div className="p-2 rounded-full bg-primary/10 w-fit mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </AnimatedCardHeader>
                  <AnimatedCardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </AnimatedCardContent>
                </AnimatedCard>
              </ScrollAnimationObserver>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <AnimatedGradientBackground className="py-16 md:py-24" subtle={true}>
        <div className="container px-4 md:px-6">
          <ScrollAnimationObserver animation="fade-up">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Portfolio
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured <span className="text-primary">Projects</span>
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                A selection of my best work across various industries and technologies
              </p>
            </div>
          </ScrollAnimationObserver>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ScrollAnimationObserver key={index} animation="fade-up" delay={index * 100}>
                <AnimatedCard className="overflow-hidden group">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <AnimatedCardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <div className="text-muted-foreground text-sm mb-4 line-clamp-4" dangerouslySetInnerHTML={{ __html: project.content }}></div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="font-normal">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </AnimatedCardContent>
                  <AnimatedCardFooter className="px-6 pb-6 pt-0">
                    <Link
                      href={project.link}
                      className="text-sm font-medium flex items-center text-primary hover:underline"
                    >
                      View Project <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </AnimatedCardFooter>
                </AnimatedCard>
              </ScrollAnimationObserver>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/projects">
              <Button variant="outline" size="lg" className="group">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedGradientBackground>

      {/* Featured Templates Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <ScrollAnimationObserver animation="fade-up">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Templates
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready-to-Use <span className="gradient-text">Templates</span>
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Download professionally designed templates to jumpstart your next project
              </p>
            </div>
          </ScrollAnimationObserver>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <ScrollAnimationObserver key={index} animation="fade-up" delay={index * 100}>
                <AnimatedCard className="overflow-hidden group">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={template.imageUrl || "/placeholder.svg"}
                      alt={template.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <AnimatedCardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{template.name}</h3>
                      <Badge variant="outline" className="font-normal">
                        {template.category}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground text-sm mb-4 line-clamp-4" dangerouslySetInnerHTML={{__html:template.content}}></div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Download className="h-4 w-4 mr-1" />
                      <span>{template.downloads.toLocaleString()} downloads</span>
                    </div>
                  </AnimatedCardContent>
                  <AnimatedCardFooter className="px-6 pb-6 pt-0">
                    <Link href={template.previewLink}>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        View Template
                      </Button>
                    </Link>
                  </AnimatedCardFooter>
                </AnimatedCard>
              </ScrollAnimationObserver>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/web-templates">
              <Button variant="outline" size="lg" className="group">
                Browse All Templates
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <ScrollAnimationObserver animation="fade-up">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Clients <span className="gradient-text">Say</span>
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Hear from the people who have worked with me
              </p>
            </div>
          </ScrollAnimationObserver>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimationObserver key={index} animation="fade-up" delay={index * 100}>
                <AnimatedCard className="h-full">
                  <AnimatedCardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="inline-block h-5 w-5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic mb-6 flex-grow">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </AnimatedCardContent>
                </AnimatedCard>
              </ScrollAnimationObserver>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
            <ScrollAnimationObserver animation="fade-up">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Start Your Project?</h2>
              <p className="text-primary-foreground/80 md:text-xl">
                Let's discuss your requirements and create a solution that exceeds your expectations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                <AnimatedButton size="lg" variant="secondary" className="font-medium">
                  Get a Quote
                </AnimatedButton>
                <AnimatedButton
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-white hover:bg-primary-foreground/10 font-medium"
                >
                  View My Work
                </AnimatedButton>
              </div>
            </ScrollAnimationObserver>
          </div>
        </div>
      </section>
    </div>
  )
}

