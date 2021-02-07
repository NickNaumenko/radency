const { createGlobalStyle } = require('styled-components');

const GlobalStyles = createGlobalStyle`
  :root {
    --color-primary-0: #2A4E6E;
    --color-primary-1: #728DA5;
    --color-primary-2: #4A6B8A;
    --color-primary-3: #133453;
    --color-primary-4: #041F37;

    --color-secondary-1-0: #AAA639;
    --color-secondary-1-1: #FFFCAA;
    --color-secondary-1-2: #D4D06A;
    --color-secondary-1-3: #807B15;
    --color-secondary-1-4: #555200;

    --color-secondary-2-0: #933157;
    --color-secondary-2-1: #DC93AF;
    --color-secondary-2-2: #B85C7F;
    --color-secondary-2-3: #6E1236;
    --color-secondary-2-4: #49001C;

    --color-white: #fefefe;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    line-height: 1.3;
    color: var(--color-primary-4);
  }

  h1 {
    font-size: 25px;
  }

  @media (min-width: 768px) {
    body {
      font-size: 14px;
    }
  }
`;

export default GlobalStyles;
