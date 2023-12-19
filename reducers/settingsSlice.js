import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    hideCompleted: false,
    autoSave: false,
  },
  reducers: {
    changeSetting(state, action) {
      const { setting, value } = action.payload;
      state[setting] = value;
    },
  },
});

export default settingsSlice.reducer;
export const { changeSetting } = settingsSlice.actions;
