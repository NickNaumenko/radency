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
import { statuses } from '../../helpers/constants';
import Loader from '../../components/shared/Loader/Loader';

const Employees = () => {
  const employees = useSelector(employeesSelectors.selectIds);
  const status = useSelector(employeesSelectors.selectStatus);

  if (status === statuses.IDLE) {
    return <></>;
  }
  if (status === statuses.LOADING) {
    return <Loader />;
  }
  if (status === statuses.FAILED) {
    return (
      <MessageWrapper>
        <ErrorMessage>
          File format is not correct
        </ErrorMessage>
      </MessageWrapper>
    );
  }
  return (
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
