import React, { useState, useEffect } from 'react';
import db from '../../services/db';

import { DefaultTable } from '../../components/Table/Table';
import ArticlesStyle from './ArticlesStyle';

const Articles = () => {
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
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Partner',
      accessor: 'partner',
    },
    {
      Header: 'Adresa',
      accessor: 'adresa',
    },
  ];

  const path = 'article';

  return (
    <ArticlesStyle>
      <h2>Artikli</h2>

      <DefaultTable path={path} appData={baza} tableColumns={COLUMNS} />
    </ArticlesStyle>
  );
};

export default Articles;
