import React from 'react';
import { useDispatch } from 'react-redux';
import { parseEmployees, removeEmployees } from '../../features/Employees/employeesSlice';
import loadFile from '../../helpers/loadFile';

const CSVInput = ({ onChange = () => {}, ...rest }) => {
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const { type, name } = file;

    onChange(name);
    const data = await loadFile(file);
    dispatch(removeEmployees());
    dispatch(parseEmployees({ type, data }));
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <input {...rest} type="file" onChange={handleChange} />;
};

export default CSVInput;
