import React, { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
// import MOCK_DATA from './MOCK_DATA.json';
// import { COLUMNS } from './Columns';

import TableContainer from './TableStyle';

export const DefaultTable = (props) => {
  const columns = useMemo(() => props.tableColumns, []);
  const data = useMemo(() => props.appData, []);

  // const tableInstance = useTable({
  //   columns,
  //   data,
  // });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  return (
    <TableContainer>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="table-nav">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Prethodno
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Slijedeće
        </button>
      </div>
    </TableContainer>
  );
};
