import Link from 'next/link';
import handleLoad from '@/lib/handleLoad';
import handleSave from '@/lib/handleSave';
import { useUser } from '@/lib/useUser';
import { MdOutlineMenu } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useClickAway } from '@uidotdev/usehooks';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu';

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
    <DropdownMenu className="">
      <DropdownMenuTrigger>
        {loading ? (
          '...'
        ) : user.loggedIn ? (
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
        ) : user.loggedIn ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.promise(handleSave(), {
                  loading: 'Saving...',
                  success: <b>Successfully saved!</b>,
                  error: <b>Something went wrong</b>,
                });
              }}
            >
              Save
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.promise(handleLoad(), {
                  loading: 'Loading...',
                  success: <b>Loaded up!</b>,
                  error: <b>Something went wrong</b>,
                });
              }}
            >
              Load
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/logout">Logout</Link>
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
        {/* </ul> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
