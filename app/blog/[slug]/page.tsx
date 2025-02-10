import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import imageUrlBuilder from "@sanity/image-url"
import { config as sanityConfig, client } from "@/lib/sanity"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Clock, Calendar, User } from "lucide-react"
import Head from "next/head"

const builder = imageUrlBuilder({
  ...sanityConfig,
  projectId: sanityConfig.projectId || "defaultProjectId"
})

function urlFor(source: any) {
  return builder.image(source)
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{ 
  title, 
  author->{name}, 
  publishedAt, 
  body, 
  mainImage,
  estimatedReadingTime
}`

interface PostPageProps {
  params: { slug: string }
}

async function getPost(slug: string) {
  try {
    const post = await client.fetch(POST_QUERY, { slug })
    if (!post) {
      notFound()
    }
    return post
  } catch (error) {
    console.error("Error fetching post:", error)
    throw new Error("Failed to fetch post")
  }
}

export default async function BlogPost({ params }: PostPageProps) {
  const post = await getPost(params.slug)

  const postImageUrl = post?.mainImage ? urlFor(post.mainImage).width(1200).height(600).url() : null

  return (
    <>
    <Head>
      <title>{post.title} | My Blog</title>
      <meta name="description" content={post.excerpt} />
      <Link rel='canonical' href={`https://www.codewithtoni.com/blog/${post.slug}`}></Link>
    </Head>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 mt-28">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/blog" className="inline-block mb-8">
          <Button
            variant="ghost"
            className="text-base flex items-center gap-2 hover:bg-vivid/10 transition-colors duration-200 text-indigo"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>
        </Link>

        <article className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          {postImageUrl && (
            <div className="relative h-[28rem] mb-8">
              <img
                src={postImageUrl || "/placeholder.svg"}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h1 className="absolute bottom-6 left-6 right-6 text-4xl font-extrabold tracking-tight lg:text-5xl text-white leading-tight">
                {post.title}
              </h1>
            </div>
          )}

          <div className="px-6 lg:px-10 py-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{post.author?.name || "Unknown Author"}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <time>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              {post.estimatedReadingTime && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{post.estimatedReadingTime} min read</span>
                </div>
              )}
            </div>

            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-md"></div>}>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {post.body ? (
                  <PortableText value={post.body} />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 italic">No content available for this post.</p>
                )}
              </div>
            </Suspense>
          </div>
        </article>

        <div className="mt-16 text-center bg-indigo dark:bg-gray-800 rounded-lg p-12 shadow-lg">
          <h2 className="text-3xl font-semibold mb-4 text-white">Interested in more content?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Explore our collection of insightful articles and stay up-to-date with the latest trends and knowledge in
            our field.
          </p>
          <Link href="/blog">
            <Button variant="default" size="lg" className="font-semibold px-8 bg-vivid text-indigo hover:bg-vivid/90">
              View All Posts
            </Button>
          </Link>
        </div>
      </main>
    </div>
    </>
  )
}

