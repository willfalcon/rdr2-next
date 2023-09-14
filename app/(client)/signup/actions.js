'use server';

import { authClient } from '@/sanity/authClient';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function signup(formData) {
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
    const user = await authClient.create(userObj);
    console.log(user);
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
      cookies().set('token', token, {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
      });
      return {
        message: `successfully created user for ${user.email}`,
        success: true,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      message: `Couldn't create user for some reason`,
    };
  }
}
