import Papa from 'papaparse';
import { camelCase } from 'lodash';

const baseConfig = {
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

class CSVParser {
  static async parse(file) {
    return Papa.parse(file, baseConfig);
  }

  static downloadAndParse(url) {
    return new Promise((res, rej) => {
      const config = {
        ...baseConfig,
        download: true,
        complete: res,
        error: rej,
      };
      Papa.parse(url, config);
    });
  }
}

export default CSVParser;
