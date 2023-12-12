import { replaceGivenState } from '@/reducers/givenSlice';
import store from './store';
import { getUser } from './useUser';
import { replaceHoldingState } from '@/reducers/holdingSlice';
import { replaceStatusState } from '@/reducers/statusSlice';
import toast from 'react-hot-toast';

export default async function handleLoad(user) {
  // const user = await getUser();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/load`);
    if (res.status === 200) {
      const userData = await res.json();
      const savedStore = JSON.parse(userData.store);
      console.log(savedStore);
      store.dispatch(replaceGivenState(savedStore.given));
      store.dispatch(replaceHoldingState(savedStore.holding));
      store.dispatch(replaceStatusState(savedStore.status));
      // toast.success('Succesfully loaded');
    }
  } catch (err) {
    console.log(err);
    // toast.error('Something went wrong');
  }
}
