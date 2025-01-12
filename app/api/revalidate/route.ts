
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request, res: Response) {
  // Check for secret to confirm this is a valid request
  const secret = req.headers.get('x-sanity-secret');
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    // Revalidate the blog index page
    await revalidatePath('/blog');

    // Optionally, revalidate individual post pages if the slug is provided
    const { slug } = await req.json();
    if (slug) {
      await revalidatePath(`/blog/${slug}`);
    }

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}