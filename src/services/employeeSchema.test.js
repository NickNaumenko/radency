import employeeSchema, { DATE_REGEXP } from './employeeSchema';
import emails from '../mocks/emails.json';

const validEmployee = {
  fullName: 'User Userenko',
  phone: '+11234567890',
  email: 'example@gmail.com',
  age: 30,
  experience: 10,
  yearlyIncome: 1200.11,
  hasChildren: true,
  licenseStates: 'Alabama',
  expirationDate: '2022-10-10',
  licenseNumber: '1xr567',
};

describe('Employee schema validation', () => {
  let employee;
  beforeEach(() => {
    employee = { ...validEmployee };
  });
  test('valid employee data', () => {
    expect(employeeSchema.validate(validEmployee)).toBeUndefined();
  });

  describe('Full name validation', () => {
    test('Full name is missed', () => {
      employee = { ...employee, fullName: null };
      expect(employeeSchema.validate(employee)).toEqual({ fullName: 'This field is required' });
    });
  });
  describe('Email validation', () => {
    emails.valid.forEach((email) => {
      test('valid email', () => {
        employee = { ...employee, email };
        expect(employeeSchema.validate(employee)).toBeUndefined();
      });
    });
    emails.invalid.forEach((email) => {
      test('invalid email', () => {
        employee = { ...employee, email };
        expect(employeeSchema.validate(employee)).toEqual({ email: 'Input is not a valid email' });
      });
    });
  });
  describe('Age validation', () => {
    const valid = [21, 33, 100];
    valid.forEach((age) => {
      test('Valid age', () => {
        employee = { ...employee, age };
        expect(employeeSchema.validate(employee)).toBeUndefined();
      });
    });
    test('positive', () => {
      employee = { ...employee, age: -33 };
      expect(employeeSchema.validate(employee)).toEqual({ age: 'Input must be positive' });
    });
    test('At least 21', () => {
      employee = { ...employee, age: 20 };
      expect(employeeSchema.validate(employee)).toEqual({ age: 'Input is too small' });
    });
    test('Integer', () => {
      employee = { ...employee, age: 20.5 };
      expect(employeeSchema.validate(employee)).toEqual({ age: 'Input must be an integer' });
    });
  });
  describe('Date validation', () => {
    const d = new Date(Date.now() + 1e5);
    const yyyy = d.getFullYear();
    const valid = [`${yyyy + 1}-12-31`, `12/31/${yyyy}`];
    const invalid = `${yyyy - 1}-12-31`;
    valid.forEach((expirationDate) => {
      test('valid date', () => {
        employee = { ...employee, expirationDate };
        expect(employeeSchema.validate(employee)).toBeUndefined();
      });
    });
    test('regexp', () => {
      const invalidRegexp = ['1999/12-31', '2001,12,12', '2000/13/32'];
      invalidRegexp.forEach((date) => {
        expect(date).not.toMatch(DATE_REGEXP);
      });
    });
    test('Date must be after', () => {
      expect(
        employeeSchema.validate({ ...employee, expirationDate: invalid }),
      ).toMatchObject({ expirationDate: /^Date must be after/ });
    });
  });
});
