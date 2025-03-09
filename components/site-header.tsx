"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteLogo } from "@/components/site-logo"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()
  const user = session?.user

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

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-16 z-50 bg-background transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <nav className="container flex flex-col gap-6 p-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium transition-colors hover:text-primary py-2 border-b"
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
                className="text-lg font-medium transition-colors hover:text-primary py-2 border-b"
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
    </header>
  )
}

