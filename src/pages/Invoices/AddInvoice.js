import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import db from '../../services/db';

import AddInvoiceStyle from './AddInvoiceStyle';

const AddInvoice = () => {
  const history = useHistory();
  const [invoiceNumber, setInvoiceNumber] = useState([]);
  const [price, setPrice] = useState([]);
  const [state, setState] = useState([]);
  let newInvoice;

  const submitInvoice = (e) => {
    e.preventDefault();

    if (invoiceNumber != '' && price != '' && state != '') {
      newInvoice = {
        invoiceNumber: invoiceNumber,
        invoiceDate: `${new Date().toLocaleDateString()}`,
        price: price,
        state: state,
      };

      db.invoices.add(newInvoice);
    }
  };

  return (
    <AddInvoiceStyle>
      <h2>Novi račun</h2>
      <form onSubmit={submitInvoice}>
        <label htmlFor="name">Broj računa</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setInvoiceNumber(e.target.value)}
        />
        <label htmlFor="address">Iznos</label>
        <input
          type="text"
          id="address"
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="address">Stanje</label>
        <input
          type="text"
          id="address"
          onChange={(e) => setState(e.target.value)}
        />
        <button type="submit">Dodaj račun</button>
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
    </AddInvoiceStyle>
  );
};

export default AddInvoice;
