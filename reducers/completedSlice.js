import { createSlice } from '@reduxjs/toolkit';

const completedSlice = createSlice({
  name: 'completed',
  initialState: {
    items: [],
  },
  reducers: {
    completeItem(state, action) {
      const completed = state.items;
      const item = action.payload;
      const index = completed.indexOf(item);
      if (index < 0) {
        completed.push(item);
      } else {
        completed.splice(index, 1);
      }
    },
  },
});

export default completedSlice.reducer;
export const { completeItem } = completedSlice.actions;
