import toast from 'react-hot-toast';
import store from './store';
import { getUser } from './useUser';

export default async function handleSave() {
  const user = await getUser();
  if (user.loggedIn) {
    const state = store.getState();
    const serializedState = JSON.stringify(state);
    if (serializedState) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/save`, {
          method: 'POST',
          credentials: 'same-origin',
          body: serializedState,
        }).then(res => res.json());
        console.log(res);
        // toast.success('Successfully saved!');
      } catch (err) {
        console.log(err);
        // toast.error('Something went wrong.');
      }
    }
  } else {
    console.log('not logged in');
    // toast.error('You must be logged in!');
  }
}
