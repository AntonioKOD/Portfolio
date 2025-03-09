"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowRight, Search, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import { Input } from "@/components/ui/input"
import { ProjectProcessIllustration } from "@/components/project-process-illustration"
import { getProjects, deleteProject, toggleProjectFeatured } from "./actions"
import { useSession } from "next-auth/react"
import { useDebounce } from "@/hooks/use-debounce"
import Link from "next/link"

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

export default function ProjectsPage() {
  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState("")
  const [projects, setProjects] = useState<Project[]>([])
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Use debounce to avoid making too many requests while typing
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const { data: session } = useSession()
  const user = session?.user
  const isAdmin = user?.email === "antonio_kodheli@icloud.com"

  // Fetch projects from the server with search parameters
  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true)
      try {
        console.log("Fetching projects with:", {
          searchTerm: debouncedSearchTerm,
        })

        // Fetch featured projects separately
        const featuredProjectsData = await getProjects({ featured: true })
        setFeaturedProjects(
          featuredProjectsData.map((project) => ({
            ...project,
            createdAt: project.createdAt.toISOString(),
            updatedAt: project.updatedAt.toISOString(),
          }))
        )

        // Fetch filtered projects
        const searchParams = {
          searchTerm: debouncedSearchTerm,
        }
        const filteredProjects = await getProjects(searchParams)
        console.log("Fetched projects:", filteredProjects.length)
        setProjects(
          filteredProjects.map((project) => ({
            ...project,
            createdAt: project.createdAt.toISOString(),
            updatedAt: project.updatedAt.toISOString(),
          }))
        )
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [debouncedSearchTerm])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Search term changed:", e.target.value)
    setSearchTerm(e.target.value)
  }

  // Handle project deletion (admin only)
  const handleDeleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id)
        // Update both lists after deletion
        setProjects(projects.filter((project) => project.id !== id))
        setFeaturedProjects(featuredProjects.filter((project) => project.id !== id))
      } catch (error) {
        console.error("Error deleting project:", error)
        alert("Failed to delete project. Please try again.")
      }
    }
  }

  // Handle toggling featured status (admin only)
  const handleToggleFeatured = async (id: string) => {
    try {
      const updatedProject = await toggleProjectFeatured(id)

      // Update both lists after toggling featured status
      if (updatedProject.featured) {
        // Add to featured if not already there
        if (!featuredProjects.some((p) => p.id === id)) {
          const project = projects.find((p) => p.id === id)
          if (project) {
            setFeaturedProjects([...featuredProjects, { ...project, featured: true }])
          }
        }
      } else {
        // Remove from featured
        setFeaturedProjects(featuredProjects.filter((p) => p.id !== id))
      }

      // Update in the main list
      setProjects(projects.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)))
    } catch (error) {
      console.error("Error toggling featured status:", error)
      alert("Failed to update project. Please try again.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              Portfolio
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              My <span className="text-primary">Projects</span>
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              A showcase of my work across various industries and technologies
            </p>

            {/* Search Bar */}
            <div className="max-w-md w-full mt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search projects..."
                  className="pl-10 pr-4"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Controls - Only visible to admin */}
      {isAdmin && (
        <section className="py-4 bg-yellow-500/10 border-y border-yellow-500/20">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Admin Controls</h2>
              <Link href="/projects/new">
                <Button variant="default">Add New Project</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4 mb-8">
              <h2 className="text-3xl font-bold tracking-tighter">Featured Projects</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Highlighted work that showcases my skills and expertise
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <div key={project.id} className="relative group">
                  {isAdmin && (
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex gap-2 bg-background/80 backdrop-blur-sm p-1 rounded-lg shadow-lg">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleFeatured(project.id)}
                          className="h-8 px-2 text-xs"
                        >
                          Unfeature
                        </Button>
                        <Link href={`/projects/edit/${project.id}`}>
                          <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteProject(project.id)}
                          className="h-8 px-2 text-xs"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                  <ProjectCard
                    image={project.imageUrl}
                    title={project.name}
                    description={project.content}
                    technologies={project.technologies}
                    link={`/projects/${project.id}`} category={""}                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start space-y-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tighter">All Projects</h2>
            <p className="text-gray-500 dark:text-gray-400">Browse my complete portfolio of work</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="relative group">
                  {isAdmin && (
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex gap-2 bg-background/80 backdrop-blur-sm p-1 rounded-lg shadow-lg">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleFeatured(project.id)}
                          className="h-8 px-2 text-xs"
                        >
                          {project.featured ? "Unfeature" : "Feature"}
                        </Button>
                        <Link href={`/projects/edit/${project.id}`}>
                          <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteProject(project.id)}
                          className="h-8 px-2 text-xs"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                  <ProjectCard
                    image={project.imageUrl}
                    title={project.name}
                    description={project.content}
                    technologies={project.technologies}
                    link={`/projects/${project.id}`} category={""}                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BarChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">We couldn't find any projects matching your search criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Project Process */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tighter mb-4">
              My Project <span className="text-primary">Approach</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I follow a structured methodology to ensure every project is delivered with quality, precision, and
              exceeds expectations.
            </p>
          </div>

          {/* Full-width illustration */}
          <div className="flex justify-center mb-12">
            <ProjectProcessIllustration width={900} height={400} className="w-full max-w-[900px]" />
          </div>

          {/* Process steps in a grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              {
                title: "Discovery",
                description: "Understanding your business needs, goals, and challenges to create a solid foundation.",
                icon: "🔍",
                color: "border-[#5eead4]",
                bgColor: "bg-[#5eead4]/10",
              },
              {
                title: "Planning",
                description: "Creating detailed specifications, wireframes, and project roadmap with clear milestones.",
                icon: "📝",
                color: "border-[#a855f7]",
                bgColor: "bg-[#a855f7]/10",
              },
              {
                title: "Development",
                description: "Building your solution with clean code, regular updates, and iterative improvements.",
                icon: "💻",
                color: "border-[#f59e0b]",
                bgColor: "bg-[#f59e0b]/10",
              },
              {
                title: "Deployment",
                description: "Thorough testing, seamless deployment, and ongoing support to ensure long-term success.",
                icon: "🚀",
                color: "border-[#3b82f6]",
                bgColor: "bg-[#3b82f6]/10",
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`${step.bgColor} p-6 rounded-lg border-l-4 ${step.color} shadow-md hover:shadow-lg transition-shadow`}
              >
                <div className="text-2xl mb-3">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button size="lg" className="font-medium">
              Start a Project <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Have a Project in Mind?</h2>
            <p className="text-primary-foreground/80 md:text-xl">
              Let's discuss how I can help bring your vision to life with the perfect technical solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" variant="secondary" className="font-medium">
                Contact Me
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-white hover:bg-primary-foreground/10 font-medium"
              >
                View Services
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

