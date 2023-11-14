import { createSlice } from '@reduxjs/toolkit';

const givenSlice = createSlice({
  name: 'given',
  initialState: [],
  reducers: {
    giveItem(state, action) {
      const { item, vendor } = action.payload;
      const index = state.findIndex(i => i.id === item);

      if (index < 0) {
        state.push({ id: item, vendors: [{ id: vendor, count: 1 }] });
      } else {
        const vendorIndex = state[index].vendors.findIndex(i => i.id === vendor);
        if (vendorIndex < 0) {
          state[index].vendors.push({ id: vendor, count: 1 });
        } else {
          state[index].vendors[vendorIndex].count += 1;
        }
      }
    },
    ungiveItem(state, action) {
      const { item, vendor, count = 1 } = action.payload;
      const index = state.findIndex(i => i.id === item);
      if (index >= 0) {
        const vendorIndex = state[index].vendors.findIndex(i => i.id === vendor);
        if (vendorIndex >= 0) {
          if (state[index].vendors[vendorIndex].count >= count) {
            state[index].vendors[vendorIndex].count -= count;
          } else {
            state[index].vendors[vendorIndex].count = 0;
          }
        }
      }
    },
    replaceGivenState(state, action) {
      action.payload.forEach(item => {
        state.push(item);
      });
    },
  },
});

export default givenSlice.reducer;

export const { giveItem, ungiveItem, replaceGivenState } = givenSlice.actions;
