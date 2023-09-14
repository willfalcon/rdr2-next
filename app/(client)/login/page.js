'use client';

import Title from '@/components/Title';

import { redirect } from 'next/navigation';
import { login } from './actions';
import { useEffect, useState } from 'react';
import { useUser } from '@/lib/useUser';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export default function Page() {
  const [user] = useUser();
  const status = useFormStatus();

  useEffect(() => {
    if (user?.loggedIn) {
      redirect('/');
    }
  }, [user]);

  const [message, setMessage] = useState(false);

  return (
    <div className="w-64 max-w-lg mx-auto">
      <Title h1 className="text-center">
        Login
      </Title>
      {message && <p className="text-error">{message}</p>}
      <form
        action={async formdata => {
          const response = await login(formdata);
          console.log(response);
          if (!response.success) {
            setMessage(response.message);
          } else {
            redirect('/');
          }
        }}
      >
        <fieldset disabled={status.pending}>
          <div className="form-control w-full max-w-lg">
            <label htmlFor="email" className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" id="email" name="email" placeholder="Email" className="input input-bordered w-full max-w-sx" />
          </div>
          <div className="form-control w-full max-w-lg mb-4">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" id="password" name="password" placeholder="Password" className="input input-bordered w-full max-w-sx" />
          </div>
          <input type="submit" className="btn" value="Sign In" />
        </fieldset>
      </form>
    </div>
  );
}
