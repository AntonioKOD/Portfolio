'use server'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createTemplate= async(formData: FormData) => {
    // Create a new template
    const template = await prisma.template.create({
        data: {
            name: formData.get("name") as string,
            content: formData.get("content") as string,
            install: formData.get("install") as string,
            icon: formData.get("icon") as string,
            features: (formData.get("features") as string).split(",") || [],
            tags: (formData.get("tags") as string).split(",") || [],
            ImageUrl: formData.get("image") as string,
            previewLink: formData.get("preview") as string


        }
    })
    return template
    
}