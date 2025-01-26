import Link from 'next/link';
import { PortableText, type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/lib/sanity';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{ title, author->{name}, publishedAt, body, image }`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, params, options);
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1200).height(600).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      {/* Back to posts button */}
      <Link href="/blog">
        <Button variant="ghost" className="mb-8 text-lg flex items-center">
          ← Back to Blog
        </Button>
      </Link>

      {/* Blog Post Card */}
      <Card className="shadow-lg">
        {postImageUrl ? (
          <img
            src={postImageUrl}
            alt={post.title}
            className="w-full h-auto rounded-t-lg object-cover max-h-[400px]"
          />
        ) : (
          <div className="w-full h-56 bg-gray-200 rounded-t-lg flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}

        <CardHeader className="p-6">
          {/* Author Information */}
          <div className="flex items-center mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-700">
                {post.author?.name || 'Unknown Author'}
              </p>
              <p className="text-sm text-gray-500">
                Published on {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Post Title */}
          <h1 className="text-4xl font-bold text-primary leading-tight mb-2">
            {post.title}
          </h1>
        </CardHeader>

        <CardContent className="prose max-w-none px-6 pb-6">
          {Array.isArray(post.body) ? (
            <PortableText value={post.body} />
          ) : (
            <p>No content available for this post.</p>
          )}
        </CardContent>
      </Card>

      {/* Footer CTA */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Interested in more content?
        </h2>
        <Link href="/blog">
          <Button variant="default" className="text-lg">
            View All Posts
          </Button>
        </Link>
      </div>
    </main>
  );
}