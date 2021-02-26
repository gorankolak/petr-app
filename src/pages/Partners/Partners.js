import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from '../../services/db';

import { DefaultTable } from '../../components/Table/Table';
import TableContainer from './PartnersStyle';

const Partners = () => {
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

  const path = 'partner';

  return (
    <div>
      <h2>Partneri</h2>

      <DefaultTable path={path} appData={baza} tableColumns={COLUMNS} />
    </div>
  );
};

export default Partners;
