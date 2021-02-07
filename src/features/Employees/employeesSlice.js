import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { processAndValidate } from '../../services/employeesService';

const employeesAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
  sortComparer: ({ id: id1 }, { id: id2 }) => id1 - id2,
});

const initialState = employeesAdapter.getInitialState({
  validationErrors: {},
  error: null,
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
  initialState,
  reducers: {
    removeEmployees() {
      return initialState;
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

export const { removeEmployees } = employeesSlice.actions;

export const employeesSelectors = {
  ...(employeesAdapter.getSelectors(
    ({ employees }) => employees,
  )),
  selectValidationErrorsById: ({ employees }, id) => employees.validationErrors[id],
  selectError: ({ employees }) => employees.error,
};

export default employeesSlice.reducer;
