import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import db from '../../../services/db';

import { MainFooter } from '../../../components/MainFooter/MainFooter';
import { Button } from '../../../components/Components';
import ArticleStyle from './ArticleStyle';

const { dialog } = window.require('electron').remote;

const Article = (props) => {
  const [article, setArticle] = useState([]);
  const [editArticle, setEditArticle] = useState(false);
  const history = useHistory();

  const [name, setName] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    const getArticles = async () => {
      const rowValue = props.location.state.row.values;

      const articleData = await db.articles.get({
        name: rowValue.name,
      });

      setArticle(articleData);
    };

    getArticles();
  }, []);

  const deleter = async (id) => {
    const options = {
      buttons: ['Da', 'Otkaži'],
      message: 'Da li ste sigurni da želite obrisati artikl?',
      defaultId: 1,
    };

    dialog.showMessageBox(null, options).then((response) => {
      console.log(response.response);

      if (response.response === 0) {
        db.articles.delete(id);

        dialog.showMessageBox({ message: 'Artikl obrisan' });

        history.push({
          pathname: '/articles',
        });
      }
    });
  };

  const changeArticle = async (e) => {
    e.preventDefault();

    const newArticle = {
      name,
      type,
    };

    await db.articles.update(article.id, newArticle);

    const updatedArticle = await db.articles.get({
      name: name,
    });

    setArticle(updatedArticle);
    setName('');
    setType('');
    setEditArticle(false);
  };

  let articleDisplay;

  if (editArticle === false) {
    articleDisplay = (
      <>
        <h2>Artikl</h2>
        <div className="formWrapper">
          <div className="formColumn">
            <div className="formItem">
              <p className="label">Naziv artikla </p>
              <p className="content">{article.name}</p>
            </div>

            <div className="formItem">
              <p className="label">Vrsta artikla</p>
              <p className="content">{article.type}</p>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    articleDisplay = (
      <form onSubmit={changeArticle}>
        <h2>Izmjena artikala</h2>

        <div className="formWrapper">
          <div className="formColumn">
            <div className="formItem">
              Naziv Artikla{' '}
              <input
                type="text"
                id="name"
                placeholder={article.name}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="formItem">
              Vrsta artikla{' '}
              <input
                type="text"
                id="type"
                placeholder={article.type}
                onChange={(e) => setType(e.target.value)}
                value={type}
              />
            </div>

            <div>
              <Button
                onClick={() => {
                  setEditArticle(false);
                  setName('');
                  setType('');
                }}
              >
                Otkaži izmjenu
              </Button>

              <Button type="submit">Spremi izmjene</Button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  return (
    <ArticleStyle>
      {articleDisplay}

      <MainFooter>
        <Link to="/articles">
          <Button>Nazad na listu artikala</Button>
        </Link>

        <Button
          onClick={() => {
            setEditArticle(true);
            setName(article.name);
            setType(article.type);
          }}
        >
          Izmijeni artikl
        </Button>

        <Button
          onClick={() => {
            deleter(article.id);
          }}
        >
          Obriši artikl
        </Button>
      </MainFooter>
    </ArticleStyle>
  );
};

export default Article;
