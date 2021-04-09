import styled from 'styled-components';

const TableContainer = styled.div`
  margin-bottom: 1rem;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;

    thead {
      background: transparent;
      text-align: left;
      border-bottom: 1px solid ${(props) => props.theme.color.grey};

      th {
        padding: 0.25rem 1rem 0.5rem;
      }
    }

    tbody {
      tr {
        cursor: pointer;
        transition: all 0.2s linear;

        :hover {
          background: ${(props) => props.theme.color.dust};
          box-shadow: 0 20px 30px 0 rgb(12 0 46 / 5%);
        }

        &:nth-child(even) {
          background: ${(props) => props.theme.color.white_dark};

          &:hover {
            background: ${(props) => props.theme.color.dust};
            box-shadow: 0 20px 30px 0 rgb(12 0 46 / 5%);
          }
        }
      }

      td {
        padding: 0.25rem 1rem;
        border-bottom: 1px solid #eee;
      }
    }
  }

  .table-nav {
    margin-top: 1rem;

    button {
      margin-right: 0;
      padding: 0 1rem;

      background: transparent;
      color: ${(props) => props.theme.color.black};
      border: none;
      outline: none;
      box-shadow: none;
      text-decoration: underline;

      :first-child {
        padding-right: 0;
      }

      &:not(:disabled):hover {
        text-decoration: none;
        background: transparent;
        border: none;
      }

      &:disabled {
        color: ${(props) => props.theme.color.black_disabled};
        cursor: initial;
      }
    }
  }
`;

export default TableContainer;
