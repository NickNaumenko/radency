import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { statuses } from '../../helpers/constants';
import { parseAndProcessCSV } from '../../services/employeesService';

const employeesAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
  sortComparer: ({ id: id1 }, { id: id2 }) => id1 - id2,
});

const initialState = employeesAdapter.getInitialState({
  validationErrors: {},
  error: null,
  status: statuses.IDLE,
});

export const parseEmployees = createAsyncThunk(
  'employees/parse',
  async ({ type, data }) => {
    const result = await parseAndProcessCSV(data, type);
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
    [parseEmployees.pending]: (state) => {
      state.status = statuses.LOADING;
    },
    [parseEmployees.fulfilled]: (state, { payload }) => {
      const { employees, validationErrors } = payload;
      employeesAdapter.setAll(state, employees);
      state.validationErrors = validationErrors;
      state.status = statuses.SUCCEEDED;
    },
    [parseEmployees.rejected]: (state, { error }) => {
      state.error = error;
      state.status = statuses.FAILED;
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
  selectStatus: ({ employees }) => employees.status,
};

export default employeesSlice.reducer;
