import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { GoogleAnalytics } from "@next/third-parties/google"
import SessionProviderWrapper from "@/components/SessionProviderWrapper"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"
import ClientRootLayout from "@/components/client-root-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "CodeWithToni | Web Development & Technical Solutions",
    template: "%s | CodeWithToni",
  },
  description:
    "Expert web development services specializing in modern, responsive websites and applications. Building the digital backbone for your business.",
  keywords: "web development, frontend development, backend development, React, Next.js, full-stack developer",
  metadataBase: new URL("https://codewithtoni.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codewithtoni.com",
    siteName: "CodeWithToni",
    title: "CodeWithToni | Web Development & Technical Solutions",
    description: "Expert web development services specializing in modern, responsive websites and applications.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "CodeWithToni",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeWithToni | Web Development & Technical Solutions",
    description: "Expert web development services specializing in modern, responsive websites and applications.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetching */}
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
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
           <ClientRootLayout>
            <main className="min-h-screen">{children}</main>
            </ClientRootLayout>
            
            <GoogleAnalytics gaId="G-D9B66HCXSY" />
          </SessionProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

