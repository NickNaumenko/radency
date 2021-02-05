import React from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from './employeesSlice';

const Employees = () => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(addEmployee({ name: 'Nick' }));
  return (
    <div>
      <button type="button" onClick={handleClick}>Click</button>
    </div>
  );
};

export default Employees;
