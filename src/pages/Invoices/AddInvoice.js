import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import db from '../../services/db';

import { MainFooter } from '../../components/MainFooter/MainFooter';
import { Button } from '../../components/Components';
import AddInvoiceStyle from './AddInvoiceStyle';

const { dialog } = window.require('electron').remote;

const AddInvoice = () => {
  const history = useHistory();
  const [partnersAll, setPartnersAll] = useState([]);
  const [invoicesAll, setInvoicesAll] = useState([]);
  const [partner, setPartner] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [dlvNoteNumber, setDlvNoteNumber] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  // const [price, setPrice] = useState('');
  const [invoiceState, setInvoiceState] = useState('');
  const [articles, setArticles] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoiceType, setInvoiceType] = useState('');
  const [supplierCode, setSupplierCode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [invoiceNote, setInvoiceNote] = useState('');
  const [invoiceTotal, setInvoiceTotal] = useState('');
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

  const submitInvoice = async (e) => {
    e.preventDefault();

    if (
      partner !== '' &&
      invoiceNumber !== '' &&
      invoiceDate !== '' &&
      dlvNoteNumber !== '' &&
      orderNumber !== '' &&
      deliveryDate !== '' &&
      supplierCode !== '' &&
      invoiceType !== '' &&
      invoiceState !== '' &&
      articles !== ''
      // invoiceNote !== ''
      // (partner !== '' || history.location.state !== undefined)
    ) {
      newInvoice = {
        invoiceNumber: invoiceNumber,
        partner:
          history.location.state !== undefined
            ? history.location.state.name
            : partner,
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

      db.invoices.add(newInvoice);
      dialog.showMessageBox({ message: 'Račun uspješno dodan' });

      history.push({
        pathname: '/invoice',
        state: {
          row: {
            values: newInvoice,
          },
        },
      });
    } else {
      dialog.showMessageBox({ message: 'Račun nije u potpunosti ispunjen' });
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
              {/* <strong>{invoicesAll.length}</strong> */}
              <div className="half">
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  value={invoiceNumber}
                />
                <Button
                  tableBtn
                  onClick={(e) => {
                    e.preventDefault();
                    setInvoiceNumber(`${invoicesAll.length + 1}-1-1`);
                  }}
                >
                  Popuni
                </Button>
              </div>
            </div>

            <div className="formItem">
              <label htmlFor="partner">Kupac</label>
              {history.location.state === undefined ? (
                <select
                  value={partner}
                  onChange={(e) => setPartner(e.target.value)}
                  id="partner"
                >
                  {partnersAll.map((partner) => (
                    <>
                      <option value="" disabled selected hidden>
                        Dodaj kupca
                      </option>
                      <option value={partner.name}>{partner.name}</option>
                    </>
                  ))}
                </select>
              ) : (
                <strong>{history.location.state.name}</strong>
              )}
            </div>

            <div className="formItem">
              <label htmlFor="invoiceDate">Datum računa</label>

              <div className="half">
                <input
                  type="text"
                  id="invoiceDate"
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  value={invoiceDate}
                />
                <Button
                  tableBtn
                  onClick={(e) => {
                    e.preventDefault();
                    setInvoiceDate(`${new Date().toLocaleDateString()}`);
                  }}
                >
                  Popuni
                </Button>
              </div>
            </div>

            <div className="formItem">
              <label htmlFor="dlvNoteNumber">Otpremnice br.</label>
              <input
                type="text"
                id="dlvNoteNumber"
                onChange={(e) => setDlvNoteNumber(e.target.value)}
              />
            </div>

            <div className="formItem">
              <label htmlFor="orderNumber">Narudžbenica br.</label>
              <input
                type="text"
                id="orderNumber"
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>

            <div className="formItem">
              <label htmlFor="supplierCode">Šifra dobavljača</label>
              <input
                type="text"
                id="supplierCode"
                onChange={(e) => setSupplierCode(e.target.value)}
              />
            </div>
          </div>

          <div className="formColumn">
            <div className="formItem">
              <label htmlFor="articles">Odabir artikala</label>
              <input
                type="text"
                id="articles"
                onChange={(e) => {
                  setArticles(e.target.value);
                  // change later
                  setInvoiceTotal('125,00kn');
                }}
              />

              {/* omogućiti izbor više artikala + količina za svakog */}
            </div>

            {/* <div className="formItem">
              <label htmlFor="invoiceType">Vrsta računa</label>
              <input
                type="text"
                id="invoiceType"
                onChange={(e) => setInvoiceType(e.target.value)}
              />
            </div> */}
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

            <div className="formItem radioGroupWrapper">
              <label htmlFor="invoiceState">Stanje</label>
              <div className="radioGroup">
                <input
                  type="radio"
                  name="invoiceState"
                  id="invoiceState"
                  onChange={(e) => setInvoiceState('Plaćeno')}
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

            <div className="formItem">
              <label htmlFor="deliveryDate">Datum isporuke</label>
              <input
                type="text"
                id="deliveryDate"
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>

            <div className="formItem">
              <label htmlFor="invoiceNote">Napomena</label>
              <textarea
                name="invoiceNote"
                id="invoiceNote"
                cols="30"
                rows="4"
                onChange={(e) => setInvoiceNote(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="formColumn accent">
            <h3>Sadržaj računa</h3>
            <p>
              <span>Broj računa:</span>
              <span>{invoiceNumber}</span>
            </p>
            <p>
              <span>Kupac:</span>
              <span>{partner}</span>
            </p>
            <p>
              <span>Datum računa:</span>
              <span>{invoiceDate}</span>
            </p>
            <p>
              <span>Otpremnica br.:</span>
              <span>{dlvNoteNumber}</span>
            </p>
            <p>
              <span>Narudžbenica br.:</span>
              <span>{orderNumber}</span>
            </p>
            <p>
              <span>Šifra dobavljača:</span>
              <span>{supplierCode}</span>
            </p>
            <p>
              <span>Artikli:</span>
              <span>{articles}</span>
            </p>
            <p>
              <span>Vrsta računa:</span>
              <span>{invoiceType}</span>
            </p>
            <p>
              <span>Stanje:</span>
              <span>{invoiceState}</span>
            </p>
            <p>
              <span>Datum isporuke:</span>
              <span>{deliveryDate}</span>
            </p>
            <p>
              <span>Ukupan iznos:</span>
              {/* <span>{price}</span> */}
              <span>{invoiceTotal}</span>
            </p>
          </div>
        </div>

        <div className="formItemAdd">
          <Button type="submit">Dodaj račun</Button>
        </div>
      </form>

      <MainFooter>
        {/* <Button
          onClick={() => {
            history.goBack();
            // history.go(0);
          }}
        >
          Nazad na listu računa
        </Button> */}

        <Link to="/invoices">
          <Button>Lista računa</Button>
        </Link>

        <Link to="/partners">
          <Button>Lista partnera</Button>
        </Link>
      </MainFooter>
    </AddInvoiceStyle>
  );
};

export default AddInvoice;
