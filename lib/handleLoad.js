import store from './store';

import { replaceChallengeState } from '@/reducers/challengesSlice';
import { replaceGivenState } from '@/reducers/givenSlice';
import { replaceHoldingState } from '@/reducers/holdingSlice';
import { replaceRequestsState } from '@/reducers/requestsSlice';
import { replaceStatusState } from '@/reducers/statusSlice';
import { replaceUsedState } from '@/reducers/usedSlice';

export default async function handleLoad(user) {
  // const user = await getUser();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/load`);
    if (res.status === 200) {
      const userData = await res.json();
      const savedStore = JSON.parse(userData.store);

      store.dispatch(replaceChallengeState(savedStore.challenges));
      store.dispatch(replaceGivenState(savedStore.given));
      store.dispatch(replaceHoldingState(savedStore.holding));
      store.dispatch(replaceRequestsState(savedStore.requests));
      store.dispatch(replaceStatusState(savedStore.status));
      store.dispatch(replaceUsedState(savedStore.used));
    }
  } catch (err) {
    console.log(err);
  }
}
