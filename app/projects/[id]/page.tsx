"use client"

import { useState, useEffect } from "react"
import { getProjectById } from "../actions"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"

interface Project {
  id: string
  name: string
  content: string
  technologies: string[]
  imageUrl: string
  link?: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { data: session } = useSession()
  const isAdmin = session?.user?.email === "antonio_kodheli@icloud.com"

  useEffect(() => {
    async function fetchProject() {
      try {
        setIsLoading(true)
        const projectData = await getProjectById(params.id)
        if (projectData) {
          setProject({
            id: projectData.id,
            name: projectData.name,
            content: projectData.content,
            technologies: projectData.technologies,
            imageUrl: projectData.imageUrl,
            link: projectData.link,
            featured: projectData.featured,
            createdAt: projectData.createdAt.toISOString(),
            updatedAt: projectData.updatedAt.toISOString(),
          })
        }
      } catch (error) {
        console.error("Error fetching project:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen py-24 bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen py-24 bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/projects">
              <Button>Back to Projects</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-24 bg-muted/10">
      <div className="container px-4 md:px-6">
        {/* Admin Controls */}
        {isAdmin && (
          <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Admin Controls</h2>
              <div className="flex gap-2">
                <Link href={`/projects/edit/${project.id}`}>
                  <Button variant="outline">Edit Project</Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mb-8">
          <Link href="/projects" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                Last updated:{" "}
                {new Date(project.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="font-normal">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project Image */}
        <div className="mb-12 relative aspect-video rounded-lg overflow-hidden shadow-lg">
          <Image
            src={project.imageUrl || "/placeholder.svg?height=600&width=1200"}
            alt={project.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
            <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: project.content }} />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold mb-6">Project Details</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="font-normal">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {project.link && (
                  <div className="pt-4">
                    <Button className="w-full" onClick={() => window.open(project.link, "_blank")}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live Project
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects - Placeholder for future implementation */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>

        {/* CTA Section */}
        <div className="rounded-xl overflow-hidden">
          <div className="relative bg-primary py-12 px-6">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-white">Need a Similar Project?</h2>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                Let's discuss how I can help bring your vision to life with the perfect technical solution.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="secondary" size="lg" className="font-medium">
                    Contact Me
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-white/20 text-white hover:bg-white/10 font-medium"
                  >
                    View Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

