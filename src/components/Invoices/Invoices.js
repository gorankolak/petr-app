import React from 'react';
import Invoice from './InvoicesStyle';
import { DefaultTable } from '../Table/Table';

function Invoices() {
  return (
    <Invoice>
      <h2>Računi</h2>
      <DefaultTable />
    </Invoice>
  );
}

export default Invoices;
