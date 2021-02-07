import styled from 'styled-components';

export const TableWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  max-height: calc(100vh - 80px);
  margin: 0 auto;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  min-width: 100%;
  border-collapse: collapse;
  border-right: 2px solid var(--color-primary-4);

  thead {
    position: sticky;
    top: 0;
    background-color: var(--color-primary-1);
  }

  tbody {
    height: 100px;
    max-height: 100px;
    overflow-y: auto;    
  }

  th,
  td {
    padding: 0.25em 0.5em;
  }

  th {
    position: sticky;
    top: 0;
    color: var(--color-primary-4);
    background-color: var(--color-primary-1);
    box-shadow: inset 2px 2px var(--color-primary-4), 0 2px var(--color-primary-4);
  }

  td {
    box-shadow: inset 2px -2px var(--color-primary-4);
  }
`;

export const StyledTd = styled.td`
  background-color: ${({ error }) => error && 'var(--color-secondary-2-1)'};
`;

export const MessageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
`;

export const ErrorMessage = styled.div`
  padding: 2em;
  font-size: 18px;
  text-align: center;
  background-color: var(--color-secondary-2-1);
`;
