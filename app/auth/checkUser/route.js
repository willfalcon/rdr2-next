import { checkUser } from '@/lib/user';
import { NextResponse } from 'next/server';

export async function POST(request, response) {
  const body = await request.json();

  const token = body?.token;

  const user = await checkUser(token);

  return NextResponse.json(user);
}
