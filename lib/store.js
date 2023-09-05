import { configureStore } from '@reduxjs/toolkit';

import listsReducer from '@/reducers/listsSlice';
import trackingReducer from '@/reducers/trackingSlice';
import completedReducer from '@/reducers/completedSlice';

const KEY = 'redux';
export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}

export default configureStore({
  reducer: {
    lists: listsReducer,
    tracking: trackingReducer,
    completed: completedReducer,
  },
  preloadedState: loadState(),
});
