import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import db from '../../services/db';

import { MainFooter } from '../../components/MainFooter/MainFooter';
import { Button } from '../../components/Components';
import AddArticleStyle from './AddArticleStyle';

const { dialog } = window.require('electron').remote;

const AddArticle = () => {
  const history = useHistory();
  const [name, setName] = useState([]);
  // const [type, setType] = useState([]);
  const [measure, setMeasure] = useState('');
  const [tax, setTax] = useState('');
  // const [rebateBase, setRebateBase] = useState('');
  // const [rebateAdded, setRebateAdded] = useState('');
  const [priceWithTax, setPriceWithTax] = useState('');
  const [priceWithoutTax, setPriceWithoutTax] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  // const [price, setPrice] = useState('');
  let newArticle;

  const submitArticle = (e) => {
    e.preventDefault();
    // TO DO: Prilikom uređenja forme, treba razbiti if u manje dijelove. One informacije koje su neispravne moraju dati neku vrstu warninga u odgovarajućem polje
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
      newArticle = {
        name,
        // type,
        measure,
        // tax: Number((tax * price) / 100).toFixed(2),
        tax,
        // rebateBase,
        // rebateAdded,
        // price,
        priceWithTax,
        priceWithoutTax,
        mainCategory,
        subCategory,
      };

      // console.log(price);
      // console.log(typeof price);
      dialog.showMessageBox({ message: 'Artikl uspješno dodan' });

      history.push({
        pathname: '/article',
        state: {
          row: {
            values: newArticle,
          },
        },
      });
      db.articles.add(newArticle);
    } else {
      dialog.showMessageBox({ message: 'Podaci o artiklu su nepotpuni' });
    }
  };

  return (
    <AddArticleStyle>
      <h2>Dodavanje novih artikala</h2>

      <form onSubmit={submitArticle}>
        <div className="formColumn">
          <div className="formItem">
            <label htmlFor="name">Naziv artikla</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* <div className="formItem">
            <label htmlFor="type">Vrsta artikla</label>
            <input
              type="text"
              id="type"
              onChange={(e) => setType(e.target.value)}
            />
          </div> */}
          <div className="formItem">
            <label htmlFor="mainCategory">Glavna kategorija</label>
            <input
              type="text"
              id="mainCategory"
              onChange={(e) => setMainCategory(e.target.value)}
            />
          </div>

          <div className="formItem">
            <label htmlFor="subCategory">Podkategorija</label>
            <input
              type="text"
              id="subCategory"
              onChange={(e) => setSubCategory(e.target.value)}
            />
          </div>

          <div className="formItem">
            <label htmlFor="type">Jedinica mjere</label>
            <input
              type="text"
              id="measure"
              onChange={(e) => setMeasure(e.target.value)}
            />
          </div>

          <div className="formItem">
            <label htmlFor="priceWithoutTax">Cijena bez PDV-a</label>
            <input
              type="number"
              id="priceWithoutTax"
              // onChange={(e) => setPrice(parseInt(e.target.value))}
              onChange={(e) =>
                setPriceWithoutTax(Number(e.target.value).toFixed(2))
              }
              step=".01"
            />
          </div>

          <div className="formItem">
            <label htmlFor="type">PDV</label>
            <input
              type="number"
              id="type"
              onChange={(e) => setTax(Number(e.target.value).toFixed(2))}
              step=".01"
            />
          </div>

          <div className="formItem">
            <label htmlFor="priceWithTax">Cijena s PDV-om</label>
            <div className="half">
              <input
                type="number"
                id="priceWithTax"
                value={priceWithTax}
                step=".01"
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

          {/* <div className="formItem">
            <label htmlFor="type">Rabat osnovni</label>
            <input
              type="number"
              id="type"
              onChange={(e) => setRebateBase(Number(e.target.value).toFixed(2))}
              step=".01"
            />
          </div> */}

          {/* <div className="formItem">
            <label htmlFor="type">Rabat dodani</label>
            <input
              type="number"
              id="type"
              onChange={(e) =>
                setRebateAdded(Number(e.target.value).toFixed(2))
              }
              step=".01"
            />
          </div> */}

          {/* <div className="formItem">
            <label htmlFor="type">Cijena</label>
            <input
              type="number"
              id="type"
              // onChange={(e) => setPrice(parseInt(e.target.value))}
              onChange={(e) => setPrice(Number(e.target.value).toFixed(2))}
              step=".01"
            />
          </div> */}

          <div className="formItem">
            <Button type="submit">Dodaj artikl</Button>
          </div>
        </div>
      </form>

      <MainFooter>
        <Button
          onClick={() => {
            history.goBack();
          }}
        >
          Nazad na listu artikala
        </Button>
      </MainFooter>
    </AddArticleStyle>
  );
};

export default AddArticle;
