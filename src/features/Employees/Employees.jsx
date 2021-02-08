import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { employeesSelectors, parseEmployees } from './employeesSlice';
import tableHeaders from '../../config/tableHeaders.json';
import Trow from './Trow';
import {
  ErrorMessage,
  MessageWrapper,
  NoRows,
  StyledTable, TableWrapper,
} from './styles';
import { statuses } from '../../helpers/constants';
import Loader from '../../components/shared/Loader/Loader';
import data from '../../data/1K.csv';

const Employees = () => {
  const employees = useSelector(employeesSelectors.selectIds);
  const status = useSelector(employeesSelectors.selectStatus);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(parseEmployees({ data }));
  }, []);

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
      {!employees.length && (
      <NoRows>
        ¯\_(ツ)_/¯
        <br />
        There is no data
      </NoRows>
      )}
    </TableWrapper>
  );
};

export default Employees;
