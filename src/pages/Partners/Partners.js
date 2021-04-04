import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from '../../services/db';

import { DefaultTable } from '../../components/Table/Table';
import { MainFooter } from '../../components/mainFooter/mainFooter';
import TableContainer from './PartnersStyle';
import AddPartner from './AddPartner';

const Partners = () => {
  const [partnersAll, setPartnersAll] = useState('');
  const path = 'partner';

  useEffect(() => {
    const getPartners = async () => {
      const partnersDb = await db.partners.toArray();

      setPartnersAll(partnersDb);
    };

    getPartners();
  }, []);

  const COLUMNS = [
    {
      Header: 'Naziv',
      accessor: 'name',
    },
    {
      Header: 'Adresa',
      accessor: 'address',
    },
    {
      Header: 'Datum dodavanja',
      accessor: 'dateAdded',
    },
  ];

  let partnersData;

  if (partnersAll != '') {
    partnersData = (
      <>
        <DefaultTable
          path={path}
          appData={partnersAll}
          tableColumns={COLUMNS}
        />

        <MainFooter btnText="Dodaj partnera" link="/add-partner" />
      </>
    );
  } else {
    partnersData = (
      <>
        <h3>Nema dostupnih podataka</h3>
        <MainFooter btnText="Dodaj partnera" link="/add-partner" />
      </>
    );
  }

  return (
    <div>
      <h2>Partneri</h2>

      {partnersData}
    </div>
  );
};

export default Partners;
