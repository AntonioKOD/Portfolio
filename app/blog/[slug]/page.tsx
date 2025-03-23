import type React from "react"
import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import imageUrlBuilder from "@sanity/image-url"
import { config as sanityConfig, client } from "@/lib/sanity"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Calendar, User } from "lucide-react"

const builder = imageUrlBuilder({
  ...sanityConfig,
  projectId: sanityConfig.projectId || "defaultProjectId",
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
  estimatedReadingTime,
  slug,
  excerpt
}`

interface PostPageProps {
  params: Promise<{ slug: string }>
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

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPost((await params).slug)
  const postImageUrl = post?.mainImage ? urlFor(post.mainImage).width(1200).height(600).url() : null

  return {
    title: `${post.title} | My Blog`,
    description: post.excerpt || "Default description for My Blog.",
    //canonical: `https://www.codewithtoni.com/blog/${post.slug.current}`,
    openGraph: {
      title: `${post.title} | My Blog`,
      description: post.excerpt || "Default description for My Blog.",
      url: `https://www.codewithtoni.com/blog/${post.slug.current}`,
      type: "article",
      images: postImageUrl ? [{ url: postImageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | My Blog`,
      description: post.excerpt || "Default description for My Blog.",
      images: postImageUrl ? [postImageUrl] : [],
    },
    alternates: {
      canonical: `https://www.codewithtoni.com/blog/${post.slug.current}`,
    },
  }
}

// Custom components for PortableText
import type { PortableTextReactComponents } from "@portabletext/react"

const myPortableTextComponents: PortableTextReactComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-200">{children}</h3>
    ),
    normal: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 my-6 bg-gray-50 dark:bg-gray-800 rounded-r-md italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-2">{children}</li>,
    number: ({ children }) => <li className="pl-2">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
        {children}
      </a>
    ),
  },
  types: {}, // Provide an empty object or define custom types if needed
  hardBreak: () => <br />, // Default implementation for hard breaks
  unknownMark: ({ children }) => <span>{children}</span>, // Default for unknown marks
  unknownType: ({ children }) => <div>{children}</div>, // Default for unknown types
  unknownBlockStyle: ({ children }) => <div>{children}</div>, // Default for unknown block styles
  unknownList: ({ children }) => <ul>{children}</ul>, // Default for unknown lists
  unknownListItem: ({ children }) => <li>{children}</li>, // Default for unknown list items
}

export default async function BlogPost({ params }: PostPageProps) {
  const post = await getPost((await params).slug)
  const postImageUrl = post?.mainImage ? urlFor(post.mainImage).width(1200).height(600).url() : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-28 pb-16">
      <main className="container mx-auto px-4 max-w-6xl">
        <Link href="/blog" className="inline-block mb-8">
          <Button
            variant="ghost"
            className="text-base flex items-center gap-2 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors duration-200 text-indigo-600 dark:text-indigo-400"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>
        </Link>

        <article className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
          {postImageUrl && (
            <div className="relative h-[28rem]">
              <Image
                src={postImageUrl || "/placeholder.svg"}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-white leading-tight">
                  {post.title}
                </h1>
              </div>
            </div>
          )}

          {!postImageUrl && (
            <div className="px-8 pt-8">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl leading-tight text-gray-900 dark:text-white">
                {post.title}
              </h1>
            </div>
          )}

          <div className="px-8 py-6">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
              {post.author?.name && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{post.author.name}</span>
                </div>
              )}
              {post.publishedAt && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                  <time>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              )}
              {post.estimatedReadingTime && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{post.estimatedReadingTime} min read</span>
                </div>
              )}
            </div>

            <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded-md"></div>}>
              <div className="text-gray-800 dark:text-gray-200 max-w-none text-lg leading-relaxed">
                {post.body ? (
                  <PortableText value={post.body} components={myPortableTextComponents} />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 italic">No content available for this post.</p>
                )}
              </div>
            </Suspense>
          </div>
        </article>

        <div className="mt-16 text-center bg-indigo-600 dark:bg-gray-800 rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-semibold mb-4 text-white">Interested in more content?</h2>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            Explore our collection of insightful articles and stay up-to-date with the latest trends and knowledge in
            our field.
          </p>
          <Link href="/blog">
            <Button
              variant="default"
              size="lg"
              className="font-semibold px-8 bg-white text-indigo-600 hover:bg-gray-100"
            >
              View All Posts
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

