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
  padding: 3rem;
  margin: -3rem;
  background: #fff;

  h1 {
    padding-bottom: 0.25em;
    margin-bottom: 0.5em;
    border-bottom: 1px solid;
  }

  h2 {
    margin-bottom: 0;
    text-transform: capitalize;
  }

  .half {
    width: 45%;
  }

  .topwrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5em;
  }

  .bottomwrap {
    margin-top: 2em;
    padding: 2em;
    background: lightgray;
  }

  .testing {
    position: absolute;
    bottom: 3rem;
    padding-top: 3px;
    font-size: 12px;
    border-top: 1px solid;
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
      <h1>RAČUN br. 007</h1>
      <h2>
        <strong>{invoices.invoiceNumber}</strong>
      </h2>
      {/* <table>
        <thead>
          <th>prva</th>
          <th>druga</th>
          <th>treća</th>
          <th>cetvrtta</th>
        </thead>
        <tbody>
          <tr>
            <td>Test</td>
            <td>rer</td>
            <td>rerere</td>
            <td>xxbvxcb</td>
          </tr>
        </tbody>
      </table> */}
      <div className="topwrap">
        <p className="half">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa atque,
          tempore alias architectoadipisci, dolorum ad pariatur, facilis
          eligendir rerum quagnam totam architecto recusandae omnis
          consequuntur.
        </p>
        <p className="half">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa atque,
          repellendus itaque, error rerum quasi quam unde magnam totam
          architecto recusandae omnis consequuntur.
        </p>
      </div>
      <h2>Test v1.0</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa atque,
        tempitate sequi adipisci, dolorum ad pariatur, facilis eligendi
        doloribus suscipit nobis ea excepturi! Quidem repellendus itaque, error
        rerum quasi quam unde magnam totam architecto recusandae omnis
        consequuntur.
      </p>
      <div className="bottomwrap">
        <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h3>
        <h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          sapiente provident ququatur unde ullam dicta perspiciatis voluptas
          fuga hic nam, fugit molestiae rem beatae perferendis maiores itaque
          eligendi et.
        </h4>
      </div>
      <p className="testing">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, in.
      </p>
    </InvoicePreviewStyle>
  );
};

export default InvoicePreview;
