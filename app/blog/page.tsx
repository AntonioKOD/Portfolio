import Link from "next/link"
import { client } from "@/lib/sanity"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { SanityDocument } from "next-sanity"
import { CalendarIcon, ArrowRightIcon, BookOpenIcon } from "lucide-react"

const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
] | order(publishedAt desc)[0...12] {
  _id, title, slug, publishedAt, excerpt, estimatedReadingTime
}`

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BlogPage() {
  let posts: SanityDocument[] = []

  try {
    posts = await client.fetch(POSTS_QUERY)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return <ErrorState />
  }

  if (!posts.length) {
    return <EmptyState />
  }

  const featuredPost = posts[0]
  const regularPosts = posts.slice(1)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 mt-28">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-primary">Our Blog</h1>
        <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Explore my latest thoughts, ideas, and insights on various topics in web development and technology.
        </p>

        {/* Featured Post */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Featured Post</h2>
          <Card className="bg-card hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary hover:text-primary/80 transition-colors duration-200">
                <Link href={`/blog/${featuredPost.slug.current}`}>{featuredPost.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-lg">{featuredPost.excerpt}</p>
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
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
                  <span>{featuredPost.estimatedReadingTime} min read</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/blog/${featuredPost.slug.current}`} className="w-full">
                <Button variant="default" className="w-full group">
                  Read Featured Post
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Regular Posts */}
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Latest Posts</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post) => (
            <Card key={post._id} className="flex flex-col bg-card hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex-grow">
                <CardTitle className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors duration-200">
                  <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center text-sm text-muted-foreground space-x-4">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center">
                    <BookOpenIcon className="w-4 h-4 mr-2" />
                    <span>{post.estimatedReadingTime} min read</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/blog/${post.slug.current}`} className="w-full">
                  <Button variant="outline" className="w-full group">
                    Read More
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function ErrorState() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-8 text-primary">Blog</h1>
      <Card className="max-w-lg mx-auto">
        <CardContent className="pt-6">
          <p className="text-xl text-destructive mb-4">Error fetching blog posts. Please try again later.</p>
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-8 text-primary">Blog</h1>
      <Card className="max-w-lg mx-auto">
        <CardContent className="pt-6">
          <p className="text-xl text-muted-foreground mb-4">No blog posts available at the moment.</p>
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

