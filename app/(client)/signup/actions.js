'use server';

import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { authClient } from '@/sanity/authClient';
import { cookies } from 'next/headers';
import { groq } from 'next-sanity';

export async function signup(data) {
  const email = data.email.toLowerCase();

  // check if email is already registered
  const existing = await authClient.fetch(groq`*[_type == 'user' && email == $email][0]`, { email });

  if (existing) {
    return {
      field: 'email',
      message: `User already exists for email ${email}`,
      success: false,
    };
  }

  const password = data.password;
  // check if passwords match
  if (password !== data.confirmPassword) {
    return {
      field: 'confirmPassword',
      message: `Passwords don't match`,
      success: false,
    };
  }

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
      const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
      cookies().set('token', token, {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
      });
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
      error: error.message,
      success: false,
    };
  }
}
