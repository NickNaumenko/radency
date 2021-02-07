import React from 'react';
import { useSelector } from 'react-redux';
import { employeesSelectors } from './employeesSlice';
import tableHeaders from '../../config/tableHeaders.json';
import Trow from './Trow';

const Employees = () => {
  const employees = useSelector(employeesSelectors.selectIds);
  console.log(employees, employeesSelectors);
  return (
    <table>
      <thead>
        <tr>
          {tableHeaders.map(({ label }) => (<th key={label}>{label}</th>))}
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <Trow
            key={employee}
            employeeId={employee}
            headers={tableHeaders}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Employees;
