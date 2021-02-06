import camelCase from 'lodash/camelCase';
import React from 'react';
import { CSVReader } from 'react-papaparse';

const config = {
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

const FileInput = () => {
  const onFileLoad = (data) => {
    console.log(data);
  };

  return (
    <CSVReader
      onFileLoad={onFileLoad}
      config={config}
    >
      <button type="button">Import users</button>
    </CSVReader>
  );
};

export default FileInput;
