import styled from 'styled-components';

const TableContainer = styled.div`
  margin-bottom: 1rem;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;

    thead {
      /* background: rgba(255, 255, 255, 0.2); */
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

    /* button {
      padding: 0.25rem 1rem;
      cursor: pointer;
    } */
    button {
      margin-right: 0;

      background: transparent;
      color: ${(props) => props.theme.color.black};
      border: none;
      /* border-bottom: 2px solid ${(props) => props.theme.color.black}; */
      outline: none;
      box-shadow: none;
      text-decoration: underline;

      &:not(:disabled):hover {
        /* background: ${(props) => props.theme.color.dust}; */
        /* border-bottom: 2px solid ${(props) => props.theme.color.dust}; */
        text-decoration: none;
      }

      &:disabled {
        color: ${(props) => props.theme.color.black_disabled};
        /* border-bottom: 2px solid ${(props) =>
          props.theme.color.black_disabled}; */
        cursor: initial;
      }
    }
  }
`;

export default TableContainer;
