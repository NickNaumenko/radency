import React from 'react';
import { useSelector } from 'react-redux';
import { PHONE_REGEXP } from '../../services/employeeSchema';
import { employeesSelectors } from './employeesSlice';
import { StyledTd } from './styles';

const fieldTypes = {
  phone(val) {
    const phone = String(val);
    return phone.match(PHONE_REGEXP) ? `+1${phone.slice(-10)}` : val;
  },
  hasChildren(val) {
    return String(val).toUpperCase();
  },
  yearlyIncome(val) {
    return typeof val === 'number' ? val.toFixed(2) : val;
  },
};
const formatField = (accessor, val) => (
  fieldTypes[accessor] ? fieldTypes[accessor](val) : val
);

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
          {formatField(accessor, employee[accessor])}
        </StyledTd>
      ))}
    </tr>
  );
};

export default Trow;
