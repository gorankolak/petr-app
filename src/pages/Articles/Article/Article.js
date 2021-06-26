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
  const [measure, setMeasure] = useState('');
  const [tax, setTax] = useState('');
  const [rebateBase, setRebateBase] = useState('');
  const [rebateAdded, setRebateAdded] = useState('');
  const [price, setPrice] = useState('');

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
    // TO DO: Provjeriti dodatna ograničenja koja trebaju biti stavljena na pojedina polja
    if (name !== '' && type !== '' && measure !== ''
          && tax !== '' && rebateBase !== '' && rebateAdded !== '' && price !== '' 
          && tax >= 0 && rebateBase >= 0 && rebateAdded >= 0 && price >= 0) {
      const newArticle = {
        name,
        type,
        measure,
        tax,
        rebateBase,
        rebateAdded,
        price
      };

      await db.articles.update(article.id, newArticle);

      const updatedArticle = await db.articles.get({
        name: name,
      });

      setArticle(updatedArticle);
      setName('');
      setType('');
      setMeasure('');
      setTax('');
      setRebateBase('');
      setRebateAdded('');
      setPrice('');
      setEditArticle(false);
    } else {
      dialog.showMessageBox({ message: 'Podaci o artiklu su nepotpuni' });
    }
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

            <div className="formItem">
              <p className="label">Jedinica mjere</p>
              <p className="content">{article.measure}</p>
            </div>

            <div className="formItem">
              <p className="label">PDV</p>
              <p className="content">{article.tax}</p>
            </div>

            <div className="formItem">
              <p className="label">Rabat osnovni</p>
              <p className="content">{article.rebateBase}</p>
            </div>

            <div className="formItem">
              <p className="label">Rabat dodani</p>
              <p className="content">{article.rebateAdded}</p>
            </div>

            <div className="formItem">
              <p className="label">Cijena</p>
              <p className="content">{article.price}</p>
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
            <div className="formItem">
              Jedinica mjere{' '}
              <input
                type="text"
                id="measure"
                placeholder={article.measure}
                onChange={(e) => setMeasure(e.target.value)}
                value={measure}
              />
            </div>
            <div className="formItem">
              PDV{' '}
              <input
                type="number"
                id="tax"
                placeholder={article.tax}
                onChange={(e) => setTax(e.target.value)}
                value={tax}
              />
            </div>
            <div className="formItem">
              Rabat osnovni{' '}
              <input
                type="number"
                id="rebateBase"
                placeholder={article.rebateBase}
                onChange={(e) => setRebateBase(e.target.value)}
                value={rebateBase}
              />
            </div>
            <div className="formItem">
              Rabat dodani{' '}
              <input
                type="text"
                id="rebateAdded"
                placeholder={article.rebateAdded}
                onChange={(e) => setRebateAdded(e.target.value)}
                value={rebateAdded}
              />
            </div>
            <div className="formItem">
              Cijena{' '}
              <input
                type="text"
                id="price"
                placeholder={article.price}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
            <div>
              <Button
                onClick={() => {
                  setEditArticle(false);
                  setName('');
                  setType('');
                  setMeasure('');
                  setTax('');
                  setRebateBase('');
                  setRebateAdded('');
                  setPrice('');
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
            setMeasure(article.measure);
            setTax(article.tax);
            setRebateBase(article.rebateBase);
            setRebateAdded(article.rebateAdded);
            setPrice(article.price);
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
