import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { authClient } from '@/sanity/authClient';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export async function POST(request, response) {
  const formData = await request.formData();
  let email = formData.get('email');
  email = email.toLowerCase();
  const rawPassword = formData.get('password');

  const password = await bcrypt.hash(rawPassword, 10);

  const userObj = {
    _type: 'user',
    email,
    password,
  };

  try {
    const newUser = await authClient.create(userObj);
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  } catch (e) {}
}
