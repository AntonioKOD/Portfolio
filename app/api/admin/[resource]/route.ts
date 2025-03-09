import { type NextRequest, NextResponse } from "next/server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


// GET handler for fetching resources
export async function GET(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params
  const searchParams = request.nextUrl.searchParams

  // Handle pagination
  const page = Number.parseInt(searchParams.get("page") || "1")
  const perPage = Number.parseInt(searchParams.get("perPage") || "10")
  const skip = (page - 1) * perPage

  // Handle sorting
  const sortField = searchParams.get("sortField") || "id"
  const sortOrder = searchParams.get("sortOrder") || "asc"

  // Handle filtering
  const filter = searchParams.get("filter") ? JSON.parse(searchParams.get("filter") || "{}") : {}

  try {
    // Get the appropriate Prisma model based on the resource
    const model = getModelForResource(resource)
    if (!model) {
      return NextResponse.json({ error: `Resource ${resource} not found` }, { status: 404 })
    }

    // Count total records for pagination
    const total = await (model as any).count({ where: filter })

    // Fetch data with pagination, sorting, and filtering
    const data = await (model as any).findMany({
      skip,
      take: perPage,
      orderBy: { [sortField]: sortOrder.toLowerCase() },
      where: filter,
    })

    return NextResponse.json({ data, total })
  } catch (error) {
    console.error(`Error fetching ${resource}:`, error)
    const errorMessage = (error as Error).message;
    return NextResponse.json({ error: `Failed to fetch ${resource}: ${errorMessage}` }, { status: 500 })
  }
}

// POST handler for creating resources
export async function POST(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params
  const data = await request.json()

  try {
    console.log(`Creating ${resource} with data:`, data)

    const model = getModelForResource(resource)
    if (!model) {
      return NextResponse.json({ error: `Resource ${resource} not found` }, { status: 404 })
    }

    // For debugging
    console.log(`Model for ${resource}:`, model ? "Found" : "Not found")

    const result = await (model as any).create({ data })
    console.log(`Created ${resource}:`, result)

    return NextResponse.json(result)
  } catch (error) {
    console.error(`Error creating ${resource}:`, error)
    const errorMessage = (error as Error).message;
    return NextResponse.json({ error: `Failed to create ${resource}: ${errorMessage}` }, { status: 500 })
  }
}

// Helper function to get the appropriate Prisma model
function getModelForResource(resource: string) {
  console.log(`Getting model for resource: ${resource}`)

  try {
    switch (resource) {
      case "templates":
        return prisma.template
      case "posts":
        return prisma.post
      case "users":
        return prisma.user
      case "projects":
        return prisma.project
      default:
        console.error(`Unknown resource: ${resource}`)
        return null
    }
  } catch (error) {
    console.error(`Error getting model for ${resource}:`, error)
    return null
  }
}

