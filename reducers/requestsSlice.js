import { createSlice } from '@reduxjs/toolkit';

export const requestsSlice = createSlice({
  name: 'requests',
  initialState: [],
  reducers: {
    changeRequestState(state, action) {
      const newState = action.payload.state;
      const item = action.payload.item;
      const index = state.findIndex(i => i.id === item);
      if (index < 0) {
        state.push({ id: item, state: newState });
      } else {
        state[index].state = newState;
      }
    },
    clearRequests(state) {
      state = [];
    },
  },
});

export default requestsSlice.reducer;
export const { changeRequestState, clearRequests } = requestsSlice.actions;
