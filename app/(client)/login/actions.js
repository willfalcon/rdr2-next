'use server';

import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

import { getUser } from '@/lib/fetching';

export async function login(formData) {
  let email = formData.get('email');
  email = email.toLowerCase();

  const user = await getUser(email);

  if (!user) {
    return { success: false, message: 'No user found for that email.' };
  }

  const password = formData.get('password');

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return {
      success: false,
      message: 'Incorrect password.',
    };
  }

  const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
  cookies().set('token', token, {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
  });

  return {
    success: true,
    message: 'Successfully logged in.',
  };
}
