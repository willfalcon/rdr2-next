import { checkUser } from '@/lib/user';
import { authClient } from '@/sanity/authClient';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const user = await checkUser();
  // console.log(user);
  if (user.loggedIn) {
    const store = await request.json();

    try {
      const updated = await authClient.patch(user.user._id).set({ store }).commit();
      return NextResponse.json({ message: 'success', user: updated });
    } catch (err) {
      return NextResponse.json({ message: 'something went wrong', error: err });
    }
  }

  return NextResponse.json({ message: 'you must be logged in' });
}
