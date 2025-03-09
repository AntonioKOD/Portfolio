"use server"

import { revalidatePath } from "next/cache"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()
export async function getTemplates(searchParams?: {
  searchTerm?: string
  category?: string
}) {
  try {
    // Build the where clause for Prisma
    const where: any = {}

    // Add search term filter if provided
    if (searchParams?.searchTerm) {
      where.OR = [
        { name: { contains: searchParams.searchTerm, mode: "insensitive" } },
        { content: { contains: searchParams.searchTerm, mode: "insensitive" } },
      ]
    }

    // Add category filter if provided and not "All"
    if (searchParams?.category && searchParams.category !== "All") {
      where.category = searchParams.category
    }

    // Query the database with the filters
    const templates = await prisma.template.findMany({
      where,
      orderBy: { createdAt: "desc" }, // Use createdAt instead of publishedAt
    })

    return templates
  } catch (error) {
    console.error("Error fetching templates:", error)
    // Return empty array in case of error
    return []
  }
}

export async function getTemplateById(id: string) {
  try {
    const template = await prisma.template.findFirst({
      where: { id },
    })
    return template
  } catch (error) {
    console.error(`Error fetching template with id ${id}:`, error)
    return null
  }
}

export async function createTemplate(template: any) {
  try {
    const newTemplate = await prisma.template.create({
      data: {
        ...template,
        // No need to set publishedAt as createdAt is handled automatically by Prisma
      },
    })

    revalidatePath("/templates")
    return newTemplate
  } catch (error) {
    console.error("Error creating template:", error)
    throw error
  }
}

export async function updateTemplate(id: string, template: any) {
  try {
    const updatedTemplate = await prisma.template.update({
      where: { id },
      data: template,
    })

    revalidatePath("/templates")
    return updatedTemplate
  } catch (error) {
    console.error(`Error updating template with id ${id}:`, error)
    throw error
  }
}

export async function deleteTemplate(id: string) {
  try {
    await prisma.template.delete({
      where: { id },
    })

    revalidatePath("/templates")
    return true
  } catch (error) {
    console.error(`Error deleting template with id ${id}:`, error)
    throw error
  }
}

