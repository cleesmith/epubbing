'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { appPath } from '@/utils/app-path';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/library/');
  }, [router]);

  return <a href={appPath('/library/')}>Open library</a>;
}
