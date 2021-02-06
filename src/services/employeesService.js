import Nope from 'nope-validator';
import { dateRegexp } from '../helpers/dateRegexp';
import findDuplicates from '../helpers/findDuplicates';
import idGenerator from '../helpers/idGenerator';

const UNIQUE_FIELDS = ['fullName', 'phone', 'email'];
const REQUIRED_FIELDS = new Set(['fullName', 'phone', 'email']);
const START_ID = 1;

const employeeSchema = Nope.object().shape({
  fullName: Nope.string().required(),
  phone: Nope.string().required(),
  email: Nope.string().email().required(),
  age: Nope.number().positive().min(21),
  experience: Nope.number().positive().integer().max(21),
  yearlyIncome: Nope.number().positive(),
  hasChildren: Nope.boolean(),
  licenseStates: Nope.string(),
  expirationDate: Nope.string()
    .regex(dateRegexp)
    .test((value) => Nope.date().after(new Date()).validate(value)),
  licenseNumber: Nope.string().exactLength(6),
});

export const process = async (loadedData) => {
  const getId = idGenerator(START_ID);

  const employees = loadedData.map(({ data }) => {
    data.id = getId();
    return data;
  });

  const withDuplicates = findDuplicates(employees, UNIQUE_FIELDS);

  return withDuplicates;
};

export const validate = (employees) => {
  const validationErrors = {};
  employees.forEach((employee) => {
    const errors = employeeSchema.validate(employee, {
      abortEarly: false,
    });

    if (errors) {
      const isMissingRequired = [...Object.keys(errors)]
        .some((field) => REQUIRED_FIELDS.has(field));

      if (isMissingRequired) {
        throw new Error('Missing required field');
      }
      validationErrors[employee.id] = errors;
    }
  });

  return validationErrors;
};

export const processAndValidate = async (loadedData) => {
  const employees = await process(loadedData);
  const validationErrors = validate(employees);
  return { employees, validationErrors };
};
