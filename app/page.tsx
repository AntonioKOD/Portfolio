import { Suspense } from "react"
import { prefetchResources } from "@/lib/prefetch"
import HomePage from "@/components/home-page"
import HomePageSkeleton from "@/components/home-page-skeleton"
import { ClientFriendlyIllustration } from "@/components/client-friendly-illustration"

// Prefetch data during page generation
export const generateMetadata = async () => {
  // This will trigger prefetching of resources
  await prefetchResources()

  return {
    title: "CodeWithToni | Web Development & Technical Solutions",
    description: "Expert web development services specializing in modern, responsive websites and applications.",
  }
}

export default function Page() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Client-Friendly Illustration */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-primary/5 to-background dark:from-primary/10 dark:to-background">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
          </div>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                Web Development & Technical Solutions
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Building <span className="text-primary">Digital Experiences</span> That Drive Results
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Expert web development services specializing in modern, responsive websites and applications that help
                your business grow.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <a
                  href="/contact"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Get Started
                </a>
                <a
                  href="/projects"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  View My Work
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <ClientFriendlyIllustration width={500} height={500} className="w-full max-w-[500px] h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the home page content */}
      <Suspense fallback={<HomePageSkeleton />}>
        <HomePage />
      </Suspense>
    </div>
  )
}

