class Validator {
  constructor(schema, requiredFields) {
    this.schema = schema;
    this.requiredFields = new Set([...requiredFields]);
  }

  validate(data) {
    const errors = this.schema.validate(data, {
      abortEarly: false,
    });
    if (errors) {
      const isMissingRequired = [...Object.keys(errors)]
        .some((field) => this.requiredFields.has(field));
      if (isMissingRequired) {
        throw new Error('Missing required field');
      }
    }
    return errors;
  }

  validateArray(array) {
    const validationErrors = {};
    array.forEach((element) => {
      const errors = this.validate(element);

      if (errors) {
        validationErrors[element.id] = errors;
      }
    });

    return validationErrors;
  }
}

export default Validator;
