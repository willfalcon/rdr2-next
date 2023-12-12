'use server';

import { authClient } from '@/sanity/authClient';
import { groq } from 'next-sanity';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export async function resetPassword(props) {
  const { password, confirmPassword, token } = props;
  // 1. check if the passwords match
  if (password !== confirmPassword) {
    return { success: false, field: 'confirmPassword', message: `Passwords don't match!` };
  }
  try {
    // 2. check if it's a legit reset token
    const user = await authClient.fetch(groq`*[_type == 'user' && resetToken == $token][0]`, { token: token });
    if (!user) {
      return { success: false, message: 'Reset token is invalid.' };
    }
    // 3. check if it's expired
    if (new Date() <= user.resetTokenExpiry) {
      return { success: false, message: 'Reset token is expired.' };
    }

    // 4. hash their new password
    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
    // 5. save their password and remove the used token and expiry
    const updatedUser = await authClient.patch(user._id).set({ hash }).unset(['resetToken', 'resetTokenExpiry']).commit();
    // 6. generate jwt
    const jwtToken = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
    // 7. set the jwt cookie
    cookies().set('token', jwtToken, {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
    });
    return {
      message: `Successfully set new password.`,
      success: true,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      message: `Couldn't set the new password for some reason`,
      error: error.message,
      success: false,
    };
  }
}
