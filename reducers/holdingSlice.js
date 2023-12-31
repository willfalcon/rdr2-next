import { createSlice } from '@reduxjs/toolkit';

export const holdingSlice = createSlice({
  name: 'holding',
  initialState: [],
  reducers: {
    incrementHolding(state, action) {
      const material = action.payload;
      const index = state.findIndex(i => i.id === material);
      if (index < 0) {
        state.push({ id: material, count: 1 });
      } else {
        state[index].count += 1;
      }
    },
    decrementHolding(state, action) {
      const material = action.payload;
      const index = state.findIndex(i => i.id === material);

      if (index >= 0 && state[index].count > 0) {
        state[index].count -= 1;
      }
    },
    replaceHoldingState(state, action) {
      state = action.payload;
      return state;
    },
    clearHolding(state) {
      state = [];
      return state;
    },
  },
});

export default holdingSlice.reducer;

export const { incrementHolding, decrementHolding, replaceHoldingState, clearHolding } = holdingSlice.actions;
