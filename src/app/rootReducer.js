import { combineReducers } from 'redux';
import employeesReducer from '../features/Employees/employeesSlice';

export default combineReducers({
  employees: employeesReducer,
});
