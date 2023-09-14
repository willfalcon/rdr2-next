import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export default statusSlice.reducer;
export const { changeStatus, replaceStatusState } = statusSlice.actions;
