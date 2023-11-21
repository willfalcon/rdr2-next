'use server';

import { validatePassword } from '@/lib/auth/user';
import { getUser } from '@/lib/fetching';
import jwt from 'jsonwebtoken';

import { cookies } from 'next/headers';

export async function login(body) {
  try {
    const user = await getUser(body.email);
    if (!user) return { message: 'No user found with that email.' };
    const passwordCorrect = validatePassword(user, body.password);
    if (!passwordCorrect) return { message: 'Incorrect password.' };

    // recreating setLoginSession

    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
    console.log(token);
    cookies().set('token', token, {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
    });
    return { success: true };
  } catch (err) {
    return { message: 'Something went wrong.', errorMessage: err.message };
  }
}
