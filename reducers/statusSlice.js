import { createSelector, createSlice } from '@reduxjs/toolkit';

export const statusSlice = createSlice({
  name: 'status',
  initialState: [],
  reducers: {
    changeStatus(state, action) {
      const { item, status } = action.payload;
      const itemIndex = state.findIndex(i => i.id === item);

      if (itemIndex == 'undefined' || itemIndex < 0) {
        state.push({ id: item, status });
      } else {
        state[itemIndex].status = status;
      }
    },
    replaceStatusState(state, action) {
      action.payload.forEach(item => {
        state.push(item);
      });
    },
    clearStatus(state) {
      state = [];
    },
  },
});

export default statusSlice.reducer;
export const { changeStatus, replaceStatusState, clearStatus } = statusSlice.actions;

const statusSelector = state => state.status;
export const trackingSelector = createSelector([statusSelector], status => status.filter(item => item.status === 2).map(item => item.id));
