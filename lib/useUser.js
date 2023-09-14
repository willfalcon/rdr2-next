import { useEffect, useState } from 'react';
import { getCookie } from './utils';

export const useUser = () => {
  const [userData, setUserData] = useState({ user: null, loggedIn: null });
  const [loading, setLoading] = useState(true);

  async function getCheckUser() {
    const token = getCookie('token');
    if (token) {
      const user = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/auth/checkUser`, {
        method: 'POST',
        body: JSON.stringify({ token }),
      }).then(res => res.json());
      setUserData(user);
    } else {
      setUserData({
        loggedIn: false,
        user: null,
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    getCheckUser();
  }, []);

  return [userData, loading, getCheckUser];
};

export async function getUser() {
  const token = getCookie('token');

  if (token) {
    const user = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/auth/checkUser`, {
      method: 'POST',
      body: JSON.stringify({ token }),
    }).then(res => res.json());
    // console.log(user);
    return user;
  }
  return {
    loggedIn: false,
    user: null,
  };
}
