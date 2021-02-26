import React, { useEffect, useState } from 'react';
import db from '../../services/db';

import { DefaultTable } from '../../components/Table/Table';
import Invoice from './InvoicesStyle';

const Invoices = () => {
  const [baza, setBaza] = useState([]);

  useEffect(() => {
    const getKupci = async () => {
      const kupci = await db.kupci.toArray();

      setBaza(kupci);
    };

    getKupci();
  }, []);

  const COLUMNS = [
    {
      Header: 'Naziv',
      accessor: 'naziv',
    },
    {
      Header: 'Adresa',
      accessor: 'adresa',
    },
    {
      Header: 'Id',
      accessor: 'id',
    },
  ];

  const path = 'invoice';

  return (
    <Invoice>
      <h2>Računi</h2>
      <DefaultTable path={path} appData={baza} tableColumns={COLUMNS} />
    </Invoice>
  );
};

export default Invoices;
