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
  // const [rebateBase, setRebateBase] = useState('');
  // const [rebateAdded, setRebateAdded] = useState('');
  const [priceWithTax, setPriceWithTax] = useState('');
  const [priceWithoutTax, setPriceWithoutTax] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  // const [price, setPrice] = useState('');

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
    if (
      name !== '' &&
      // type !== '' &&
      measure !== '' &&
      tax !== '' &&
      // rebateBase !== '' &&
      // rebateAdded !== '' &&
      // price !== '' &&
      priceWithTax !== '' &&
      priceWithoutTax !== '' &&
      mainCategory !== '' &&
      subCategory !== '' &&
      tax >= 0 &&
      // rebateBase >= 0 &&
      // rebateAdded >= 0 &&
      // price >= 0
      priceWithTax >= 0 &&
      priceWithoutTax >= 0
    ) {
      const newArticle = {
        name,
        // type,
        measure,
        tax,
        // rebateBase,
        // rebateAdded,
        // price,
        priceWithTax,
        priceWithoutTax,
        mainCategory,
        subCategory,
      };

      await db.articles.update(article.id, newArticle);

      const updatedArticle = await db.articles.get({
        name: name,
      });

      setArticle(updatedArticle);
      setName('');
      // setType('');
      setMeasure('');
      setTax('');
      // setRebateBase('');
      // setRebateAdded('');
      // setPrice('');
      setPriceWithTax('');
      setPriceWithoutTax('');
      setMainCategory('');
      setSubCategory('');
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
              <p className="label">Glavna kategorija</p>
              <p className="content">{article.mainCategory}</p>
            </div>

            <div className="formItem">
              <p className="label">Podkategorija</p>
              <p className="content">{article.subCategory}</p>
            </div>

            <div className="formItem">
              <p className="label">Jedinica mjere</p>
              <p className="content">{article.measure}</p>
            </div>
          </div>
          <div className="formColumn">
            <div className="formItem">
              <p className="label">Cijena bez PDV-a</p>
              <p className="content">
                {Number(article.priceWithoutTax).toFixed(2)} kn
              </p>
            </div>

            <div className="formItem">
              <p className="label">PDV</p>
              <p className="content">{article.tax} %</p>
            </div>

            <div className="formItem">
              <p className="label">Cijena s PDV-om</p>
              <p className="content">
                {Number(article.priceWithTax).toFixed(2)} kn
              </p>
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
              Glavna kategorija{' '}
              <input
                type="text"
                id="mainCategory"
                placeholder={article.type}
                onChange={(e) => setMainCategory(e.target.value)}
                value={mainCategory}
              />
            </div>
            <div className="formItem">
              Podkategorija{' '}
              <input
                type="text"
                id="subCategory"
                placeholder={article.type}
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
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
          </div>
          <div className="formColumn">
            <div className="formItem">
              Cijena bez PDV-a{' '}
              <input
                type="number"
                id="priceWithoutTax"
                placeholder={article.rebateBase}
                onChange={(e) => setPriceWithoutTax(e.target.value)}
                value={priceWithoutTax}
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
              Cijena s PDV-om{' '}
              <input
                type="number"
                id="priceWithTax"
                placeholder={article.rebateBase}
                onChange={(e) => setPriceWithTax(e.target.value)}
                value={priceWithTax}
              />
            </div>

            <div className="formItem">
              Cijena s PDV-om{' '}
              <div className="half">
                <input
                  type="number"
                  id="priceWithTax"
                  value={priceWithTax}
                  readOnly
                />
                <Button
                  tableBtn
                  onClick={(e) => {
                    e.preventDefault();
                    setPriceWithTax(
                      Number(priceWithoutTax * (1 + tax / 100)).toFixed(2)
                    );
                  }}
                >
                  Izračunaj
                </Button>
              </div>
            </div>

            <div>
              <Button
                onClick={() => {
                  setEditArticle(false);
                  setName('');
                  setMainCategory('');
                  setSubCategory('');
                  setMeasure('');
                  setTax('');
                  setPriceWithoutTax('');
                  setPriceWithTax('');
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
            setMainCategory(article.mainCategory);
            setSubCategory(article.subCategory);
            setMeasure(article.measure);
            setTax(article.tax);
            setPriceWithoutTax(article.priceWithoutTax);
            setPriceWithTax(article.priceWithTax);
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
