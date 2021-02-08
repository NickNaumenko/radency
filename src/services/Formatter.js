class Formatter {
  constructor(fields = {}) {
    this.fields = fields;
  }

  format(object, validationErrors = {}) {
    const formatted = {};

    Object.entries(object).forEach(([key, value]) => {
      const isValid = !validationErrors[key];
      formatted[key] = this.fields[key] ? this.fields[key](value, isValid) : value;
    });

    return formatted;
  }

  formatArrayOf(array, validationErrors) {
    return array.map((entity) => this.format(entity, validationErrors[entity.id]));
  }
}

export default Formatter;
