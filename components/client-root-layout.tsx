"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { GoogleAnalytics } from "@next/third-parties/google"


export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/admin")

  return (
    <>
      {/* Only render header if not on admin routes */}
      {!isAdminRoute && <SiteHeader />}

      {/* Main content */}
      <main className="min-h-screen">{children}</main>

      {/* Only render footer if not on admin routes */}
      {!isAdminRoute && <SiteFooter />}

      {/* Analytics */}
      <GoogleAnalytics gaId="G-D9B66HCXSY" />
    </>
  )
}

