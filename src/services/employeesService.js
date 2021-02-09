import findDuplicates from '../helpers/findDuplicates';
import idGenerator from '../helpers/idGenerator';
import CSVParser from './CSVParser';
import employeeSchema, {
  EMPLOYEE_REQUIRED_FIELDS,
  EMPLOYEE_UNIQUE_FIELDS,
} from './employeeSchema';
import Formatter from './Formatter';
import Validator from './Validator';

const fileTypes = new Set(['text/csv']);
const START_ID = 1;
const fields = {
  phone(val, isValid) {
    return isValid ? `+1${String(val).slice(-10)}` : val;
  },
  hasChildren(val, isValid) {
    return isValid ? String(Boolean(val)).toUpperCase() : val;
  },
  yearlyIncome(val, isValid) {
    return isValid ? val.toFixed(2) : val;
  },
};

const parser = new CSVParser();
const validator = new Validator(employeeSchema, EMPLOYEE_REQUIRED_FIELDS);
const formatter = new Formatter(fields);

const assignIds = (data) => {
  const getId = idGenerator(START_ID);

  return data.map((obj) => {
    obj.id = getId();
    return obj;
  });
};

const processData = (data) => {
  const employees = assignIds(data);
  const validationErrors = validator.validateArray(employees);
  const formatted = formatter.formatArrayOf(employees, validationErrors);
  const withDuplicates = findDuplicates(formatted, EMPLOYEE_UNIQUE_FIELDS);

  return { employees: withDuplicates, validationErrors };
};

export const parse = async ({ data, meta: { type } }) => {
  if (!fileTypes.has(type)) {
    throw new Error('Incorrect file type');
  }
  await new Promise((res) => setTimeout(res)); // Enqueue to macrotasks to render loader before work
  const parsed = await parser.parse(data);

  return processData(parsed.data);
};

export const downloadAndParse = async (url) => {
  const parsed = await parser.downloadAndParse(url);

  return processData(parsed.data);
};
