import { createSlice } from '@reduxjs/toolkit';

export const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    items: [],
    statuses: [],
    holding: [],
    given: [],
  },
  reducers: {
    incrementMaterial(state, action) {
      const { item, material } = action.payload;
      const itemIndex = state.items.findIndex(i => i.id === item);

      if (itemIndex < 0) {
        state.items.push({ id: item, materials: [{ id: material, count: 1, given: 0, checked: false }] });
      } else {
        const matIndex = state.items[itemIndex].materials.findIndex(m => m.id === material);
        if (matIndex < 0) {
          state.items[itemIndex].materials.push({ id: material, count: 1, given: 0, checked: false });
        } else {
          state.items[itemIndex].materials[matIndex].count += 1;
        }
      }
    },
    incrementHolding(state, action) {
      const material = action.payload;

      const materialIndex = state.holding.findIndex(i => i.material === material);
      if (materialIndex < 0) {
        state.holding.push({ material, count: 1 });
      } else {
        state.holding[materialIndex].count += 1;
      }
    },
    decrementHolding(state, action) {
      const material = action.payload;

      const materialIndex = state.holding.findIndex(i => i.material === material);
      if (materialIndex < 0) {
        state.holding.push({ material, count: 0 });
      } else if (state.holding[materialIndex].count > 0) {
        state.holding[materialIndex].count -= 1;
      }
    },
    incrementGiven(state, action) {
      const { item, material, vendor } = action.payload;
      const itemIndex = state.items.findIndex(i => i.id === item);
      const givenIndex = state.given.findIndex(i => i.vendor === vendor && i.material === material);
      const holdingIndex = state.holding.findIndex(i => i.material === material);
      if (givenIndex < 0) {
        state.given.push({ vendor, material, count: 1 });
      } else {
        state.given[0].count += 1;
      }
      if (itemIndex < 0) {
        state.items.push({ id: item, materials: [{ id: material, count: 0, given: 1, checked: false }] });
      } else {
        const matIndex = state.items[itemIndex].materials.findIndex(m => m.id === material);
        if (matIndex < 0) {
          state.items[itemIndex].materials.push({ id: material, count: 0, given: 1, checked: false });
        } else {
          if (state.items[itemIndex].materials[matIndex].count > 0) {
            state.items[itemIndex].materials[matIndex].count -= 1;
          }
          if (state.holding[holdingIndex].count > 0) {
            state.holding[holdingIndex].count -= 1;
          }
          state.items[itemIndex].materials[matIndex].given += 1;
        }
      }
    },
    decrementMaterial(state, action) {
      const { item, material } = action.payload;
      const itemIndex = state.items.findIndex(i => i.id === item);
      if (itemIndex < 0) {
        state.items.push({ id: item, materials: [{ id: material, count: 0, given: 0, checked: false }] });
      } else {
        const matIndex = state.items[itemIndex].materials.findIndex(m => m.id === material);
        if (matIndex < 0) {
          state.items[itemIndex].materials.push({ id: material, count: 0, given: 0, checked: false });
        } else {
          state.items[itemIndex].materials[matIndex].count -= 1;
        }
      }
    },
    changeStatus(state, action) {
      const { item, status } = action.payload;
      const itemIndex = state.statuses?.findIndex(i => i.id === item);

      if (itemIndex == 'undefined' || itemIndex < 0) {
        state.statuses.push({ id: item, status });
      } else {
        state.statuses[itemIndex].status = status;
      }
    },
    checkMaterial(state, action) {
      const { item, material } = action.payload;
      const itemIndex = state.items.findIndex(i => i.id === item);
      if (itemIndex < 0) {
        state.items.push({ id: item, materials: [{ id: material, count: 0, given: 0, checked: true }] });
      } else {
        const matIndex = state.items[itemIndex].materials.findIndex(m => m.id === material);
        if (matIndex < 0) {
          state.items[itemIndex].materials.push({ id: material, count: 0, given: 0, checked: true });
        } else {
          state.items[itemIndex].materials[matIndex].checked = !state.items[itemIndex].materials[matIndex].checked;
        }
      }
    },
  },
});

export default listsSlice.reducer;

export const { incrementMaterial, incrementGiven, decrementMaterial, changeStatus, checkMaterial, incrementHolding, decrementHolding } =
  listsSlice.actions;
