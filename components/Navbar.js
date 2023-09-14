'use client';

import Link from 'next/link';

import Settings from './Settings';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Menu from './Menu';
import { useUser } from '@/lib/useUser';

export default function Navbar() {
  const params = useSearchParams();
  const router = useRouter();

  const [user, loading, checkUser] = useUser();
  useEffect(() => {
    if (params.get('checkUser') === 'true') {
      checkUser();
      router.replace('/');
    }
  }, [params]);

  return (
    <div className="navbar">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          RDR2 Checklist
        </Link>
      </div>

      <Menu />
      <Settings />
    </div>
  );
}
