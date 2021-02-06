import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const employeesAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
  sortComparer: ({ id: id1 }, { id: id2 }) => id1 - id2,
});

const employeesSlice = createSlice({
  name: 'employees',
  initialState: employeesAdapter.getInitialState(),
  reducers: {
    addEmployees(state, action) {
      employeesAdapter.setAll(state, action.payload);
    },
  },
});

export const { addEmployees } = employeesSlice.actions;

export default employeesSlice.reducer;
