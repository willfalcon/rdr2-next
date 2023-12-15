import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { authClient } from '@/sanity/authClient';

export async function POST(request) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (!token) return NextResponse.json({ user: null, message: 'You must be logged in to do this.' }, { status: 401 });

  try {
    const { userId } = jwt.verify(token.value, process.env.APP_SECRET);
    const store = await request.json();

    const updated = await authClient
      .patch(userId)
      .set({ store: JSON.stringify(store) })
      .commit();
    return NextResponse.json({ message: 'success', user: updated }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Authentication token is invalid, please log in', error: { ...error } }, { status: 500 });
  }
}
