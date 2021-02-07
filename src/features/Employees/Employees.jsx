import React from 'react';
import { useSelector } from 'react-redux';
import { employeesSelectors } from './employeesSlice';
import tableHeaders from '../../config/tableHeaders.json';
import Trow from './Trow';
import {
  ErrorMessage,
  MessageWrapper,
  StyledTable, TableWrapper,
} from './styles';

const Employees = () => {
  const employees = useSelector(employeesSelectors.selectIds);
  const error = useSelector(employeesSelectors.selectError);

  return error ? (
    <MessageWrapper>
      <ErrorMessage>
        File format is not correct
      </ErrorMessage>
    </MessageWrapper>
  ) : (
    <TableWrapper>
      <StyledTable>
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
      </StyledTable>
    </TableWrapper>
  );
};

export default Employees;
