import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../../services/db';

import { DefaultTable } from '../../components/Table/Table';
import { MainFooter } from '../../components/mainFooter/mainFooter';
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
      accessor: 'invoiceType',
    },
    {
      Header: 'Stanje',
      accessor: 'invoiceState',
    },
    {
      Header: 'Ukupan iznos',
      accessor: 'invoiceTotal',
    },
  ];

  const path = 'invoice';

  return (
    <Invoice>
      <h2>Računi</h2>
      <DefaultTable path={path} appData={invoicesDb} tableColumns={COLUMNS} />

      <MainFooter>
        <Link to="/add-invoice">
          <button>Napravi novi račun</button>
        </Link>
      </MainFooter>
    </Invoice>
  );
};

export default Invoices;
