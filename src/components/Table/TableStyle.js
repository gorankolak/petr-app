import styled from 'styled-components';

const TableContainer = styled.div`
  margin-bottom: 1rem;

  .search {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    padding: 0 1rem 1rem;
    font-size: 14px;

    span {
      margin: 0 0.5rem 0 0;
    }
  }

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
        max-width: 200px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }

  .table-nav {
    margin-top: 1rem;
  }
`;

export default TableContainer;
