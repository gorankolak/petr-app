import styled from 'styled-components';

const TableContainer = styled.div`
  table {
    width: 100%;
    /* background: ${(props) => props.theme.color.snow}; */
    border-collapse: collapse;
    thead {
      background: rgba(255, 255, 255, 0.2);
      text-align: left;

      th {
        padding: 0.25rem 1rem;
      }
    }

    tbody {
      td {
        padding: 0.25rem 1rem;
        border-bottom: 1px solid #eee;
      }
    }
  }

  .table-nav {
    margin-top: 1rem;

    button {
      padding: 0.25rem 1rem;
      /* background: ${(props) => props.theme.color.snow}; */
      cursor: pointer;
    }
  }
`;

export default TableContainer;
