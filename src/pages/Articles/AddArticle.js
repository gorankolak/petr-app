import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import db from '../../services/db';

import { MainFooter } from '../../components/mainFooter/mainFooter';
import { Button } from '../../components/Components';
import AddArticleStyle from './AddArticleStyle';

const { dialog } = window.require('electron').remote;

const AddArticle = () => {
  const history = useHistory();
  const [name, setName] = useState([]);
  const [type, setType] = useState([]);
  let newArticle;

  const submitArticle = (e) => {
    e.preventDefault();

    if (name != '' && type != '') {
      newArticle = {
        name,
        type,
      };

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
    <div>
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

          <div className="formItem">
            <label htmlFor="type">Vrsta artikla</label>
            <input
              type="text"
              id="type"
              onChange={(e) => setType(e.target.value)}
            />
          </div>

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
    </div>
  );
};

export default AddArticle;
