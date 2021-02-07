import React from 'react';
import { useDispatch } from 'react-redux';
import { parseEmployees } from '../../features/Employees/employeesSlice';
import loadFile from '../../helpers/loadFile';

const CSVInput = () => {
  const dispatch = useDispatch();

  const onChange = async (e) => {
    const file = e.target.files[0];
    const { type } = file;
    const data = await loadFile(file);
    dispatch(parseEmployees({ type, data }));
  };

  return <input type="file" onChange={onChange} />;
};

export default CSVInput;
