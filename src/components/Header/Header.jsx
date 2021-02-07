import React from 'react';
import MainInput from '../CSVInput/MainInput';
import Container from '../shared/Container/Container';
import { HeaderContent, StyledHeader } from './styles';

const Header = () => (
  <StyledHeader>
    <Container>
      <HeaderContent>
        <MainInput />
      </HeaderContent>
    </Container>
  </StyledHeader>
);

export default Header;
