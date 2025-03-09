"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { prefetchResources } from "@/lib/prefetch"

interface PrefetchBoundaryProps {
  children: React.ReactNode
}

export default function PrefetchBoundary({ children }: PrefetchBoundaryProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [prefetched, setPrefetched] = useState<Set<string>>(new Set())

  // Prefetch all main routes on initial load
  useEffect(() => {
    const prefetchRoutes = async () => {
      // Prefetch main routes
      const routes = ["/projects", "/templates", "/blog", "/services", "/skills", "/contact"]

      routes.forEach((route) => {
        if (!prefetched.has(route)) {
          router.prefetch(route)
          setPrefetched((prev) => new Set(prev).add(route))
        }
      })

      // Prefetch data
      try {
        await prefetchResources()
      } catch (error) {
        console.error("Error prefetching resources:", error)
      }
    }

    prefetchRoutes()
  }, [router, prefetched])

  // Prefetch linked routes when hovering over links
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (link && link.href && link.href.startsWith(window.location.origin)) {
        const path = new URL(link.href).pathname
        if (!prefetched.has(path)) {
          router.prefetch(path)
          setPrefetched((prev) => new Set(prev).add(path))
        }
      }
    }

    document.addEventListener("mouseover", handleMouseEnter)
    return () => {
      document.removeEventListener("mouseover", handleMouseEnter)
    }
  }, [router, prefetched])

  return <>{children}</>
}

