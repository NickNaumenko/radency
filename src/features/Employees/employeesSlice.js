import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { validate } from '../../services/employeesService';

const employeesAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
  sortComparer: ({ id: id1 }, { id: id2 }) => id1 - id2,
});

export const validateEmployees = createAsyncThunk(
  'employees/validate',
  async (loadedData) => {
    const result = await validate(loadedData);
    return result;
  },
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState: employeesAdapter.getInitialState(),
  reducers: {
    addEmployees(state, action) {
      employeesAdapter.setAll(state, action.payload);
    },
  },
  extraReducers: {
    [validateEmployees.fulfilled]: (state, { payload }) => {
      employeesAdapter.setAll(state, payload);
    },
  },
});

export const { addEmployees } = employeesSlice.actions;

export default employeesSlice.reducer;
