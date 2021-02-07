import React from 'react';
import { useSelector } from 'react-redux';
import { employeesSelectors } from './employeesSlice';

const Trow = ({ employeeId, headers }) => {
  const selectEmployee = (state) => employeesSelectors.selectById(state, employeeId);
  const employee = useSelector(selectEmployee);

  return (
    <tr>
      {headers.map(({ accessor }) => (
        <td key={accessor}>{employee[accessor]}</td>
      ))}
    </tr>
  );
};

export default Trow;
