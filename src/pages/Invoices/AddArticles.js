import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import db from '../../services/db';

import { MainFooter } from '../../components/MainFooter/MainFooter';
import { Button } from '../../components/Components';
import { DefaultTable } from '../../components/Table/Table';
import AddArticlesStyle from './AddArticlesStyle';

const { dialog } = window.require('electron').remote;

const AddArticles = (props) => {
  const history = useHistory();
  const [newInvoice, setNewInvoice] = useState('');
  const [articlesDb, setArticlesDb] = useState([]);
  const [invoiceArticles, setInvoiceArticles] = useState([]);
  const [invoiceId, setInvoiceId] = useState('');
  const [name, setName] = useState('');
  // const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [measure, setMeasure] = useState('kom');
  // const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [returnFlag, setReturnFlag] = useState(false);

  const [tax, setTax] = useState('');
  const [priceWithTax, setPriceWithTax] = useState('');
  const [priceWithoutTax, setPriceWithoutTax] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [rebateBase, setRebateBase] = useState('');
  const [rebateAdded, setRebateAdded] = useState('');

  useEffect(() => {
    const newInvoiceData = props.location.state.row.values;
    const getArticles = async () => {
      const articles = await db.articles.toArray();
      setArticlesDb(articles);
      setInvoiceId(newInvoiceData.invoiceNumber);
      setName(articles[0].name);
      // setType(articles[0].type);
      setMeasure(articles[0].measure);
      // setPrice(articles[0].price);

      setTax(articles[0].tax);
      setMainCategory(articles[0].mainCategory);
      setSubCategory(articles[0].subCategory);
      setPriceWithoutTax(articles[0].priceWithoutTax);
      setPriceWithTax(articles[0].priceWithTax);
      // setRebateBase(articles[0].rebateBase);
      // setRebateAdded(articles[0].rebateAdded);
    };

    setNewInvoice(newInvoiceData);
    getArticles();
  }, []);

  const submitArticle = (e) => {
    e.preventDefault();

    const calcFullPrice = () => {
      const basePrice = parseInt(priceWithTax) * parseInt(quantity);
      const rebBase = parseInt(rebateBase);
      const rebAdded = parseInt(rebateAdded);

      if (
        rebateBase != '' &&
        rebateBase > 0 &&
        (rebateAdded == '' || rebateAdded == 0)
      ) {
        return basePrice + (basePrice - basePrice * (1 + rebBase / 100));
      } else if (
        rebAdded != '' &&
        rebAdded > 0 &&
        (rebBase == '' || rebBase == 0)
      ) {
        return basePrice + (basePrice - basePrice * (1 + rebAdded / 100));
      } else if (
        rebAdded != '' &&
        rebAdded > 0 &&
        rebBase != '' &&
        rebBase > 0
      ) {
        return (
          basePrice +
          (basePrice - basePrice * (1 + rebBase / 100)) +
          (basePrice - basePrice * (1 + rebAdded / 100))
        );
      } else {
        return priceWithTax * quantity;
      }
    };

    const article = {
      invoiceId: invoiceId,
      name: name,
      // type: type,
      // price: price,
      tax,
      mainCategory,
      subCategory,
      priceWithoutTax,
      priceWithTax: parseInt(priceWithTax) + parseInt(rebateBase),
      rebateBase,
      rebateAdded,
      quantity: parseInt(quantity),
      measure: measure,
      fullPrice: calcFullPrice().toFixed(2),
    };

    setInvoiceArticles([...invoiceArticles, article]);
    setTotalPrice(parseInt(article.fullPrice) + totalPrice);
  };

  const removeArticles = (id) => {
    // const article = '';

    // setInvoiceArticles([article]);

    const newArticle = invoiceArticles.filter((art) => art.id !== id);

    setInvoiceArticles(newArticle);
    setTotalPrice(0);
  };

  const createInvoice = () => {
    newInvoice.articles = invoiceArticles;
    const newInvoiceArticles = invoiceArticles;
    newInvoice.invoiceTotal = totalPrice;

    db.invoices.add(newInvoice);
    newInvoiceArticles.map((ar) => db.invoiceArticles.add(ar));

    dialog.showMessageBox({ message: 'Račun uspješno dodan' });

    history.push({
      pathname: '/invoice',
      state: {
        row: {
          values: newInvoice,
        },
      },
    });
  };

  const path = 'add-invoice-articles';

  const COLUMNS = [
    {
      Header: 'Naziv',
      accessor: 'name',
    },
    {
      Header: 'Cijena bez PDV-a',
      accessor: 'priceWithoutTax',
    },
    {
      Header: 'Rabat osnovni %',
      accessor: 'rebateBase',
    },
    {
      Header: 'Rabat dodatni %',
      accessor: 'rebateAdded',
    },
    {
      Header: 'PDV %',
      accessor: 'tax',
    },
    {
      Header: 'Količina',
      accessor: 'quantity',
    },
    {
      Header: 'Ukupna cijena',
      accessor: 'fullPrice',
    },
  ];

  return (
    <AddArticlesStyle>
      <form onSubmit={submitArticle}>
        <h2>Dodaj artikle</h2>
        <div className="formWrapper addArticles">
          <div className="formColumn">
            <div className="formItem">
              <label>Artikl</label>
              <select
                name="articles"
                onChange={(e) => {
                  const article = articlesDb.find(
                    (art) => art.id == e.target.value
                  );
                  setName(article.name);
                  // setType(article.type);
                  setMeasure(article.measure);
                  // setPrice(article.price);
                  setMainCategory(article.mainCategory);
                  setSubCategory(article.subCategory);
                  setPriceWithoutTax(article.priceWithoutTax);
                  setPriceWithTax(article.priceWithTax);
                  // setRebateBase(article.rebateBase);
                  // setRebateAdded(article.rebateAdded);
                }}
              >
                {articlesDb.map((article) => (
                  <option key={article.id} value={article.id}>
                    {article.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="formColumn">
            <div className="formItem">
              <label>Količina</label>
              <input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="formColumn">
            <div className="formItem">
              <label>Rabat osnovni %</label>
              <input
                type="number"
                onChange={(e) =>
                  setRebateBase(Number(e.target.value).toFixed(2))
                }
              ></input>
            </div>
          </div>

          <div className="formColumn">
            <div className="formItem">
              <label>Rabat dodatni %</label>
              <input
                type="number"
                onChange={(e) =>
                  setRebateAdded(Number(e.target.value).toFixed(2))
                }
              ></input>
            </div>

            <div className="formItem">
              <Button type="submit">Dodaj artikl</Button>
            </div>
          </div>
        </div>
      </form>
      <div className="articlesTable">
        <DefaultTable
          path={path}
          appData={invoiceArticles}
          tableColumns={COLUMNS}
        />
      </div>

      <Link to="/add-invoice">
        <Button>Natrag</Button>
      </Link>
      <Button
        onClick={() => {
          removeArticles();
        }}
      >
        Ukloni artikle
      </Button>
      <div className="formItemAdd">
        <Button
          onClick={() => {
            createInvoice();
          }}
        >
          Napravi račun
        </Button>
      </div>
      <MainFooter>
        <div>
          Ukupan iznos: <strong>{totalPrice} kn</strong>
        </div>
      </MainFooter>
    </AddArticlesStyle>
  );
};

export default AddArticles;
