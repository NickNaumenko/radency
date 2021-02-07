import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { processAndValidate } from '../../services/employeesService';

const employeesAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
  sortComparer: ({ id: id1 }, { id: id2 }) => id1 - id2,
});

export const validateEmployees = createAsyncThunk(
  'employees/validate',
  async (loadedData) => {
    const result = await processAndValidate(loadedData);
    return result;
  },
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState: employeesAdapter.getInitialState({
    validationErrors: {},
    error: null,
  }),
  reducers: {
    addEmployees(state, action) {
      employeesAdapter.setAll(state, action.payload);
    },
  },
  extraReducers: {
    [validateEmployees.fulfilled]: (state, { payload }) => {
      const { employees, validationErrors } = payload;
      employeesAdapter.setAll(state, employees);
      state.validationErrors = validationErrors;
    },
    [validateEmployees.rejected]: (state, { error }) => {
      state.error = error;
    },
  },
});

export const { addEmployees } = employeesSlice.actions;

export const employeesSelectors = employeesAdapter.getSelectors(
  ({ employees }) => employees,
);

export default employeesSlice.reducer;
