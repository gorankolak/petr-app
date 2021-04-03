import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import db from '../../services/db';

import AddInvoiceStyle from './AddInvoiceStyle';

const AddInvoice = () => {
  const history = useHistory();
  const [partnersAll, setPartnersAll] = useState([]);
  const [invoicesAll, setInvoicesAll] = useState([]);
  const [partner, setPartner] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [price, setPrice] = useState('');
  const [state, setState] = useState('');
  let newInvoice;

  useEffect(() => {
    const getPartners = async () => {
      const partnersDb = await db.partners.toArray();

      setPartnersAll(partnersDb);
    };

    const getInvoices = async () => {
      const invoicesDb = await db.invoices.toArray();

      setInvoicesAll(invoicesDb);
    };

    getInvoices();
    getPartners();
  }, []);

  console.log(invoicesAll.length);

  const submitInvoice = (e) => {
    e.preventDefault();

    if (
      // invoiceNumber !== '' &&
      price !== '' &&
      state !== '' &&
      (partner !== '' || history.location.state !== undefined)
    ) {
      newInvoice = {
        invoiceNumber: setInvoiceNumber(invoicesAll.length),
        partner:
          history.location.state !== undefined
            ? history.location.state.name
            : partner,
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
        <label htmlFor="partner">Partner</label>
        {/* <input
          type="text"
          id="name"
          onChange={(e) => setPartner(e.target.value)}
          value={
            history.location.state != undefined
              ? history.location.state.name
              : ''
          }
        /> */}

        {history.location.state === undefined ? (
          <select
            value={partner}
            onChange={(e) => setPartner(e.target.value)}
            id="partner"
          >
            {partnersAll.map((partner) => (
              <option value={partner.name}>{partner.name}</option>
            ))}
          </select>
        ) : (
          <strong>{history.location.state.name}</strong>
        )}

        <label htmlFor="name">Broj računa</label>
        <strong>{invoicesAll.length}</strong>
        {/* <input
          type="text"
          id="name"
          onChange={(e) => setInvoiceNumber(e.target.value)}
        /> */}
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
        {/* <button
          onClick={() => {
            history.goBack();
            // history.go(0);
          }}
        >
          Nazad na listu računa
        </button> */}

        <Link to="/invoices">
          <button>Lista računa</button>
        </Link>

        <Link to="/partners">
          <button>Lista partnera</button>
        </Link>
      </div>
    </AddInvoiceStyle>
  );
};

export default AddInvoice;
