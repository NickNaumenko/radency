import camelCase from 'lodash/camelCase';
import React from 'react';
import { CSVReader } from 'react-papaparse';
import { useDispatch } from 'react-redux';
import { validateEmployees } from '../../features/Employees/employeesSlice';

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
  const dispatch = useDispatch();

  const onFileLoad = (data) => {
    console.log(data);
    dispatch(validateEmployees(data));
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
