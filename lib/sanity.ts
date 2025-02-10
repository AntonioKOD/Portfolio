import { createClient } from "next-sanity"

export const config = {
  projectId: process.env.SANITY_API_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
}

export const client = createClient(config)
