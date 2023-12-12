'use server';

import { getUser } from '@/lib/fetching';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { cookies } from 'next/headers';

export async function login(body) {
  try {
    const user = await getUser(body.email);

    if (!user) return { field: 'email', message: 'No user found with that email.' };
    const inputHash = crypto.pbkdf2Sync(body.password, user.salt, 1000, 64, 'sha512').toString('hex');

    const passwordsMatch = user.hash === inputHash;
    if (!passwordsMatch) return { field: 'password', message: 'Incorrect password.' };

    // recreating setLoginSession

    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);

    cookies().set('token', token, {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
    });
    return { success: true };
  } catch (err) {
    return { message: 'Something went wrong.', errorMessage: err.message };
  }
}
