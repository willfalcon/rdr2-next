'use client';

import Title from '@/components/Title';
import { useUser } from '@/lib/useUser';

import ProfileForm from './ProfileForm';

export default function Page() {
  const [user, loading, refetchUser] = useUser([], { redirectTo: '/login' });

  return (
    <div className="w-64 max-w-lg mx-auto">
      <Title h1 className="text-center">
        Profile
      </Title>

      {!loading && user && <ProfileForm user={user} />}
    </div>
  );
}
