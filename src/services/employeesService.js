import findDuplicates from '../helpers/findDuplicates';
import idGenerator from '../helpers/idGenerator';

const UNIQUE_FIELDS = ['fullName', 'phone', 'email'];

export const validate = async (loadedData) => {
  const getId = idGenerator(1);

  const employees = loadedData.map(({ data }) => {
    data.id = getId();
    return data;
  });

  const withDuplicates = findDuplicates(employees, UNIQUE_FIELDS);

  return withDuplicates;
};
