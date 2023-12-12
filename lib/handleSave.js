import toast from 'react-hot-toast';
import store from './store';

export default async function handleSave(user) {
  // if (user) {
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
      toast.success('Successfully saved!');
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong.');
    }
  }
}
