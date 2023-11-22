import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { getUserById } from '@/lib/fetching';

export async function GET(req) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) return NextResponse.json({ user: null }, { status: 200 });
    const { userId } = jwt.verify(token.value, process.env.APP_SECRET);
    const user = await getUserById(userId);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Authentication token is invalid, please log in', error: { ...error } }, { status: 500 });
  }
}
