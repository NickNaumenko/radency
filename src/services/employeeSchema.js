import Nope from 'nope-validator';
import states from 'states-us';

export const statesUS = new Set();
states.forEach(({ abbreviation, name }) => {
  statesUS.add(abbreviation);
  statesUS.add(name);
});

const NOW = new Date();
export const DATE_REGEXP = /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$|^(0[1-9]|1[012])\/([123]0|[012][1-9]|31)\/(19[0-9]{2}|2[0-9]{3})$/;
export const EMPLOYEE_REQUIRED_FIELDS = new Set(['fullName', 'phone', 'email']);
export const EMPLOYEE_UNIQUE_FIELDS = ['phone', 'email'];
const VALID_HAS_CHILDREN = new Set([true, false, null, undefined, 'true', 'false', 'null', 'undefined', '']);

const employeeSchema = Nope.object().shape({
  fullName: Nope.string().required(),
  phone: Nope.string().regex(/^(\+?1)?\d{10}$/).required(),
  email: Nope.string().email().required(),
  age: Nope.number().positive().integer().atLeast(21),
  experience: Nope.number().positive().integer().atMost(21),
  yearlyIncome: Nope.number().positive().atMost(1e6),
  hasChildren: Nope.string().test((value) => (VALID_HAS_CHILDREN.has(value) ? undefined : 'Input should be bool or null')),
  licenseStates: Nope.string().test((str) => {
    if (typeof str !== 'string') {
      return 'Input is not valid state';
    }
    const statesArr = str.split('|').filter(Boolean);
    if (statesArr.some((state) => !statesUS.has(state))) {
      return 'Input is not valid state';
    }
    return undefined;
  }),
  expirationDate: Nope.string()
    .regex(DATE_REGEXP)
    .test((value) => Nope.date().after(NOW).validate(value)),
  licenseNumber: Nope.string().exactLength(6).regex(/(\d|\w){6}/),
});

export default employeeSchema;
