import React from 'react';
import Invoice from './InvoicesStyle';
import { DefaultTable } from '../Table/Table';
import MOCK_DATA from '../Table/MOCK_DATA.json';
import { COLUMNS } from '../Table/Columns';

function Invoices() {
  // const MOCK_DATA = [
  //   {
  //     id: 666,
  //     datum: '2/9/2020',
  //     broj_racuna: 10,
  //     otpremnica: 32,
  //   },
  //   {
  //     id: 6632326,
  //     datum: '2/29/2020',
  //     broj_racuna: 130,
  //     otpremnica: 332,
  //   },
  // ];
  return (
    <Invoice>
      <h2>Računi</h2>
      <DefaultTable appData={MOCK_DATA} tableColumns={COLUMNS} />
    </Invoice>
  );
}

export default Invoices;
