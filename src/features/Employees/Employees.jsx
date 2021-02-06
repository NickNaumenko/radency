import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployees } from './employeesSlice';
import data from '../../mocks/csvjson.json';
import FileInput from '../FileInput/FileInput';

data.forEach((val, i) => {
  val.id = i + 1;
});

const Employees = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addEmployees(data));
  });

  return (
    <div>
      <FileInput />
    </div>
  );
};

export default Employees;
