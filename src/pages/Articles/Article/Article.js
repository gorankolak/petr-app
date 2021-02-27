import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import ArticleStyle from './ArticleStyle';

const Article = (props) => {
  const [article, setArticle] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getKupci = async () => {
      const articleData = props.location.state.row.values;

      setArticle(articleData);
    };

    getKupci();
  }, []);

  return (
    <ArticleStyle>
      <h2>Naziv artikla:</h2>
      <p>{article.name}</p>
      <h2>Vrsta artikla:</h2>
      <p>{article.type}</p>

      <div>
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          Nazad na listu artikala
        </button>
      </div>
    </ArticleStyle>
  );
};

export default Article;
