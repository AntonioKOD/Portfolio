import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { GoogleAnalytics } from "@next/third-parties/google"
import SessionProviderWrapper from "@/components/SessionProviderWrapper"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CodeWithToni | Web Development & Technical Solutions",
  description:
    "Expert web development services specializing in modern, responsive websites and applications. Building the digital backbone for your business.",
  keywords: "web development, frontend development, backend development, React, Next.js, full-stack developer",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAdmin = typeof window !== 'undefined' && window.location.pathname === '/admin';
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {/* Wrap with SessionProviderWrapper which will gracefully handle missing NextAuth config */}
          <SessionProviderWrapper>
            {isAdmin ? (
              <div className="hidden md:block">
            <SiteHeader/>
            </div>
            ) : (
              <SiteHeader />
            )}
            <main className="min-h-screen">{children}</main>
            <SiteFooter />
            <GoogleAnalytics gaId="G-D9B66HCXSY" />
          </SessionProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

