// Utility functions for prefetching data and resources

import { cache } from "react"
import { getProjects } from "@/app/projects/actions"
import { getTemplates } from "@/app/templates/actions"

// Cache the data fetching functions using React cache()
export const prefetchProjects = cache(async () => {
  return await getProjects()
})

export const prefetchFeaturedProjects = cache(async () => {
  return await getProjects({ featured: true })
})

export const prefetchTemplates = cache(async () => {
  return await getTemplates()
})

// Function to prefetch multiple resources at once
export async function prefetchResources() {
  // Prefetch in parallel
  const results = await Promise.allSettled([prefetchProjects(), prefetchTemplates(), prefetchFeaturedProjects()])

  // Log any errors but don't fail
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`Failed to prefetch resource ${index}:`, result.reason)
    }
  })

  return results
}

