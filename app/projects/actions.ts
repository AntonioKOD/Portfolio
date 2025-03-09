"use server"

import { revalidatePath } from "next/cache"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Interface for project data
interface ProjectData {
  name: string
  content: string
  imageUrl: string
  link?: string
  technologies: string[]
  featured?: boolean
}

/**
 * Get all projects with optional filtering
 */
export async function getProjects(searchParams?: {
  searchTerm?: string
  featured?: boolean
}) {
  try {
    console.log("Server received project search params:", searchParams)

    // Build the where clause for Prisma
    const where: any = {}

    // Add search term filter if provided
    if (searchParams?.searchTerm) {
      where.OR = [
        { name: { contains: searchParams.searchTerm, mode: "insensitive" } },
        { content: { contains: searchParams.searchTerm, mode: "insensitive" } },
      ]
    }

    // Add featured filter if provided
    if (searchParams?.featured !== undefined) {
      where.featured = searchParams.featured
    }

    console.log("Prisma where clause for projects:", where)

    // Query the database with the filters
    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    console.log(`Found ${projects.length} projects`)

    return projects
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

/**
 * Get a single project by ID
 */
export async function getProjectById(id: string) {
  try {
    console.log(`Fetching project with ID: ${id}`)

    const project = await prisma.project.findUnique({
      where: { id },
    })

    if (!project) {
      console.log(`Project with ID ${id} not found`)
      return null
    }

    return project
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error)
    return null
  }
}

/**
 * Create a new project
 */
export async function createProject(projectData: ProjectData) {
  try {
    console.log("Creating new project:", projectData)

    const newProject = await prisma.project.create({
      data: {
        ...projectData,
        link: projectData.link ?? "",
      },
    })

    console.log("Created new project:", newProject.id)

    // Revalidate the projects page
    revalidatePath("/projects")

    return newProject
  } catch (error) {
    console.error("Error creating project:", error)
    throw error
  }
}

/**
 * Update an existing project
 */
export async function updateProject(id: string, projectData: ProjectData) {
  try {
    console.log(`Updating project with ID ${id}:`, projectData)

    const updatedProject = await prisma.project.update({
      where: { id },
      data: projectData,
    })

    console.log(`Updated project with ID ${id}`)

    // Revalidate the projects page
    revalidatePath("/projects")
    revalidatePath(`/projects/${id}`)

    return updatedProject
  } catch (error) {
    console.error(`Error updating project with ID ${id}:`, error)
    throw error
  }
}

/**
 * Delete a project
 */
export async function deleteProject(id: string) {
  try {
    console.log(`Deleting project with ID ${id}`)

    await prisma.project.delete({
      where: { id },
    })

    console.log(`Deleted project with ID ${id}`)

    // Revalidate the projects page
    revalidatePath("/projects")

    return true
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error)
    throw error
  }
}

/**
 * Toggle the featured status of a project
 */
export async function toggleProjectFeatured(id: string) {
  try {
    // Get the current project
    const project = await prisma.project.findUnique({
      where: { id },
    })

    if (!project) {
      throw new Error(`Project with ID ${id} not found`)
    }

    // Toggle the featured status
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        featured: !project.featured,
      },
    })

    console.log(`Toggled featured status for project ${id} to ${updatedProject.featured}`)

    // Revalidate the projects page
    revalidatePath("/projects")

    return updatedProject
  } catch (error) {
    console.error(`Error toggling featured status for project ${id}:`, error)
    throw error
  }
}

