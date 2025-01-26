import Link from "next/link"
import { client } from "@/lib/sanity"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { SanityDocument } from "next-sanity"
import { CalendarIcon, ArrowRightIcon } from "lucide-react"

const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
] | order(publishedAt desc)[0...12] {
  _id, title, slug, publishedAt, excerpt
}`

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BlogPage() {
  let posts: SanityDocument[] = []

  try {
    posts = await client.fetch(POSTS_QUERY)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-8 text-primary">Blog</h1>
        <p className="text-xl text-red-500">Error fetching blog posts. Please try again later.</p>
      </div>
    )
  }

  if (!posts.length) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-8 text-primary">Blog</h1>
        <p className="text-xl text-gray-500">No blog posts available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-primary">Our Blog</h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our latest thoughts, ideas, and insights on various topics.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post._id} className="flex flex-col hover:shadow-xl transition-shadow duration-300 bg-white">
              <CardHeader className="flex-grow">
                <CardTitle className="text-2xl font-semibold text-gray-800 hover:text-primary transition-colors duration-200">
                  <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/blog/${post.slug.current}`} className="w-full">
                  <Button variant="default" className="w-full group">
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