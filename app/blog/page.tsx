import Link from "next/link"
import Image from "next/image"
import { client } from "@/lib/sanity"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollAnimationObserver } from "@/components/scroll-animation-observer"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import type { SanityDocument } from "next-sanity"
import { CalendarIcon, ArrowRightIcon, BookOpenIcon, TrendingUp, Bookmark } from "lucide-react"
import { config as sanityConfig } from "@/lib/sanity"
import BlogSearch from "@/components/blog-search"
import imageUrlBuilder from "@sanity/image-url"

const builder = imageUrlBuilder({
  ...sanityConfig,
  projectId: sanityConfig.projectId || "defaultProjectId"
})

const POSTS_QUERY = `*[
 _type == "post" && defined(slug.current)
 ${
   "" /*searchParams?.get("search") ? `&& (
   title match "*${searchParams.get("search")}*" || 
   excerpt match "*${searchParams.get("search")}*" ||
   pt::text(body) match "*${searchParams.get("search")}*"
 )` : ""*/
 }
] | order(publishedAt desc)[0...12] {
 _id, 
 title, 
 slug, 
 publishedAt, 
 excerpt, 
 estimatedReadingTime, 
 mainImage,
 categories[]->{ title }
}`

function urlFor(source: any) {
 return builder.image(source)
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BlogPage({ searchParams }: { searchParams?: Promise<{ search?: string }> }) {
  let posts: SanityDocument[] = []

  const searchQuery = (await searchParams)?.search

  const updatedPostsQuery = `*[
    _type == "post" && defined(slug.current)
    ${
      searchQuery
        ? `&& (
      title match "*${searchQuery}*" || 
      excerpt match "*${searchQuery}*" ||
      pt::text(body) match "*${searchQuery}*"
    )`
        : ""
    }
  ] | order(publishedAt desc)[0...12] {
    _id, 
    title, 
    slug, 
    publishedAt, 
    excerpt, 
    estimatedReadingTime, 
    mainImage,
    categories[]->{ title }
  }`

  try {
    posts = await client.fetch(updatedPostsQuery)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return <ErrorState />
  }

  if (!posts.length) {
    return <EmptyState />
  }

  const featuredPost = posts[0]
  const regularPosts = posts.slice(1)
  const featuredPostImageUrl = featuredPost?.mainImage ? urlFor(featuredPost.mainImage).url() : null

  // Get popular posts (for this demo, we'll just use posts 1-3)
  const popularPosts = posts.slice(0, 3)

  // Get unique categories for filtering
  const allCategories = posts.flatMap((post: any) =>
    post.categories ? post.categories.map((cat: any) => cat.title) : [],
  )
  const categories = ["All", ...Array.from(new Set(allCategories))]

  // Create JSON-LD structured data for the blog and its posts
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "CodeWithToni Blog",
    url: "https://www.codewithtoni.com/blog",
    description: "Explore my latest thoughts, ideas, and insights on various topics in web development and technology.",
    blogPost: posts.map((post: any) => ({
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: new Date(post.publishedAt).toISOString(),
      description: post.excerpt,
      url: `https://www.codewithtoni.com/blog/${post.slug.current}`,
      wordCount: post.estimatedReadingTime ? post.estimatedReadingTime * 200 : undefined,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }} />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-primary/5 to-background dark:from-primary/10 dark:to-background">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
          </div>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimationObserver animation="fade-up">
              <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary/20 bg-primary/5">
                Insights & Articles
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                CodeWithToni Blog
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Explore my latest thoughts, ideas, and insights on various topics in web development and technology.
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto relative">
                <BlogSearch />
              </div>
            </ScrollAnimationObserver>
          </div>
        </div>
      </section>

      <div className="container px-4 py-16">
        {/* Featured Post */}
        <ScrollAnimationObserver animation="fade-up">
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Featured Post</h2>
              <div className="ml-4 h-px bg-border flex-grow"></div>
            </div>

            <Card className="bg-card overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-square md:aspect-auto overflow-hidden">
                  <Image
                    src={featuredPostImageUrl || "/placeholder.svg?height=600&width=600"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-black/60 md:to-transparent" />
                  <div className="absolute bottom-4 left-4 md:hidden">
                    <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                  </div>
                </div>

                <div className="p-8 flex flex-col">
                  <div className="hidden md:block mb-4">
                    <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary hover:text-primary/80 transition-colors">
                    <Link href={`/blog/${featuredPost.slug.current}`}>{featuredPost.title}</Link>
                  </h3>

                  <p className="text-muted-foreground mb-6 flex-grow">{featuredPost.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.categories?.map((category: any, index: number) => (
                      <Badge key={index} variant="secondary" className="font-normal">
                        {category.title}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <time dateTime={featuredPost.publishedAt}>
                        {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <div className="flex items-center">
                      <BookOpenIcon className="w-4 h-4 mr-2" />
                      <span>{featuredPost.estimatedReadingTime || 5} min read</span>
                    </div>
                  </div>

                  <Link href={`/blog/${featuredPost.slug.current}`} className="w-full">
                    <Button variant="default" className="w-full group">
                      Read Featured Post
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </ScrollAnimationObserver>

        {/* Popular Posts */}
        <ScrollAnimationObserver animation="fade-up" delay={100}>
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Popular Posts
              </h2>
              <div className="ml-4 h-px bg-border flex-grow"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {popularPosts.map((post, index) => (
                <Card
                  key={post._id}
                  className="bg-card border-none shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={(post?.mainImage ? urlFor(post.mainImage).url() : null ) || `/placeholder.svg?height=300&width=500&text=Post+${index + 1}`}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg font-bold text-white line-clamp-2">
                        <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <div className="flex items-center">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                      <div className="flex items-center">
                        <BookOpenIcon className="w-3 h-3 mr-1" />
                        <span>{post.estimatedReadingTime || 5} min</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.categories?.slice(0, 2).map((category: any, index: number) => (
                        <Badge key={index} variant="outline" className="font-normal text-xs">
                          {category.title}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollAnimationObserver>

        {/* Posts with Categories */}
        <ScrollAnimationObserver animation="fade-up" delay={200}>
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center">
                <Bookmark className="w-5 h-5 mr-2 text-primary" />
                Latest Articles
              </h2>
              <div className="ml-4 h-px bg-border flex-grow"></div>
            </div>

            <Tabs defaultValue="All" className="w-full mb-8">
              <div className="flex justify-center mb-8 overflow-x-auto">
                <TabsList className="bg-muted/50 p-1">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category} className="px-4 py-2">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {regularPosts
                      .filter(
                        (post: any) =>
                          category === "All" ||
                          (post.categories && post.categories.some((cat: any) => cat.title === category)),
                      )
                      .map((post, index) => (
                        <ScrollAnimationObserver key={post._id} animation="fade-up" delay={index * 100}>
                          <Card className="flex flex-col bg-card border-none shadow-md hover:shadow-lg transition-all duration-300 h-full overflow-hidden">
                            <div className="relative aspect-video overflow-hidden">
                              <Image
                                src={
                                  (post?.mainImage ? urlFor(post.mainImage).url() : null ) || `/placeholder.svg?height=300&width=500&text=Post+${index + 1}`
                                }
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute top-3 right-3">
                                {post.categories?.slice(0, 1).map((category: any, index: number) => (
                                  <Badge key={index} className="bg-primary/80 text-white backdrop-blur-sm">
                                    {category.title}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <CardHeader className="p-5 pb-0">
                              <CardTitle className="text-xl font-bold text-primary hover:text-primary/80 transition-colors duration-200 line-clamp-2">
                                <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                              </CardTitle>
                            </CardHeader>

                            <CardContent className="p-5 pt-3 flex-grow">
                              <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <CalendarIcon className="w-4 h-4 mr-2" />
                                  <time dateTime={post.publishedAt}>
                                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </time>
                                </div>
                                <div className="flex items-center">
                                  <BookOpenIcon className="w-4 h-4 mr-2" />
                                  <span>{post.estimatedReadingTime || 5} min read</span>
                                </div>
                              </div>
                            </CardContent>

                            <CardFooter className="p-5 pt-0">
                              <Link href={`/blog/${post.slug.current}`} className="w-full">
                                <Button variant="outline" className="w-full group">
                                  Read Article
                                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                                </Button>
                              </Link>
                            </CardFooter>
                          </Card>
                        </ScrollAnimationObserver>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </ScrollAnimationObserver>
      </div>
    </>
  )
}

function ErrorState() {
  return (
    <AnimatedGradientBackground subtle={true} className="min-h-screen flex items-center justify-center">
      <div className="container px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-8 text-primary">Blog</h1>
        <Card className="max-w-lg mx-auto border-none shadow-lg">
          <CardContent className="pt-6">
            <div className="text-destructive mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-4"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-xl font-medium">Error fetching blog posts</p>
            </div>
            <p className="text-muted-foreground mb-6">
              We're having trouble loading the blog posts. Please try again later or contact support if the problem
              persists.
            </p>
            <Button variant="outline" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AnimatedGradientBackground>
  )
}

function EmptyState() {
  return (
    <AnimatedGradientBackground subtle={true} className="min-h-screen flex items-center justify-center">
      <div className="container px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-8 text-primary">Blog</h1>
        <Card className="max-w-lg mx-auto border-none shadow-lg">
          <CardContent className="pt-6">
            <div className="text-muted-foreground mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-4"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <p className="text-xl font-medium">No blog posts available</p>
            </div>
            <p className="text-muted-foreground mb-6">
              We're working on creating amazing content for you. Check back soon for new articles!
            </p>
            <Button variant="outline" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AnimatedGradientBackground>
  )
}

