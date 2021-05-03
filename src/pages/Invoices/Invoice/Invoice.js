import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import db from '../../../services/db';

import { MainFooter } from '../../../components/mainFooter/mainFooter';
import { Button } from '../../../components/Components';
import InvoiceStyle from './InvoiceStyle';

const { ipcRenderer } = window.require('electron');
const { dialog } = window.require('electron').remote;

const Invoice = (props) => {
  const [invoice, setInvoice] = useState([]);
  const [editInvoice, setEditInvoice] = useState(false);
  const history = useHistory();

  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoiceState, setInvoiceState] = useState('');

  useEffect(() => {
    const getInvoice = async () => {
      const getInvoicePreview = await db.invoicePreview.toArray();

      const newLocal = props.location.state
        ? props.location.state.row.values.invoiceNumber
        : getInvoicePreview[0].invID;
      const currentInvoiceNumber = newLocal;

      const invoiceData = await db.invoices.get({
        invoiceNumber: currentInvoiceNumber,
      });

      await db.invoicePreview.clear();
      await db.invoicePreview.put({ invID: invoiceData.invoiceNumber });

      setInvoice(invoiceData);
    };

    getInvoice();
  }, []);

  const sendInvoiceInfo = `${invoice.invoiceNumber}-${invoice.partner}`;

  const savePdf = () => {
    ipcRenderer.send('print-to-pdf', sendInvoiceInfo);

    dialog.showMessageBox({ message: 'File sačuvan!' });
  };

  const openInvoice = () => {
    const invNumber = invoice.invoiceNumber;
    ipcRenderer.send('open-invoice');
  };

  const printPaper = () => {
    ipcRenderer.send('print-paper');
  };

  const deleter = async (id) => {
    const options = {
      buttons: ['Da', 'Otkaži'],
      message: 'Da li ste sigurni da želite obrisati račun?',
      defaultId: 1,
    };

    dialog.showMessageBox(null, options).then((response) => {
      console.log(response.response);

      if (response.response === 0) {
        db.invoices.delete(id);

        history.push({
          pathname: '/invoices',
        });
      }
    });
  };

  const changeInvoice = async (e) => {
    e.preventDefault();

    const newInvoice = {
      invoiceNumber: invoiceNumber,
      invoiceDate: invoiceDate,
      invoiceState: invoiceState,
    };

    await db.invoices.update(invoice.id, newInvoice);

    const updatedInvoice = await db.invoices.get({
      invoiceNumber: invoiceNumber,
    });

    setInvoice(updatedInvoice);
    setInvoiceNumber('');
    setInvoiceDate('');
    setInvoiceState('');
    setEditInvoice(false);
  };

  let invoiceDisplay;

  if (editInvoice === false) {
    invoiceDisplay = (
      <>
        <p>Sadržaj računa</p>

        <h2>Račun br. {invoice.invoiceNumber}</h2>
        <p>
          Datum izdavnanja: <strong>{invoice.invoiceDate}</strong>
        </p>
        <p>
          Stanje računa: <strong>{invoice.invoiceState}</strong>
        </p>
        <p>
          Iznos računa: <strong>{invoice.invoiceTotal}</strong>
        </p>
      </>
    );
  } else {
    invoiceDisplay = (
      <form onSubmit={changeInvoice}>
        <p>Izmjena računa</p>

        <h2>
          Račun br.{' '}
          <input
            type="text"
            id="number"
            placeholder={invoice.invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            value={invoiceNumber}
          />
        </h2>
        <p>
          Datum izdavanja:{' '}
          <input
            type="text"
            id="date"
            placeholder={invoice.invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            value={invoiceDate}
          />
        </p>
        <p>
          Stanje računa:{' '}
          <div className="formItem radioGroupWrapper">
            <label htmlFor="invoiceState">Stanje</label>
            <div className="radioGroup">
              <input
                type="radio"
                name="invoiceState"
                id="invoiceState"
                onChange={(e) => setInvoiceState('Plaćeno')}
                value={invoiceState}
              />
              <label htmlFor="invoiceType">Plaćeno</label>
            </div>
            <div className="radioGroup">
              <input
                type="radio"
                name="invoiceState"
                id="invoiceState"
                onChange={(e) => setInvoiceState('Neplaćeno')}
              />
              <label htmlFor="invoiceType">Neplaćeno</label>
            </div>
          </div>
        </p>
        <p>
          Iznos računa: <strong>{invoice.invoiceTotal}</strong>
        </p>
        <div>
          <Button
            onClick={() => {
              setEditInvoice(false);
              setInvoiceNumber('');
              setInvoiceDate('');
              setInvoiceState('');
            }}
          >
            Otkaži izmjenu
          </Button>

          <Button type="submit">Spremi izmjene</Button>
        </div>
      </form>
    );
  }

  return (
    <InvoiceStyle>
      {invoiceDisplay}

      <MainFooter>
        <Link to="/invoices">
          <Button>Lista računa</Button>
        </Link>

        <Button
          onClick={() => {
            setEditInvoice(true);
            setInvoiceNumber(invoice.invoiceNumber);
            setInvoiceDate(invoice.invoiceDate);
            setInvoiceState(invoice.invoiceState);
          }}
        >
          Izmijeni račun
        </Button>
        <Link to="/add-invoice">
          <Button>Dodaj novi račun</Button>
        </Link>

        <Button onClick={savePdf}>Napravi PDF računa</Button>
        <Button onClick={openInvoice}>Pregled računa</Button>
        <Button onClick={printPaper}>Print računa</Button>

        <Button
          onClick={() => {
            deleter(invoice.id);
          }}
        >
          Obriši račun
        </Button>
      </MainFooter>
    </InvoiceStyle>
  );
};

export default Invoice;
