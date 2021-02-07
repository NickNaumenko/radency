import findDuplicates from '../helpers/findDuplicates';
import idGenerator from '../helpers/idGenerator';
import CSVParser from './CSVParser';
import employeeSchema, {
  EMPLOYEE_REQUIRED_FIELDS,
  EMPLOYEE_UNIQUE_FIELDS,
} from './employeeSchema';
import Validator from './Validator';

const fileTypes = new Set(['text/csv']);
const START_ID = 1;

const validator = new Validator(employeeSchema, EMPLOYEE_REQUIRED_FIELDS);

export const process = (data) => {
  const getId = idGenerator(START_ID);

  const employees = data.map((obj) => {
    obj.id = getId();
    return obj;
  });

  const withDuplicates = findDuplicates(employees, EMPLOYEE_UNIQUE_FIELDS);

  return withDuplicates;
};

export const parseAndProcessCSV = async (fileOrURL, type) => {
  if (type && !fileTypes.has(type)) {
    throw new Error('Incorrect file type');
  }
  let parsed;
  if (type) {
    parsed = await CSVParser.parse(fileOrURL);
  } else {
    parsed = await CSVParser.downloadAndParse(fileOrURL);
  }

  const employees = process(parsed.data);
  const validationErrors = validator.validateArray(employees);

  return { employees, validationErrors };
};
