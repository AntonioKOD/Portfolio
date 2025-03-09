import { type NextRequest, NextResponse } from "next/server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


// GET handler for fetching a single resource
export async function GET(request: NextRequest, { params }: { params: { resource: string; id: string } }) {
  const { resource, id } = params

  try {
    const model = getModelForResource(resource)
    if (!model) {
      return NextResponse.json({ error: `Resource ${resource} not found` }, { status: 404 })
    }

    const data = await (model as any).findUnique({
      where: { id },
    })

    if (!data) {
      return NextResponse.json({ error: `${resource} with id ${id} not found` }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error fetching ${resource}:`, error)
    return NextResponse.json({ error: `Failed to fetch ${resource}: ${(error as any).message}` }, { status: 500 })
  }
}

// PUT handler for updating a resource
export async function PUT(request: NextRequest, { params }: { params: { resource: string; id: string } }) {
  const { resource, id } = params
  const data = await request.json()

  try {
    const model = getModelForResource(resource)
    if (!model) {
      return NextResponse.json({ error: `Resource ${resource} not found` }, { status: 404 })
    }

    const result = await (model as any).update({
      where: { id },
      data,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error(`Error updating ${resource}:`, error)
    return NextResponse.json({ error: `Failed to update ${resource}: ${(error as any).message}` }, { status: 500 })
  }
}

// DELETE handler for deleting a resource
export async function DELETE(request: NextRequest, { params }: { params: { resource: string; id: string } }) {
  const { resource, id } = params

  try {
    const model = getModelForResource(resource)
    if (!model) {
      return NextResponse.json({ error: `Resource ${resource} not found` }, { status: 404 })
    }

    const result = await (model as any).delete({
      where: { id },
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error(`Error deleting ${resource}:`, error)
    return NextResponse.json({ error: `Failed to delete ${resource}: ${(error as any).message}` }, { status: 500 })
  }
}

// Helper function to get the appropriate Prisma model
function getModelForResource(resource: string) {
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

