import { createSlice } from '@reduxjs/toolkit';

export const challengesSlice = createSlice({
  name: 'challenges',
  initialState: [],
  reducers: {
    updateChallengeRank(state, action) {
      const { type, rank } = action.payload;

      const index = state.findIndex(i => i.id === type);
      if (index < 0) {
        state.push({
          id: type,
          rank,
        });
      } else {
        state[index].rank = rank;
      }
    },
  },
});

export default challengesSlice.reducer;
export const { updateChallengeRank } = challengesSlice.actions;
