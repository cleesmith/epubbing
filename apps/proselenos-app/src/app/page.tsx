'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { appPath } from '@/utils/app-path';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/authors/');
  }, [router]);

  return <a href={appPath('/authors/')}>Open Authors</a>;
}
