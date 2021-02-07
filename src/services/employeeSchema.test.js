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
  test('valid employee data', () => {
    expect(employeeSchema.validate(validEmployee)).toBeUndefined();
  });

  describe('Full name validation', () => {
    test('Full name is missed', () => {
      const employee = { ...validEmployee, fullName: null };
      expect(employeeSchema.validate(employee)).toEqual({ fullName: 'This field is required' });
    });
  });
  describe('Email validation', () => {
    emails.valid.forEach((email) => {
      test('valid email', () => {
        const employee = { ...validEmployee, email };
        expect(employeeSchema.validate(employee)).toBeUndefined();
      });
    });
    emails.invalid.forEach((email) => {
      test('invalid email', () => {
        const employee = { ...validEmployee, email };
        expect(employeeSchema.validate(employee)).toEqual({ email: 'Input is not a valid email' });
      });
    });
  });
  describe('Age validation', () => {
    const valid = [21, 33, 100];
    valid.forEach((age) => {
      test('Valid age', () => {
        const employee = { ...validEmployee, age };
        expect(employeeSchema.validate(employee)).toBeUndefined();
      });
    });
    test('positive', () => {
      const employee = { ...validEmployee, age: -33 };
      expect(employeeSchema.validate(employee)).toEqual({ age: 'Input must be positive' });
    });
    test('At least 21', () => {
      const employee = { ...validEmployee, age: 20 };
      expect(employeeSchema.validate(employee)).toEqual({ age: 'Input is too small' });
    });
    test('Integer', () => {
      const employee = { ...validEmployee, age: 20.5 };
      expect(employeeSchema.validate(employee)).toEqual({ age: 'Input must be an integer' });
    });
  });

  describe('Experience validation', () => {
    test('Error if missed', () => {
      const employee = { ...validEmployee, experience: null };
      expect(employeeSchema.validate(employee)).toMatchObject({ experience: /.*/ });
    });
  });

  describe('Yearly income validation', () => {
    test('Error if is missed', () => {
      const employee = { ...validEmployee, yearlyIncome: null };
      expect(employeeSchema.validate(employee)).toMatchObject({ yearlyIncome: /.*/ });
    });
  });

  describe('Yearly income validation', () => {
    test('Error if is missed', () => {
      const employee = { ...validEmployee, yearlyIncome: null };
      expect(employeeSchema.validate(employee)).toMatchObject({ yearlyIncome: /.*/ });
    });
  });

  describe('Date validation', () => {
    const d = new Date(Date.now() + 1e5);
    const yyyy = d.getFullYear();
    const valid = [`${yyyy + 1}-12-31`, `12/31/${yyyy}`];
    const invalid = `${yyyy - 1}-12-31`;
    valid.forEach((expirationDate) => {
      test('valid date', () => {
        const employee = { ...validEmployee, expirationDate };
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
        employeeSchema.validate({ ...validEmployee, expirationDate: invalid }),
      ).toMatchObject({ expirationDate: /^Date must be after/ });
    });
    test('Error if is missed', () => {
      const employee = { ...validEmployee, expirationDate: null };
      expect(employeeSchema.validate(employee)).toMatchObject({ expirationDate: /.*/ });
    });
  });
  describe('license States', () => {
    const valid = ['AL', 'Alabama', 'AL|', 'AL|Delaware', 'Federated States Of Micronesia'];
    const invalid = ['UA', 'Ukraine'];
    valid.forEach((licenseStates) => {
      test('valid license states', () => {
        const employee = { ...validEmployee, licenseStates };
        expect(employeeSchema.validate(employee)).toBeUndefined();
      });
    });
    invalid.forEach((licenseStates) => {
      test('invalid license states', () => {
        const employee = { ...validEmployee, licenseStates };
        expect(employeeSchema.validate(employee)).toMatchObject({ licenseStates: 'Input is not valid state' });
      });
    });
  });
  describe('Has children', () => {
    describe('Excepts bool values', () => {
      const valid = [true, false, '', null, undefined];
      const invalid = ['noTrue', 'no false', 0, -0];
      valid.forEach((hasChildren) => {
        test('valid Has children field', () => {
          const employee = { ...validEmployee, hasChildren };
          expect(employeeSchema.validate(employee)).toBeUndefined();
        });
      });
      invalid.forEach((hasChildren) => {
        test('invalid Has children field', () => {
          const employee = { ...validEmployee, hasChildren };
          expect(employeeSchema.validate(employee)).toMatchObject({ hasChildren: 'Input should be bool or null' });
        });
      });
    });
  });
  describe('License number', () => {
    test('Valid license number', () => {
      const employee = { ...validEmployee, licenseNumber: '1xr567' };
      expect(employeeSchema.validate(employee)).toBeUndefined();
    });
    test('Invalid license number', () => {
      const employee = { ...validEmployee, licenseNumber: '4%r567' };
      expect(employeeSchema.validate(employee)).not.toBeUndefined();
    });
  });
});
