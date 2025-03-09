"use client"

import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"

export default function AdminAwareHeader() {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/admin-dashboard")

  // Don't render header on admin routes
  if (isAdminRoute) {
    return null
  }

  return <SiteHeader />
}

