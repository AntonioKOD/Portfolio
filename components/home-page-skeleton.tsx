export default function HomePageSkeleton() {
    return (
      <div className="flex flex-col">
        {/* Hero Section Skeleton */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-background">
          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="h-8 w-48 bg-primary/10 rounded-full animate-pulse"></div>
                <div className="h-12 w-full max-w-md bg-muted animate-pulse rounded"></div>
                <div className="h-12 w-3/4 bg-muted animate-pulse rounded"></div>
                <div className="h-24 w-full max-w-md bg-muted animate-pulse rounded"></div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                  <div className="h-12 w-36 bg-primary animate-pulse rounded"></div>
                  <div className="h-12 w-36 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-square bg-muted animate-pulse rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Stats Section Skeleton */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center text-center p-4">
                  <div className="h-8 w-16 bg-primary/30 animate-pulse rounded mb-2"></div>
                  <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Services Section Skeleton */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="h-8 w-32 bg-primary/10 animate-pulse rounded-full"></div>
              <div className="h-10 w-64 bg-muted animate-pulse rounded"></div>
              <div className="h-16 w-full max-w-md bg-muted animate-pulse rounded"></div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }
  
  