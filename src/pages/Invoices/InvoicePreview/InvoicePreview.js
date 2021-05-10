import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import db from '../../../services/db';

const { ipcRenderer } = window.require('electron');
const { dialog } = window.require('electron').remote;

const InvoicePreviewStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  padding: 3rem;
  margin: -2.5rem;
  background: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    padding-top: 1rem;
    margin-bottom: 1rem;

    .first {
      width: 60%;

      p {
        font-size: 12px;
        font-style: italic;
      }
    }

    .second {
      width: 40%;

      p {
        font-size: 12px;
      }
    }
  }

  h1 {
    font-size: 16px;
    padding-bottom: 0;
    /* margin-bottom: 0.5em; */
  }

  .label {
    font-size: 8px;
    margin-bottom: 0;
  }

  .content {
    font-size: 12px;
    line-height: 1.5;
    font-weight: 700;
    margin-bottom: 0.5em;
  }

  .half {
    width: 45%;
  }

  .topwrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    .first,
    .second {
      width: 30%;
    }

    .third {
      width: 40%;
    }
  }

  .table {
    width: 100%;
    margin-bottom: 1rem;

    table {
      width: 100%;
    }

    thead {
      background: ${(props) => props.theme.color.grey};
      font-size: 10px;

      th {
        padding: 5px;
        line-height: 1.2;
      }
    }

    td {
      padding: 0.25em;
      font-size: 10px;
      line-height: 1.3;
      text-align: center;
      border-bottom: 1px solid ${(props) => props.theme.color.grey};
    }
  }

  .table-final {
    display: flex;
    justify-content: flex-end;
    padding: 0.5rem 1rem;
    align-items: baseline;

    .total-label {
      padding-right: 20px;
      font-size: 12px;
    }

    .total-price {
      font-size: 16px;
      font-weight: 700;
    }
  }

  .bottomwrap {
    margin-bottom: 1rem;
  }

  .footer {
    position: absolute;
    display: flex;
    width: calc(100% - 6rem);
    bottom: 3rem;
    padding-top: 1rem;
    font-size: 8px;
    border-top: 1px solid ${(props) => props.theme.color.black_disabled};

    div {
      width: calc(100% / 3);
    }

    .third {
      padding-left: 3rem;
    }
  }
`;

const InvoicePreview = (props) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const getInvoices = async () => {
      const invoices = await db.invoices.toArray();
      const invoicePreview = await db.invoicePreview.toArray();

      const oneInvoice = await db.invoices.get({
        invoiceNumber: invoicePreview[0].invID,
      });

      setInvoices(oneInvoice);
    };

    getInvoices();
  }, []);

  console.log(invoices);

  const savePdf = () => {
    ipcRenderer.send('print-to-pdf');

    dialog.showMessageBox({ message: 'File sačuvan!' });
  };

  return (
    <InvoicePreviewStyle>
      <div className="header">
        <div className="first">
          <h1>Petričević d.o.o.</h1>
          <p>
            za proizvodnju, trgovinu i usluge <br />
            Kolodvorska 74, 32284 Stari Mikanovci <br />
            OIB: 46827770736
          </p>
        </div>
        <div className="second">
          <h1>Račun br. {invoices.invoiceNumber}</h1>
          <p>
            Datum računa: <strong>01.05.2021.</strong>
          </p>
        </div>
      </div>

      <div className="topwrap">
        <div className="first">
          <p className="label">Šifra dobavljača</p>
          <p className="content">{invoices.supplierCode}</p>
          <p className="label">Otpremnica br.</p>
          <p className="content">{invoices.dlvNoteNumber}</p>
          <p className="label">Narudžbenica br.</p>
          <p className="content">{invoices.orderNumber}</p>
        </div>
        <div className="second">
          <p className="label">Datum isporuke</p>
          <p className="content">{invoices.deliveryDate}</p>
          <p className="label">Valuta</p>
          <p className="content">-</p>
        </div>
        <div className="third">
          <p className="label">Datum isporuke</p>
          <h1>{invoices.partner}</h1>
        </div>
      </div>

      <div className="table">
        <table>
          <thead>
            <th>Rb.</th>
            <th>EAN KOD</th>
            <th>Naziv artikla</th>
            <th>Kol.</th>
            <th>Cijena</th>
            <th>Rabat</th>
            <th>Jed. cijena</th>
            <th>Cijena bez poreza</th>
            <th>PDV</th>
            <th>Ukupna cijena</th>
          </thead>
          <tbody>
            <tr>
              <td>X</td>
              <td>{invoices.supplierCode}</td>
              <td>konzum jaja L/30 kom.</td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td>3500kn*</td>
            </tr>
            <tr>
              <td>X</td>
              <td>{invoices.supplierCode}</td>
              <td>konzum jaja L/30 kom.</td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td>3500kn*</td>
            </tr>
            <tr>
              <td>X</td>
              <td>{invoices.supplierCode}</td>
              <td>konzum jaja L/30 kom.</td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td>3500kn*</td>
            </tr>
          </tbody>
        </table>
        <div className="table-final">
          <span className="total-label">UKUPNO:</span>
          <span className="total-price">{invoices.invoiceTotal}</span>
        </div>
      </div>

      <div className="bottomwrap">
        <p className="label">Način plaćanja</p>
        <p className="content">{invoices.invoiceType}</p>
        <p className="label">Operater / račun izdao</p>
        <p className="content">Goran Kolak</p>
        <p className="label">Napomena</p>
        <p className="content">{invoices.invoiceNote}</p>
      </div>

      <div className="footer">
        <div className="first">
          <p className="label">Adresa</p>
          <p className="label">
            Kolodvorska 74, <br /> 32284 Stari Mikanovci
          </p>
        </div>
        <div className="second">
          <p className="label">Pravni podaci</p>
          <p className="label">
            OIB: 46827770736 <br /> Žiro račun: 2484008-1101347725 <br /> IBAN:
            HR1824840081101347725 <br /> IBAN: HR9224070001100495989 <br />{' '}
            SWIFT: RZBHHR2X <br />
            OTP banka
          </p>
        </div>
        <div className="third">
          <p className="label">Kontakt</p>
          <p className="label">
            tel: 032 / 210 347
            <br /> fax: 032 / 210 318
          </p>
        </div>
      </div>
    </InvoicePreviewStyle>
  );
};

export default InvoicePreview;
