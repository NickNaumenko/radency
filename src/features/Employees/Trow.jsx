import React from 'react';
import { useSelector } from 'react-redux';
import { PHONE_REGEXP } from '../../services/employeeSchema';
import { employeesSelectors } from './employeesSlice';
import { StyledTd } from './styles';

const Trow = ({ employeeId, headers }) => {
  const selectEmployee = (state) => employeesSelectors.selectById(state, employeeId);
  const selectValidationErrors = (state) => (
    employeesSelectors.selectValidationErrorsById(state, employeeId)
  );
  const employee = useSelector(selectEmployee);
  const validationErrors = useSelector(selectValidationErrors);

  const formatValue = (accessor) => {
    const val = employee[accessor];
    if (typeof val === 'boolean') {
      return String(val).toUpperCase();
    }
    if (accessor === 'phone') {
      const phone = String(val);
      if (phone.match(PHONE_REGEXP)) {
        return `+1${phone.slice(-10)}`;
      }
    }
    return val;
  };

  return (
    <tr>
      {headers.map(({ accessor }) => (
        <StyledTd key={accessor} error={validationErrors && validationErrors[accessor]}>
          {formatValue(accessor)}
        </StyledTd>
      ))}
    </tr>
  );
};

export default Trow;
