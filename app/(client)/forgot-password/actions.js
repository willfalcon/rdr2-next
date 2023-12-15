'use server';

import { getUser } from '@/lib/fetching';
import { promisify } from 'util';
import { randomBytes } from 'crypto';
import { authClient } from '@/sanity/authClient';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

export async function sendResetEmail(email) {
  try {
    // 1. check if this is a real user
    const user = await getUser(email);

    if (!user) return { field: 'email', message: 'No user found with that email.' };
    // 2. set a reset token and expiry
    const resetToken = (await promisify(randomBytes)(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 1800; // 30 minutes
    const userWithReset = await authClient.patch(user._id).set({ resetToken, resetTokenExpiry }).commit();

    // 3. email them that reset token
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Reset your Password',
      html: `<p>Reset your password by clicking this link: <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}">Reset</a></p>`,
    });
  } catch (err) {
    return { message: 'Something went wrong.', errorMessage: err.message };
  }
}
