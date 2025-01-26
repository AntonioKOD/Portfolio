import Link from "next/link"
import { PortableText, type SanityDocument } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { client } from "@/lib/sanity"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{ title, author->{name}, publishedAt, body, image }`

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null

const options = { next: { revalidate: 30 } }

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, params, options)
  const postImageUrl = post.image ? urlFor(post.image)?.width(1200).height(600).url() : null

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        {/* Back to posts button */}
        <Link href="/blog" className="inline-block mb-8">
          <Button
            variant="ghost"
            className="text-base sm:text-lg flex items-center gap-2 hover:bg-gray-100 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>
        </Link>

        {/* Blog Post Card */}
        <Card className="shadow-xl overflow-hidden bg-white">
          {postImageUrl ? (
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[28rem]">
              <img
                src={postImageUrl || "/placeholder.svg"}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-64 sm:h-80 md:h-96 lg:h-[28rem] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-lg">No image available</span>
            </div>
          )}

          <CardHeader className="p-6 sm:p-8 lg:p-10">
            {/* Author Information */}
            <div className="flex items-center mb-4">
              <div>
                <p className="text-sm sm:text-base font-semibold text-gray-700">
                  {post.author?.name || "Unknown Author"}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Published on{" "}
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Post Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-4">{post.title}</h1>
          </CardHeader>

          <CardContent className="prose prose-lg max-w-none px-6 sm:px-8 lg:px-10 pb-8 sm:pb-10 lg:pb-12">
            {Array.isArray(post.body) ? (
              <PortableText value={post.body} />
            ) : (
              <p className="text-gray-600 italic">No content available for this post.</p>
            )}
          </CardContent>
        </Card>

        {/* Footer CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center bg-gray-100 rounded-lg p-8 sm:p-10 lg:p-12 shadow-inner">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Interested in more content?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Explore our collection of insightful articles and stay up-to-date with the latest trends and knowledge in
            our field.
          </p>
          <Link href="/blog">
            <Button variant="default" size="lg" className="text-lg font-semibold px-8 py-3">
              View All Posts
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

