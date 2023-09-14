'use client';

import { redirect } from 'next/navigation';
import { signup } from './actions';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import Title from '@/components/Title';

export default function Page() {
  const status = useFormStatus();

  return (
    <div className="w-64 max-w-lg mx-auto">
      <Title h1 className="text-center">
        Sign Up
      </Title>
      <form
        action={async formdata => {
          const response = await signup(formdata);

          if (response.success) {
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
          <button type="submit" className="btn">
            Sign Up
          </button>
        </fieldset>
      </form>
    </div>
  );
}
