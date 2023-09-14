import { configureStore } from '@reduxjs/toolkit';

import holdingReducer from '@/reducers/holdingSlice';
import statusReducer from '@/reducers/statusSlice';
import givenReducer from '@/reducers/givenSlice';
import settingsReducer from '@/reducers/settingsSlice';

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
    holding: holdingReducer,
    status: statusReducer,
    given: givenReducer,
    settings: settingsReducer,
  },
  preloadedState: loadState(),
});
