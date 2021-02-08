import React from 'react';
import { useSelector } from 'react-redux';
import { employeesSelectors } from './employeesSlice';
import { StyledTd } from './styles';

const Trow = ({ employeeId, headers }) => {
  const selectEmployee = (state) => employeesSelectors.selectById(state, employeeId);
  const selectValidationErrors = (state) => (
    employeesSelectors.selectValidationErrorsById(state, employeeId)
  );
  const employee = useSelector(selectEmployee);
  const validationErrors = useSelector(selectValidationErrors) || {};

  return (
    <tr>
      {headers.map(({ accessor }) => (
        <StyledTd key={accessor} error={validationErrors[accessor]}>
          {employee[accessor]}
        </StyledTd>
      ))}
    </tr>
  );
};

export default Trow;
