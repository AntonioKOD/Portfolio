"use client"

import { usePathname } from "next/navigation"
import { SiteFooter } from "@/components/site-footer"

export default function AdminAwareFooter() {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/admin-dashboard")

  // Don't render footer on admin routes
  if (isAdminRoute) {
    return null
  }

  return <SiteFooter />
}

