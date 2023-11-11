'use client';

import Link from 'next/link';

import Settings from './Settings';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Menu from './Menu';
import { useUser } from '@/lib/useUser';

export default function Navbar() {
  const params = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  const [user, loading, checkUser] = useUser();

  useEffect(() => {
    if (params.get('checkUser') === 'true') {
      checkUser();
      router.replace('/');
    }
  }, [params]);

  useEffect(() => {
    const dropdowns = document.querySelectorAll('details[open]');
    dropdowns.forEach(dropdown => {
      dropdown.removeAttribute('open');
    });
  }, [path, params]);

  return (
    <div className="navbar">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-2xl tracking-tight font-bold">
          RDR2 Checklist
        </Link>
      </div>

      <Menu />
      <Settings />
    </div>
  );
}
