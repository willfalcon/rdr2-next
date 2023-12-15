import { createSlice } from '@reduxjs/toolkit';

export const challengesSlice = createSlice({
  name: 'challenges',
  initialState: {
    ranks: [],
    tasks: [],
  },
  reducers: {
    updateChallengeRank(state, action) {
      const { type, rank } = action.payload;

      const index = state.ranks.findIndex(i => i.id === type);
      if (index < 0) {
        state.ranks.push({
          id: type,
          rank,
        });
      } else {
        state.ranks[index].rank = rank;
      }
    },
    updateTask(state, action) {
      const { challenge, counter, checklist } = action.payload;
    },
    incrementCounter(state, action) {
      const challenge = action.payload;
      const index = state.tasks.findIndex(t => t.id === challenge);
      if (index < 0) {
        state.tasks.push({ id: challenge, count: 1 });
      } else {
        state.tasks[index].count++;
      }
    },
    decrementCounter(state, action) {
      const challenge = action.payload;
      const index = state.tasks.findIndex(t => t.id === challenge);
      if (index >= 0 && state.tasks[index].count > 0) {
        state.tasks[index].count--;
      }
    },
    toggleItem(state, action) {
      const { challenge, item } = action.payload;
      const index = state.tasks.findIndex(t => t.id === challenge);
      if (index < 0) {
        state.tasks.push({ id: challenge, checked: [item] });
      } else {
        const itemIndex = state.tasks[index].checked.indexOf(item);
        if (itemIndex < 0) {
          state.tasks[index].checked.push(item);
        } else {
          state.tasks[index].checked.splice(itemIndex, 1);
        }
      }
    },
    replaceChallengeState(state, action) {
      state = action.payload;
      return state;
    },
    clearChallenges(state) {
      state = {
        ranks: [],
        tasks: [],
      };
      return state;
    },
  },
});

export default challengesSlice.reducer;
export const { updateChallengeRank, incrementCounter, decrementCounter, toggleItem, replaceChallengeState, clearChallenges } =
  challengesSlice.actions;
