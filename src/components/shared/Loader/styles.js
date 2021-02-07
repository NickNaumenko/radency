import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const StyledLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.3);

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    margin-top: -50px;
    margin-left: -50px;
    border: 10px solid var(--color-primary-3);
    border-right-color: transparent;
    border-radius: 50%;
    animation: ${rotate} 1s ease-in-out infinite;
  }

  &::after {
    content: 'Loading...';
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    margin-top: -45px;
    margin-left: -40px;
  }
`;
