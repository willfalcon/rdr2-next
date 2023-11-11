import Link from 'next/link';
import handleLoad from '@/lib/handleLoad';
import handleSave from '@/lib/handleSave';
import { useUser } from '@/lib/useUser';
import { MdOutlineMenu } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useClickAway } from '@uidotdev/usehooks';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';

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
    <NavigationMenuItem className="">
      <NavigationMenuTrigger>
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
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* <ul className="mt-3 z-[2] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-base-100"> */}
        {loading ? (
          <li>Hang on, give me a second...</li>
        ) : user.loggedIn ? (
          <>
            <Link href="/profile">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Profile</NavigationMenuLink>
            </Link>
            <NavigationMenuLink
              onClick={() => {
                toast.promise(handleSave(), {
                  loading: 'Saving...',
                  success: <b>Successfully saved!</b>,
                  error: <b>Something went wrong</b>,
                });
              }}
            >
              Save
            </NavigationMenuLink>
            <NavigationMenuLink
              onClick={() => {
                toast.promise(handleLoad(), {
                  loading: 'Loading...',
                  success: <b>Loaded up!</b>,
                  error: <b>Something went wrong</b>,
                });
              }}
            >
              Load
            </NavigationMenuLink>
            <Link href="/logout">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Logout</NavigationMenuLink>
            </Link>
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
        {/* </ul> */}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
