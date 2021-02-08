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
  constructor(options) {
    this.config = { ...baseConfig, ...options };
  }

  parseOrDownload(fileOrURL, options) {
    return new Promise((res, rej) => {
      const config = {
        ...this.config,
        ...options,
        complete: res,
        error: rej,
      };
      Papa.parse(fileOrURL, config);
    });
  }

  parse(file) {
    return this.parseOrDownload(file);
  }

  downloadAndParse(url) {
    return this.parseOrDownload(url, { download: true });
  }
}

export default CSVParser;
