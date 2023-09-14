import store from './store';
import { getUser } from './useUser';

export default async function handleSave() {
  const user = await getUser();
  if (user.loggedIn) {
    const state = store.getState();
    const serializedState = JSON.stringify(state);
    if (serializedState) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/save`, {
        method: 'POST',
        credentials: 'same-origin',
        body: serializedState,
      }).then(res => res.json());
    }
  } else {
    console.log('not logged in');
  }
}
