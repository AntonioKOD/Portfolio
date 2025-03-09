import {Suspense} from 'react';
import { prefetchResources } from '@/lib/prefetch';

import HomePage from '@/components/home-page';

import HomePageSkeleton from '@/components/home-page-skeleton';

export const generateMetadata = async () => {

  await prefetchResources();
  return {
    title: "CodeWithToni | Web Development & Technical Solutions",
    description: "Expert web development services specializing in modern, responsive websites and applications.",
  }
}

export default function Home(){
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePage />
    </Suspense>
  )
}