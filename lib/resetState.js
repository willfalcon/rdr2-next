import store from './store';
import { clearHolding } from '@/reducers/holdingSlice';
import { clearChallenges } from '@/reducers/challengesSlice';
import { clearGiven } from '@/reducers/givenSlice';
import { clearRequests } from '@/reducers/requestsSlice';
import { clearStatus } from '@/reducers/statusSlice';
import { clearUsed } from '@/reducers/usedSlice';

export default async function handleLoad() {
  store.dispatch(clearHolding());
  store.dispatch(clearChallenges());
  store.dispatch(clearGiven());
  store.dispatch(clearRequests());
  store.dispatch(clearStatus());
  store.dispatch(clearUsed());
}
