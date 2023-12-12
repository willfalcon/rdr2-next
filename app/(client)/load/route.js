import { getUserStore } from '@/lib/fetching';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) return NextResponse.json({ user: null, message: 'You must be logged in to do this.' }, { status: 401 });
    const { userId } = jwt.verify(token.value, process.env.APP_SECRET);
    const user = await getUserStore(userId);

    return NextResponse.json({ ...user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Authentication token is invalid, please log in', error: { ...error } }, { status: 500 });
  }
}
