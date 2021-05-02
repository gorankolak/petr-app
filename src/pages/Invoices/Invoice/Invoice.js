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
        {/* <Button
          onClick={() => {
            history.goBack();
          }}
        >
          Natrag na listu računa
        </Button> */}
        <Link to="/invoices">
          <Button>Lista računa</Button>
        </Link>

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
