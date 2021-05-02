import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import db from '../../../services/db';

import { MainFooter } from '../../../components/mainFooter/mainFooter';
import InvoiceStyle from './InvoiceStyle';

const { ipcRenderer } = window.require('electron');
const { dialog } = window.require('electron').remote;

const Invoice = (props) => {
  const [invoice, setInvoice] = useState([]);
  const history = useHistory();

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

  return (
    <InvoiceStyle>
      <p>Individual invoice</p>

      <>
        <h2>Račun br. {invoice.invoiceNumber}</h2>
        <p>
          Datum izdavnanja: <strong>{invoice.invoiceDate}</strong>
        </p>
        <p>
          Iznos računa: <strong>{invoice.invoiceTotal}</strong>
        </p>
        <p>
          Stanje računa: <strong>{invoice.invoiceState}</strong>
        </p>
      </>

      <MainFooter>
        {/* <button
          onClick={() => {
            history.goBack();
          }}
        >
          Natrag na listu računa
        </button> */}
        <Link to="/invoices">
          <button>Lista računa</button>
        </Link>

        <Link to="/add-invoice">
          <button>Dodaj novi račun</button>
        </Link>

        <button onClick={savePdf}>Napravi PDF računa</button>
        <button onClick={openInvoice}>Pregled računa</button>
        <button onClick={printPaper}>Print računa</button>
      </MainFooter>
    </InvoiceStyle>
  );
};

export default Invoice;
