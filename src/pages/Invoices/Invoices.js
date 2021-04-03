import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../../services/db';

import { DefaultTable } from '../../components/Table/Table';
import Invoice from './InvoicesStyle';

const Invoices = () => {
  const [invoicesDb, setinvoicesDb] = useState([]);

  useEffect(() => {
    const getInvoices = async () => {
      const invoices = await db.invoices.toArray();

      setinvoicesDb(invoices);
    };

    getInvoices();
  }, []);

  const COLUMNS = [
    {
      Header: 'Br.',
      accessor: 'invoiceNumber',
    },
    {
      Header: 'Partner',
      accessor: 'partner',
    },
    {
      Header: 'Datum izdavanja',
      accessor: 'invoiceDate',
    },
    {
      Header: 'Vrsta računa',
      accessor: 'type',
    },
    {
      Header: 'Iznos',
      accessor: 'price',
    },
    {
      Header: 'Stanje',
      accessor: 'state',
    },
  ];

  const path = 'invoice';

  return (
    <Invoice>
      <h2>Računi</h2>
      <DefaultTable path={path} appData={invoicesDb} tableColumns={COLUMNS} />

      <div>
        <Link to="/add-invoice">
          <button>Dodaj novi račun</button>
        </Link>
      </div>
    </Invoice>
  );
};

export default Invoices;
