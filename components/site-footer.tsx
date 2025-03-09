import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { SiteLogo } from "@/components/site-logo"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <SiteLogo textSize="lg" animated={false} />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Designing and coding beautifully simple things. Providing smart solutions that enhance performance, engage
              customers, and foster growth.
            </p>
            <div className="flex mt-6 space-x-4">
              <Link href="https://twitter.com/antonio_kodheli" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://github.com/AntonioKOD" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://www.linkedin.com/in/antonio-kodheli-1430aa290/" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="mailto:antonio_kodheli@icloud.com" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium">Navigation</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-primary">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-muted-foreground hover:text-primary">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="text-muted-foreground">antonio_kodheli@icloud.com</li>
              <li className="text-muted-foreground">Boston, MA</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {"{"}codeWithToni{"}"} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

