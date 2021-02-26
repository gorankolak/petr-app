import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import db from '../../../services/db';

import ArticleStyle from './ArticleStyle';

const Article = (props) => {
  const [article, setArticle] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getKupci = async () => {
      const bazaArticlea = await db.kupci.toArray();
      const idPartnera = props.location.state.row;
      const idPartneraNum = Number(idPartnera.id);

      const filterPartner = bazaArticlea.filter(
        (partner) => partner.id === idPartneraNum + 1
      );

      setArticle(filterPartner);
    };

    getKupci();
  }, []);

  return (
    <ArticleStyle>
      <p>Ovo je article sa id brojem:</p>
      {article.map((article) => (
        <>
          <h1>{article.id}</h1>
          <p>{article.adresa}</p>
        </>
      ))}

      <div>
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          Nazad na listu articlea
        </button>
      </div>
    </ArticleStyle>
  );
};

export default Article;
