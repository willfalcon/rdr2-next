import { replaceGivenState } from '@/reducers/givenSlice';
import store from './store';
import { getUser } from './useUser';
import { replaceHoldingState } from '@/reducers/holdingSlice';
import { replaceStatusState } from '@/reducers/statusSlice';

export default async function handleLoad(dispatch) {
  const user = await getUser();

  if (user.loggedIn) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/load`).then(res => res.json());
      store.dispatch(replaceGivenState(res.given));
      store.dispatch(replaceHoldingState(res.holding));
      store.dispatch(replaceStatusState(res.status));
    } catch (err) {
      console.log(err);
    }
  }
}
