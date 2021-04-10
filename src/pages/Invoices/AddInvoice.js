import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import db from '../../services/db';

import { MainFooter } from '../../components/mainFooter/mainFooter';
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
        <div className="formWrapper">
          <div className="formColumn">
            <div className="formItem">
              <label>Broj računa</label>
              <strong>{invoicesAll.length}</strong>
              {/* <input
          type="text"
          id="name"
          onChange={(e) => setInvoiceNumber(e.target.value)}
        /> */}
            </div>

            <div className="formItem">
              <label htmlFor="partner">Partner</label>
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
            </div>

            <div className="formItem">
              <label htmlFor="invoiceDate">Datum računa</label>
              <input
                type="text"
                id="invoiceDate"
                // onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="formItem">
              <label htmlFor="deliveryDate">Datum isporuke</label>
              <input
                type="text"
                id="deliveryDate"
                // onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="formItem">
              <label htmlFor="dlvNoteNumber">Broj otpremnice</label>
              <input
                type="text"
                id="dlvNoteNumber"
                // onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="formItem">
              <label htmlFor="invoiceType">Vrsta računa</label>
              <input
                type="text"
                id="invoiceType"
                // onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="formColumn">
            <div className="formItem">
              <label htmlFor="address">Iznos</label>
              <input
                type="text"
                id="address"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="formItem">
              <label htmlFor="address">Stanje</label>
              <input
                type="text"
                id="address"
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>

          <div className="formColumn">
            <h3>Sadržaj računa</h3>
            <p>
              <span>Broj računa:</span>
              <span>{invoicesAll.length}</span>
            </p>
            <p>
              <span>Partner:</span>
              <span>{partner}</span>
            </p>
            <p>
              <span>Datum računa:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </p>
            <p>
              <span>Status:</span>
              <span>{state}</span>
            </p>
            <p>
              <span>Ukupan iznos:</span>
              <span>{price}</span>
            </p>
          </div>
        </div>

        <div className="formItemAdd">
          <button type="submit">Dodaj račun</button>
          <button type="submit">Pregled računa</button>
        </div>
      </form>

      <MainFooter>
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
      </MainFooter>
    </AddInvoiceStyle>
  );
};

export default AddInvoice;
