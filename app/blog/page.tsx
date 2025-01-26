// app/blog/page.js
import Link from 'next/link';
import { client } from '@/lib/sanity';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type SanityDocument } from 'next-sanity';

const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
] | order(publishedAt desc)[0...12] {
  _id, title, slug, publishedAt
}`;

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  let posts: SanityDocument[]= [];

  try {
    posts = await client.fetch(POSTS_QUERY);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return <p className="text-center text-red-500">Error fetching blog posts. Please try again later.</p>;
  }

  if (!posts.length) {
    return <p className="text-center text-gray-500">No blog posts available.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post._id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-black">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Published on {new Date(post.publishedAt).toLocaleDateString()}</p>
              <Link href={`/blog/${post.slug.current}`}>
                <Button variant="default" className="mt-4">Read More</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}