import findDuplicates from '../helpers/findDuplicates';
import idGenerator from '../helpers/idGenerator';
import employeeSchema, { EMPLOYEE_REQUIRED_FIELDS, EMPLOYEE_UNIQUE_FIELDS } from './employeeSchema';
import Validator from './Validator';

const START_ID = 1;

export const process = async (loadedData) => {
  const getId = idGenerator(START_ID);

  const employees = loadedData.map(({ data }) => {
    data.id = getId();
    return data;
  });

  const withDuplicates = findDuplicates(employees, EMPLOYEE_UNIQUE_FIELDS);

  return withDuplicates;
};

export const processAndValidate = async (loadedData) => {
  const employees = await process(loadedData);

  const validator = new Validator(employeeSchema, EMPLOYEE_REQUIRED_FIELDS);
  const validationErrors = validator.validateArray(employees);
  return { employees, validationErrors };
};
