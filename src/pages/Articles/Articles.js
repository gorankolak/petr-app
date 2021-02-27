import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from '../../services/db';

import { DefaultTable } from '../../components/Table/Table';
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
      Header: 'Naziva artikla',
      accessor: 'name',
    },
    {
      Header: 'Vrsta artikla',
      accessor: 'type',
    },
  ];

  const path = 'article';

  return (
    <ArticlesStyle>
      <h2>Artikli</h2>

      <DefaultTable path={path} appData={articles} tableColumns={COLUMNS} />

      <div>
        <Link to="/add-article">
          <button>Dodaj novi artikl</button>
        </Link>
      </div>
    </ArticlesStyle>
  );
};

export default Articles;
