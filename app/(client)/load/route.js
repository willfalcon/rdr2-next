import { checkUser } from '@/lib/user';
import { authClient } from '@/sanity/authClient';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const user = await checkUser();
  if (user.loggedIn) {
    try {
      const doc = await authClient.getDocument(user.user._id);
      return NextResponse.json(doc.store, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: 'something went wrong' }, { status: 400 });
    }
  }
  return NextResponse.json({ message: 'you must be logged in' }, { status: 401 });
}
