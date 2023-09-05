import { createSlice } from '@reduxjs/toolkit';

const trackingSlice = createSlice({
  name: 'tracking',
  initialState: {
    items: [],
  },
  reducers: {
    trackItem(state, action) {
      const tracking = state.items;
      const item = action.payload;
      const index = tracking.indexOf(item);
      if (index < 0) {
        tracking.push(item);
      } else {
        tracking.splice(index, 1);
      }
    },
  },
});

export default trackingSlice.reducer;
export const { trackItem } = trackingSlice.actions;
