"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteLogo } from "@/components/site-logo"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()
  const user = session?.user
  const pathname = usePathname()

  // Check if the current path is an admin route
  const isAdminRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/admin-dashboard")

  // If we're on an admin route, don't render the header
  if (isAdminRoute) {
    return null
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  // Navigation links that are shown to all users
  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]

  // Navigation links that are only shown to authenticated users
  const authLinks = [{ href: "/templates", label: "Templates" }]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <SiteLogo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}

          {/* Show Templates link only for authenticated users */}
          {user &&
            authLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <Button onClick={handleSignOut} className="hidden md:flex">
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button className="hidden md:flex">Login</Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation - hidden by default, only shown when menu button is clicked */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 transition-all duration-300 ease-in-out">
          {/* Solid background with no transparency */}
          <div className="absolute inset-0 bg-background shadow-lg">

          <nav className="container relative z-10 flex flex-col gap-6 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium transition-colors hover:text-primary py-2 border-b border-border/30"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Show Templates link only for authenticated users */}
            {user &&
              authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium transition-colors hover:text-primary py-2 border-b border-border/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

            {user ? (
              <Button onClick={handleSignOut} className="mt-4 w-full">
                Logout
              </Button>
            ) : (
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="mt-4 w-full">Login</Button>
              </Link>
            )}
          </nav>
        </div>
        </div>
      )}
    </header>
  )
}


