import React, { useState } from 'react';
import CSVInput from './CSVInput';
import { StyledLabel } from './styles';

const MainInput = () => {
  const [fileName, setFileName] = useState();
  const onChange = (name) => {
    setFileName(name);
  };

  return (
    <StyledLabel htmlFor="main-input">
      <CSVInput
        id="main-input"
        className="visually-hidden"
        onChange={onChange}
      />
      {fileName || 'Import users'}
    </StyledLabel>
  );
};

export default MainInput;
