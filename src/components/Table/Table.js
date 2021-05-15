import React, { useMemo, useEffect } from 'react';
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from 'react-table';
import db from '../../services/db';

import { useHistory } from 'react-router-dom';
// import MOCK_DATA from './MOCK_DATA.json';
// import { COLUMNS } from './Columns';

import { Button } from '../Components';
import TableContainer from './TableStyle';

export const DefaultTable = (props) => {
  const columns = useMemo(() => props.tableColumns, []);
  // not getting data when useMemo() - not working?
  // const data = useMemo(() => props.appData, []);
  const data = props.appData;
  const pathProp = props.path;
  const history = useHistory();

  const handleRowClick = (row) => {
    console.log(row.original.invoiceNumber);

    history.push({
      // pathname: '/partner',
      pathname: `${pathProp}`,
      state: {
        row: row,
      },
    });
  };
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
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;

  return (
    <TableContainer>
      <div className="search">
        <span>Pretraga:</span>
        <input
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr onClick={() => handleRowClick(row)} {...row.getRowProps()}>
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
        <Button
          tableBtn
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Prethodno
        </Button>
        <Button tableBtn onClick={() => nextPage()} disabled={!canNextPage}>
          Slijedeće
        </Button>
      </div>
    </TableContainer>
  );
};
