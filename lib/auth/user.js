import { authClient } from '@/sanity/authClient';
import crypto from 'crypto';
import { getUser } from '../fetching';

export async function createUser(data) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):

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
      };
    }
  } catch (err) {
    console.log(err);
    return {
      message: `Couldn't create user for some reason`,
    };
  }

  return { email };
}

// Here you should lookup for the user in your DB
export async function findUser({ email }) {
  const user = await getUser(email);
  return user;
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex');
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}
