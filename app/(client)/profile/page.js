'use client';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import Title from '@/components/Title';
import { useUser } from '@/lib/useUser';
import { useEffect, useState } from 'react';
import { updateProfile } from './actions';
import { redirect } from 'next/navigation';

export default function Page() {
  const [user, loading] = useUser();
  const [message, setMessage] = useState(false);
  const status = useFormStatus();
  console.log(user);
  useEffect(() => {
    if (!loading && !user?.loggedIn) {
      redirect('/login');
    }
  }, [user]);

  return (
    <div className="w-64 max-w-lg mx-auto">
      <Title h1 className="text-center">
        Profile
      </Title>

      <form
        action={async formdata => {
          const response = await updateProfile(formdata);
          console.log(response);
          if (!response.success) {
            setMessage(response.message);
          } else {
            redirect('/?checkUser=true');
          }
        }}
      >
        {!loading && (
          <fieldset disabled={status.pending}>
            <div className="form-control w-full max-w-lg">
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>

              <input type="text" id="name" name="name" className="input input-bordered w-full max-w-sx" defaultValue={user.user?.name} />
            </div>

            <div className="form-control w-full max-w-lg">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input input-bordered w-full max-w-sx"
                defaultValue={user.user?.email}
              />
            </div>

            <button className="btn" type="submit">
              Save
            </button>
          </fieldset>
        )}
      </form>
    </div>
  );
}
