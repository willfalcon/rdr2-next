'use server';
import { checkUser } from '@/lib/user';
import { authClient } from '@/sanity/authClient';

export async function updateProfile(formData) {
  const name = formData.get('name');
  let email = formData.get('email');
  email = email.toLowerCase();

  const user = await checkUser();

  if (!user.loggedIn) {
    return { success: false, message: 'You must be logged in!' };
  }

  if (user.user?._id) {
    try {
      const updatedUser = await authClient.patch(user.user._id).set({ name, email }).commit();
      return { success: true, message: 'Profile saved' };
    } catch (err) {
      return { success: false, message: 'Something went wrong', error: err };
    }
  }
}
