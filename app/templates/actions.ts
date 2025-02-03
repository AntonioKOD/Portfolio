'use server'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getTemplates = async() => {
    const templates = await prisma.template.findMany()
    return templates
}

export const getTemplate = async(id: string) => {
    const template = await prisma.template.findUnique({
        where: {
            id
        }
    })
    return template
}

export const deleteTemplate = async(id: string) => {
    const template = await prisma.template.delete({
        where: {
            id
        }
    })
    return template
}

export const updateTemplate = async(id: string, formData: FormData) => {
    const template = await prisma.template.update({
    where: {
        id
    },
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