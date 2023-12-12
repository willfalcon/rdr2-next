import { cookies } from 'next/headers';

import { NextResponse } from 'next/server';

export async function GET(req) {
  cookies().delete('token');
  return NextResponse.redirect(new URL('/?refetchUser=1', req.url));
}
