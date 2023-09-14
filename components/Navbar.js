'use client';

import handleLoad from '@/lib/handleLoad';
import handleSave from '@/lib/handleSave';
import { useUser } from '@/lib/useUser';
import Link from 'next/link';
import { MdOutlineMenu, MdOutlineSettings } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import Settings from './Settings';

export default function Navbar() {
  const [user, loading] = useUser();
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          RBR2 Checklist
        </Link>
      </div>
      {/* <button className="btn btn-square btn-ghost">
      </button> */}
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost">
          <MdOutlineMenu className="w-8 h-8" />
        </label>
        <ul tabIndex={0} className="mt-3 z-[2] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-base-100">
          {loading ? (
            <li>...</li>
          ) : user.loggedIn ? (
            <>
              <li>
                <a>{user.user.email}</a>
              </li>
              <li>
                <button onClick={handleSave}>Save</button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLoad(dispatch);
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
      </div>

      <Settings />
    </div>
  );
}
