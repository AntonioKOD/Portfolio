import Link from "next/link"
import type React from "react" // Added import for React

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold">
            codeWithToni
          </Link>
          <nav className="space-x-8">
            <Link href="/services" className="hover:text-gray-600">
              Services
            </Link>
            <Link href="/projects" className="hover:text-gray-600">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-gray-600">
              Contact
            </Link>
            <Link href="/skills" className="hover:text-gray-600">
              Skills
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

