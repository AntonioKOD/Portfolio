import Link from 'next/link';
import { PortableText, type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/lib/sanity';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

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
    ? urlFor(post.image)?.width(800).height(450).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen p-8 flex flex-col gap-6">
      <Link href="/">
        <Button variant="ghost" className="self-start">
          ← Back to posts
        </Button>
      </Link>
      <Card className="shadow-lg">
        {postImageUrl && (
          <img
            src={postImageUrl}
            alt={post.title}
            className="w-full h-auto rounded-t-lg"
            width="800"
            height="450"
          />
        )}
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p className="text-sm text-gray-500">
            Published on {new Date(post.publishedAt).toLocaleDateString()}
          </p>
          {Array.isArray(post.body) && (
            <PortableText value={post.body} />
          )}
        </CardContent>
      </Card>
    </main>
  );
}