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
  // const [id, setId] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [measure, setMeasure] = useState('kom');
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [returnFlag, setReturnFlag] = useState(false);

  useEffect(() => {
    const newInvoiceData = props.location.state.row.values;
    const getArticles = async () => {
      const articles = await db.articles.toArray();
      setArticlesDb(articles);
      // setId(articles[0].id);
      setInvoiceId(newInvoiceData.invoiceNumber);
      setName(articles[0].name);
      setType(articles[0].type);
      setMeasure(articles[0].measure);
      setPrice(articles[0].price);
    };

    setNewInvoice(newInvoiceData);
    console.log(newInvoiceData);
    console.log(newInvoice);

    getArticles();
  }, []);

  const submitArticle = (e) => {
    e.preventDefault();

    const article = {
      // id: id,
      invoiceId: invoiceId,
      name: name,
      type: type,
      price: price,
      quantity: parseInt(quantity),
      measure: measure,
      fullPrice: price * quantity,
    };
    console.log(...invoiceArticles);
    console.log(invoiceArticles);
    console.log(article.price);
    setInvoiceArticles([...invoiceArticles, article]);

    setTotalPrice(article.fullPrice + totalPrice);
  };

  const createInvoice = () => {
    newInvoice.articles = invoiceArticles;
    const newInvoiceArticles = invoiceArticles;
    newInvoice.invoiceTotal = totalPrice;

    db.invoices.add(newInvoice);

    newInvoiceArticles.map((ar) => db.invoiceArticles.add(ar));

    // db.invoiceArticles.add(newInvoiceArticles);
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
    // {
    //   Header: 'Br.',
    //   accessor: 'id',
    // },
    {
      Header: 'Naziv',
      accessor: 'name',
    },
    {
      Header: 'Vrsta',
      accessor: 'type',
    },
    {
      Header: 'Cijena artikla',
      accessor: 'price',
    },
    {
      Header: 'Količina',
      accessor: 'quantity',
    },
    {
      Header: 'Mjerna jedinica',
      accessor: 'measure',
    },
    {
      Header: 'Ukupno',
      accessor: 'fullPrice',
    },
  ];

  return (
    <AddArticlesStyle>
      <form onSubmit={submitArticle}>
        <h2>Dodaj artikle</h2>
        <div className="form-wrapper">
          <div className="form-column">
            <div className="form-item">
              <label>Artikl</label>
              <div className="half">
                <select
                  name="articles"
                  onChange={(e) => {
                    const article = articlesDb.find(
                      (art) => art.id == e.target.value
                    );
                    // setId(article.id);
                    setName(article.name);
                    setType(article.type);
                    setMeasure(article.measure);
                    setPrice(article.price);
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
          </div>
          <div className="form-column">
            <div className="form-item">
              <label>Količina</label>
              <div className="half">
                <input
                  type="number"
                  onChange={(e) => setQuantity(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className="form-column">
            <div className="form-item">
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
      <div className="formItemAdd">
        <Button
          onClick={() => {
            // continue here: add invoice to db + go to new invoice display
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
