'use server';
// import { checkUser } from '@/lib/user';
import { authClient } from '@/sanity/authClient';

// export async function updateProfile(formData) {
//   const name = formData.get('name');
//   let email = formData.get('email');
//   email = email.toLowerCase();

//   const user = await checkUser();

//   if (!user.loggedIn) {
//     return { success: false, message: 'You must be logged in!' };
//   }

//   if (user.user?._id) {
//     try {
//       const updatedUser = await authClient.patch(user.user._id).set({ name, email }).commit();
//       return { success: true, message: 'Profile saved' };
//     } catch (err) {
//       return { success: false, message: 'Something went wrong', error: err };
//     }
//   }
// }

export async function updateUser(data) {
  const { name, password, confirmPassword, user } = data;

  let newPassword = user.hash;

  if (password) {
    if (password !== confirmPassword) {
      return {
        field: 'confirmPassword',
        message: `Passwords don't match`,
        success: false,
      };
    }
    const salt = crypto.randomBytes(16).toString('hex');
    newPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  }

  const newName = name ? name : user.name;

  try {
    const updatedUser = await authClient.patch(user._id).set({ name: newName, hash: newPassword }).commit();
    return {
      message: `Successfully updated user for ${updatedUser.email}`,
      success: true,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      message: `Couldn't create user for some reason`,
      error,
      success: false,
    };
  }
}
