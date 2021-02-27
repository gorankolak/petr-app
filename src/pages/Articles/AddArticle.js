import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import db from '../../services/db';

import AddArticleStyle from './AddArticleStyle';

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

      db.articles.add(newArticle);
    }
  };

  // const deleter = async (id) => {
  //   db.kupci.delete(id);

  //   const kupci = await db.kupci.toArray();
  //   setTester(kupci);
  // };

  // const adder = async (data) => {
  //   db.kupci.put(data);

  //   const kupci = await db.kupci.toArray();
  //   setTester(kupci);
  // };

  // const toggling = () => {
  //   setTog(!tog);
  // };

  // const inputAdder = async (e) => {
  //   const tarValue = e.target.value;

  //   db.kupci.put({
  //     naziv: tarValue,
  //     adresa: `${tarValue} ulica`,
  //   });

  //   const kupci = await db.kupci.toArray();
  //   setTester(kupci);
  // };

  return (
    <div>
      <h2>Dodavanje novih artikala</h2>

      <form onSubmit={submitArticle}>
        <label htmlFor="name">Naziv artikla</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="type">Vrsta artikla</label>
        <input
          type="text"
          id="type"
          onChange={(e) => setType(e.target.value)}
        />
        <button type="submit">Dodaj artikl</button>
      </form>

      <div>
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          Nazad na listu računa
        </button>
      </div>
    </div>
  );
};

export default AddArticle;
