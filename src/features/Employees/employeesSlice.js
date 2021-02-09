import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { statuses } from '../../helpers/constants';
import { downloadAndParse, parse } from '../../services/employeesService';

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
  async (payload) => {
    const result = await parse(payload);
    return result;
  },
);

export const downloadAndParseEmployees = createAsyncThunk(
  'employees/downloadAndParse',
  async ({ url }) => {
    const result = await downloadAndParse(url);
    return result;
  },
);

const setLoading = (state) => {
  state.status = statuses.LOADING;
};
const setEmployees = (state, { payload }) => {
  const { employees, validationErrors } = payload;
  employeesAdapter.setAll(state, employees);
  state.validationErrors = validationErrors;
  state.status = statuses.SUCCEEDED;
};
const rejectEmployees = (state, { error }) => {
  state.error = error;
  state.status = statuses.FAILED;
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    removeEmployees() {
      return initialState;
    },
  },
  extraReducers: {
    [parseEmployees.pending]: setLoading,
    [parseEmployees.fulfilled]: setEmployees,
    [parseEmployees.rejected]: rejectEmployees,
    [downloadAndParseEmployees.pending]: setLoading,
    [downloadAndParseEmployees.fulfilled]: setEmployees,
    [downloadAndParseEmployees.rejected]: rejectEmployees,
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
