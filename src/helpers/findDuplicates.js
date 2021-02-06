const transform = (value) => {
  if (typeof value === 'string') {
    return value.toLowerCase();
  }
  return value;
};

const findDuplicates = (data, fields = [], { id } = { id: 'id' }) => {
  const map = Object.fromEntries(fields.map((field) => [field, new Map()]));

  return data.map((obj) => {
    for (let i = 0; i < fields.length; i++) {
      const fieldName = fields[i];
      const fieldValue = transform(obj[fieldName]);

      if (!map[fieldName].has(fieldValue)) {
        map[fieldName].set(fieldValue, obj[id]);
      } else {
        obj.duplicate = map[fieldName].get(fieldValue);
        break;
      }
    }
    return obj;
  });
};

export default findDuplicates;
