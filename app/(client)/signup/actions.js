'use server';

import { createUser } from '@/lib/auth/user';
import { redirect } from 'next/navigation';
import crypto from 'crypto';
import { authClient } from '@/sanity/authClient';

export async function signup(data) {
  const email = data.email.toLowerCase();
  const password = data.password;

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

  const userObj = {
    _type: 'user',
    email,
    hash,
    salt,
  };

  try {
    const user = await authClient.create(userObj);
    if (user) {
      return {
        message: `successfully created user for ${user.email}`,
        success: true,
        error: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: `Couldn't create user for some reason`,
      error,
      success: false,
    };
  }
}
