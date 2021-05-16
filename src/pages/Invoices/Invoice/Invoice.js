import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import db from '../../../services/db';

import { MainFooter } from '../../../components/MainFooter/MainFooter';
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
  const [dlvNoteNumber, setDlvNoteNumber] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [invoiceState, setInvoiceState] = useState('');
  const [articles, setArticles] = useState('');
  const [invoiceType, setInvoiceType] = useState('');
  const [supplierCode, setSupplierCode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [invoiceNote, setInvoiceNote] = useState('');
  const [invoiceTotal, setInvoiceTotal] = useState('');

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

    dialog.showMessageBox({ message: 'File sačuvan' });
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

        dialog.showMessageBox({ message: 'Račun obrisan' });

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
      // partner:
      //   history.location.state !== undefined
      //     ? history.location.state.name
      //     : partner,
      invoiceDate: invoiceDate,
      dlvNoteNumber: dlvNoteNumber,
      orderNumber: orderNumber,
      deliveryDate: deliveryDate,
      supplierCode: supplierCode,
      invoiceType: invoiceType,
      articles: articles,
      invoiceTotal: invoiceTotal,
      invoiceState: invoiceState,
      invoiceNote: invoiceNote,
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
        <h2>Račun br. {invoice.invoiceNumber}</h2>

        <div className="formWrapper">
          <div className="formColumn">
            {/* <div className="formItem">

            </div> */}

            <div className="formItem">
              Datum izdavanja: <strong>{invoice.invoiceDate}</strong>
            </div>

            <div className="formItem">
              Stanje računa: <strong>{invoice.invoiceState}</strong>
            </div>

            <div className="formItem">
              Otpremnice br <strong>{invoice.dlvNoteNumber}</strong>
            </div>

            <div className="formItem">
              Narudžbenica br. <strong>{invoice.orderNumber}</strong>
            </div>

            <div className="formItem">
              Šifra dobavljača <strong>{invoice.supplierCode}</strong>
            </div>
          </div>

          <div className="formColumn">
            <div className="formItem">
              Odabir artikala <strong>{invoice.articles}</strong>
            </div>

            <div className="formItem">
              Vrsta računa <strong>{invoice.invoiceType}</strong>
            </div>

            <div className="formItem">
              Stanje <strong>{invoice.invoiceState}</strong>
            </div>

            <div className="formItem">
              Datum isporuke <strong>{invoice.deliveryDate}</strong>
            </div>

            <div className="formItem">
              Napomena <strong>{invoice.invoiceNote}</strong>
            </div>

            <div className="formItem">
              Iznos računa <strong>{invoice.deliveryDate}</strong>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    invoiceDisplay = (
      <form onSubmit={changeInvoice}>
        <h2>Izmjena računa</h2>

        <div className="formWrapper">
          <div className="formColumn">
            <div className="formItem">
              Račun br.{' '}
              <input
                type="text"
                id="number"
                placeholder={invoice.invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                value={invoiceNumber}
              />
            </div>
            <div className="formItem">
              Datum izdavanja{' '}
              <input
                type="text"
                id="date"
                placeholder={invoice.invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                value={invoiceDate}
              />
            </div>
            <div className="formItem">
              <label htmlFor="dlvNoteNumber">Otpremnice br.</label>
              <input
                type="text"
                id="dlvNoteNumber"
                placeholder={invoice.dlvNoteNumber}
                onChange={(e) => setDlvNoteNumber(e.target.value)}
                value={dlvNoteNumber}
              />
            </div>

            <div className="formItem">
              <label htmlFor="orderNumber">Narudžbenica br.</label>
              <input
                type="text"
                id="orderNumber"
                placeholder={invoice.orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                value={orderNumber}
              />
            </div>

            <div className="formItem">
              <label htmlFor="supplierCode">Šifra dobavljača</label>
              <input
                type="text"
                id="supplierCode"
                placeholder={invoice.supplierCode}
                onChange={(e) => setSupplierCode(e.target.value)}
                value={supplierCode}
              />
            </div>
          </div>

          <div className="formColumn">
            <div className="formItem">
              <label htmlFor="articles">Odabir artikala</label>
              <input
                type="text"
                id="articles"
                placeholder={invoice.articles}
                onChange={(e) => {
                  setArticles(e.target.value);
                  // change later
                  setInvoiceTotal('125,00kn');
                }}
                value={articles}
              />

              {/* omogućiti izbor više artikala + količina za svakog */}
            </div>
            <div className="formItem radioGroupWrapper">
              <label htmlFor="invoiceType">Vrsta računa</label>
              <div className="radioGroup">
                <input
                  type="radio"
                  name="type"
                  id="invoiceType"
                  onChange={(e) => setInvoiceType('Račun')}
                />
                <label htmlFor="invoiceType">Račun</label>
              </div>
              <div className="radioGroup">
                <input
                  type="radio"
                  name="type"
                  id="invoiceType"
                  onChange={(e) =>
                    setInvoiceType('Obavijest o knjiženju na teret')
                  }
                />
                <label htmlFor="invoiceType">
                  Obavijest o knjiženju na teret
                </label>
              </div>
              <div className="radioGroup">
                <input
                  type="radio"
                  name="type"
                  id="invoiceType"
                  onChange={(e) =>
                    setInvoiceType('Obavijest o knjiženju u korist')
                  }
                />
                <label htmlFor="invoiceType">
                  Obavijest o knjiženju u korist
                </label>
              </div>
            </div>

            <div className="formItem">
              <label htmlFor="deliveryDate">Datum isporuke</label>
              <input
                type="text"
                id="deliveryDate"
                placeholder={invoice.invoiceDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                value={invoiceDate}
              />
            </div>

            <div className="formItem">
              <label htmlFor="invoiceNote">Napomena</label>
              <textarea
                name="invoiceNote"
                id="invoiceNote"
                cols="30"
                rows="4"
                placeholder={invoice.invoiceNumber}
                onChange={(e) => setInvoiceNote(e.target.value)}
                value={invoiceNote}
              ></textarea>
            </div>
          </div>

          <div className="formColumn">
            <div className="formItem">
              <p>Stanje računa</p>
              <div className="formItem radioGroupWrapper">
                {/* <label htmlFor="invoiceState">Stanje</label> */}
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
            </div>

            <div className="formItem">
              Iznos računa: <strong>{invoice.invoiceTotal}</strong>
            </div>

            <div>
              <Button
                onClick={() => {
                  setEditInvoice(false);
                  setInvoiceNumber('');
                  setInvoiceDate('');
                  setInvoiceState('');
                  setDlvNoteNumber('');
                  setOrderNumber('');
                  setArticles('');
                  setInvoiceType('');
                  setSupplierCode('');
                  setDeliveryDate('');
                  setInvoiceNote('');
                  setInvoiceTotal('');
                }}
              >
                Otkaži izmjenu
              </Button>

              <Button type="submit">Spremi izmjene</Button>
            </div>
          </div>
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
            setDlvNoteNumber(invoice.dlvNoteNumber);
            setOrderNumber(invoice.orderNumber);
            setArticles(invoice.articles);
            setInvoiceType(invoice.invoiceType);
            setSupplierCode(invoice.supplierCode);
            setDeliveryDate(invoice.deliveryDate);
            setInvoiceNote(invoice.invoiceNote);
            setInvoiceTotal(invoice.invoiceTotal);
          }}
        >
          Izmijeni račun
        </Button>
        {/* <Link to="/add-invoice">
          <Button>Dodaj novi račun</Button>
        </Link> */}

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
