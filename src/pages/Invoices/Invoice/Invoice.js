import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import db from '../../../services/db';

import InvoiceStyle from './InvoiceStyle';

const { ipcRenderer } = window.require('electron');
const { dialog } = window.require('electron').remote;

const Invoice = (props) => {
  const [invoice, setInvoice] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getInvoice = async () => {
      // const bazaPartnera = await db.invoices.toArray();
      const invoiceData = props.location.state.row.values;

      setInvoice(invoiceData);
    };

    getInvoice();
  }, []);

  const savePdf = () => {
    ipcRenderer.send('print-to-pdf');

    dialog.showMessageBox({ message: 'File sačuvan!' });
  };

  return (
    <InvoiceStyle>
      <p>Individual invoice</p>

      <>
        <h2>Račun br. {invoice.invoiceNumber}</h2>
        <p>Datum izdavnanja: {invoice.invoiceDate}</p>
        <p>Iznos računa: {invoice.price}</p>
        <p>Stanje računa: {invoice.state}</p>
      </>

      <div>
        <button onClick={savePdf}>Sačuvaj u PDF</button>
      </div>

      <div>
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          Natrag na listu računa
        </button>
      </div>
    </InvoiceStyle>
  );
};

export default Invoice;
