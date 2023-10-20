import Link from 'next/link';
import handleLoad from '@/lib/handleLoad';
import handleSave from '@/lib/handleSave';
import { useUser } from '@/lib/useUser';
import { MdOutlineMenu } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useClickAway } from '@uidotdev/usehooks';

export default function Menu() {
  const [user, loading] = useUser();

  const initials = user.user?.name
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();
  const ref = useClickAway(e => {
    ref.current.removeAttribute('open');
  });

  return (
    <details className="dropdown dropdown-end" ref={ref}>
      {loading ? (
        <summary>...</summary>
      ) : user.loggedIn ? (
        <summary className="avatar placeholder cursor-pointer">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
            <span className="text-xs">{initials}</span>
          </div>
        </summary>
      ) : (
        <summary className="btn btn-ghost cursor-pointer">
          <MdOutlineMenu className="w-8 h-8" />
        </summary>
      )}
      <ul className="mt-3 z-[2] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-base-100">
        {loading ? (
          <li>Hang on, give me a second...</li>
        ) : user.loggedIn ? (
          <>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  toast.promise(handleSave(), {
                    loading: 'Saving...',
                    success: <b>Successfully saved!</b>,
                    error: <b>Something went wrong</b>,
                  });
                }}
              >
                Save
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  toast.promise(handleLoad(), {
                    loading: 'Loading...',
                    success: <b>Loaded up!</b>,
                    error: <b>Something went wrong</b>,
                  });
                }}
              >
                Load
              </button>
            </li>
            <li>
              <Link href="/logout">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </details>
  );
}
