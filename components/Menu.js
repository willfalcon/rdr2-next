import Link from 'next/link';
import handleLoad from '@/lib/handleLoad';
import handleSave from '@/lib/handleSave';
import resetState from '@/lib/resetState';
import { useUser } from '@/lib/useUser';
import { MdOutlineMenu } from 'react-icons/md';
import toast from 'react-hot-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useAuth } from './Providers';
import { Button } from './ui/button';

export default function Menu() {
  // const { user, loading } = useAuth();
  const loading = false;
  const user = null;
  // console.log(user, loading);
  const initials = user?.user?.name
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <DropdownMenu className="">
      <DropdownMenuTrigger>
        {loading ? (
          '...'
        ) : user?.loggedIn ? (
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
        ) : user?.loggedIn ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.promise(handleSave(), {
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
                toast.promise(handleLoad(), {
                  loading: 'Loading...',
                  success: <p>Loaded up!</p>,
                  error: <p>Something went wrong</p>,
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
        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            onClick={() => {
              resetState();
            }}
          >
            Reset
          </Button>
        </DropdownMenuItem>
        {/* </ul> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
