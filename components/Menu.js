import Link from 'next/link';
import handleLoad from '@/lib/handleLoad';
import handleSave from '@/lib/handleSave';
import resetState from '@/lib/resetState';
import { useUser } from '@/lib/useUser';
import { MdOutlineMenu } from 'react-icons/md';
import toast from 'react-hot-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';

export default function Menu() {
  const location = typeof window !== 'undefined' ? window?.location?.pathname : '';
  const [user, loading] = useUser([location]);
  // console.log(user);
  const initials = user?.name
    ? user.name
        .split(' ')
        .slice(0, 2)
        .map(word => word[0])
        .join('')
        .toUpperCase()
    : user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : '';

  return (
    <DropdownMenu className="">
      <DropdownMenuTrigger>
        {loading ? (
          '...'
        ) : user ? (
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
              <span className="text-xs">{initials}</span>
            </div>
          </div>
        ) : (
          <div className="">
            <MdOutlineMenu className="w-8 h-8" />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <ul className="mt-3 z-[2] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-base-100"> */}
        {loading ? (
          <DropdownMenuLabel>Hang on, give me a second...</DropdownMenuLabel>
        ) : user ? (
          <>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/logout">Logout</Link>
            </DropdownMenuItem>
            <DropdownMenuLabel>Game</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                toast.promise(handleSave(user), {
                  loading: 'Saving...',
                  success: <p>Successfully saved!</p>,
                  error: <p>Something went wrong</p>,
                });
              }}
            >
              Save
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.promise(handleLoad(user), {
                  loading: 'Loading...',
                  success: <p>Loaded up!</p>,
                  error: <p>Something went wrong</p>,
                });
              }}
            >
              Load
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/signup">Signup</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem
          onClick={() => {
            resetState();
          }}
        >
          Reset
        </DropdownMenuItem>
        {/* </ul> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
