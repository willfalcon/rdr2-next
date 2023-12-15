'use client';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import useSWR, { useSWRConfig } from 'swr';

const fetcher = url =>
  fetch(url)
    .then(r => r.json())
    .then(data => {
      // return { user: data?.user || null };
      return data;
    });

export const useUser = (deps = [], { redirectTo, redirectIfFound } = {}) => {
  // const user = data?.user;
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const hasUser = Boolean(user);

  async function fetchUser() {
    setLoading(true);
    const res = await fetch('/user').then(res => res.json());

    const hasUser = Boolean(res.user);
    function redirectChecks() {
      if (!redirectTo) return;

      if (
        // If redirectTo is set, redirect if the user was not found.
        (redirectTo && !redirectIfFound && !hasUser) ||
        // If redirectIfFound is also set, redirect if the user was found
        (redirectIfFound && hasUser)
      ) {
        setLoading(false);
        router.push(redirectTo);
      }
    }
    redirectChecks();
    setUser(res.user);
    setLoading(false);
  }

  useEffect(() => {
    // console.count('useUser effect running');
    fetchUser();
  }, deps);

  const location = typeof window !== 'undefined' ? window?.location : { search: '', pathname: '/' };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('refetchUser')) {
      fetchUser();
      router.replace(location.pathname);
    }
  }, [location.search]);

  // useEffect(() => {
  //   if (!redirectTo || loading) return;
  //   if (
  //     // If redirectTo is set, redirect if the user was not found.
  //     (redirectTo && !redirectIfFound && !hasUser) ||
  //     // If redirectIfFound is also set, redirect if the user was found
  //     (redirectIfFound && hasUser)
  //   ) {
  //     router.push(redirectTo);
  //   }
  // }, [redirectTo, redirectIfFound, loading, hasUser]);

  return [user, loading, fetchUser];
};
