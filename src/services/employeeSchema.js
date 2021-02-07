import Nope from 'nope-validator';
import states from 'states-us';

const statesUS = new Set();
states.forEach(({ abbreviation, name }) => {
  statesUS.add(abbreviation);
  statesUS.add(name);
});

const NOW = new Date();
export const DATE_REGEXP = /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$|^(0[1-9]|1[012])\/([123]0|[012][1-9]|31)\/(19[0-9]{2}|2[0-9]{3})$/;
export const EMPLOYEE_REQUIRED_FIELDS = new Set(['fullName', 'phone', 'email']);
export const EMPLOYEE_UNIQUE_FIELDS = ['fullName', 'phone', 'email'];

const employeeSchema = Nope.object().shape({
  fullName: Nope.string().required(),
  phone: Nope.string().regex(/^(\+?1)?\d{10}$/).required(),
  email: Nope.string().email().required(),
  age: Nope.number().positive().integer().atLeast(21),
  experience: Nope.number().positive().integer().atMost(21),
  yearlyIncome: Nope.number().positive().atMost(1e6),
  hasChildren: Nope.string().test((value) => (value === 'true' || 'false' || 'null' || 'undefined' || '' ? undefined : 'Input should be bool or null')),
  licenseStates: Nope.string(),
  expirationDate: Nope.string()
    .regex(DATE_REGEXP)
    .test((value) => Nope.date().after(NOW).validate(value)),
  licenseNumber: Nope.string().exactLength(6),
});

export default employeeSchema;
