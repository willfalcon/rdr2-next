import { replaceGivenState } from '@/reducers/givenSlice';
import store from './store';
import { getUser } from './useUser';
import { replaceHoldingState } from '@/reducers/holdingSlice';
import { replaceStatusState } from '@/reducers/statusSlice';
import toast from 'react-hot-toast';

export default async function handleLoad() {
  const user = await getUser();

  if (user.loggedIn) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/load`).then(res => res.json());
      store.dispatch(replaceGivenState(res.given));
      store.dispatch(replaceHoldingState(res.holding));
      store.dispatch(replaceStatusState(res.status));
      // toast.success('Succesfully loaded');
    } catch (err) {
      console.log(err);
      // toast.error('Something went wrong');
    }
  }
}
