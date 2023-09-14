import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

import { getUserById } from './fetching';

export async function checkUser(tokenProp = null) {
  const token = tokenProp ? tokenProp : cookies().get('token')?.value;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    const user = await getUserById(userId);
    if (user) {
      return {
        loggedIn: true,
        user,
      };
    }
    return {
      loggedIn: false,
      user: null,
    };
  }
}
