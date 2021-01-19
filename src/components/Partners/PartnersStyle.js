import styled from 'styled-components';

const TableContainer = styled.div`
  padding: 1rem;

  button {
    padding: 0.25rem 0.5rem;
    background: ${(props) => props.theme.color.snow};
    color: ${(props) => props.theme.color.eerie_black};
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;
  }

  table {
    width: 100%;
    text-align: left;

    thead {
      background: ${(props) => props.theme.color.eerie_black};

      th {
        padding: 0.5rem;
      }
    }

    tbody {
      td {
        padding: 0.5rem 1rem;
      }
    }
  }
`;

export default TableContainer;
