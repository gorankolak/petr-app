import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from '../../services/db';

import { DefaultTable } from '../../components/Table/Table';
import { MainFooter } from '../../components/MainFooter/MainFooter';
import { Button } from '../../components/Components';
import ArticlesStyle from './ArticlesStyle';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const articlesData = await db.articles.toArray();

      setArticles(articlesData);
    };

    getArticles();
  }, []);

  const COLUMNS = [
    {
      Header: 'Naziv artikla',
      accessor: 'name',
    },
    {
      Header: 'Glavna kategorija',
      accessor: 'mainCategory',
    },
    {
      Header: 'Podkategorija',
      accessor: 'subCategory',
    },
    {
      Header: 'Cijena bez PDV-a',
      accessor: 'priceWithoutTax',
    },
    {
      Header: 'PDV %',
      accessor: 'tax',
    },
    {
      Header: 'Cijena s PDV-om',
      accessor: 'priceWithTax',
    },
  ];

  const path = 'article';

  return (
    <ArticlesStyle>
      <h2>Artikli</h2>

      <DefaultTable path={path} appData={articles} tableColumns={COLUMNS} />

      <MainFooter>
        <Link to="/add-article">
          <Button>Dodaj novi artikl</Button>
        </Link>
      </MainFooter>
    </ArticlesStyle>
  );
};

export default Articles;
