import { camelCase } from 'lodash';
import Papa from 'papaparse';
import findDuplicates from '../helpers/findDuplicates';
import idGenerator from '../helpers/idGenerator';
import employeeSchema, { EMPLOYEE_REQUIRED_FIELDS, EMPLOYEE_UNIQUE_FIELDS } from './employeeSchema';
import Validator from './Validator';

const fileTypes = new Set(['text/csv']);
const START_ID = 1;
const parserConfig = {
  header: true,
  transformHeader: camelCase,
  transform: (value) => {
    if (typeof value === 'string') {
      return value.trim();
    }
    return value;
  },
  dynamicTyping: true,
  skipEmptyLines: true,
};

const validator = new Validator(employeeSchema, EMPLOYEE_REQUIRED_FIELDS);

export const process = ({ data }) => {
  const getId = idGenerator(START_ID);

  const employees = data.map((obj) => {
    obj.id = getId();
    return obj;
  });

  const withDuplicates = findDuplicates(employees, EMPLOYEE_UNIQUE_FIELDS);

  return withDuplicates;
};

export const parseAndProcessCSV = async (type, file) => {
  if (!fileTypes.has(type)) {
    throw new Error('Incorrect file type');
  }
  await new Promise((res) => setTimeout(res, 10000));
  const parsed = Papa.parse(file, parserConfig);
  const employees = process(parsed);

  const validationErrors = validator.validateArray(employees);
  return { employees, validationErrors };
};
