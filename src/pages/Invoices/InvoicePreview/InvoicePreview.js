import React from 'react';
import styled from 'styled-components';

const { ipcRenderer } = window.require('electron');
const { dialog } = window.require('electron').remote;

const InvoicePreviewStyle = styled.div`
  /* position: fixed; */
  /* z-index: 100; */
  /* width: 595px; */
  /* height: 842px; */
  /* top: -3rem;
  left: -3rem; */
  /* right: 0; */
  /* bottom: 0; */
  /* padding: 3rem; */
  /* margin: auto; */
  /* background: #fff; */

  /* position: absolute; */
  /* background: #fff; */

  /* display: flex;
  flex-direction: column; */

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
    /* flex: 1/2; */
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

const InvoicePreview = () => {
  const savePdf = () => {
    ipcRenderer.send('print-to-pdf');

    dialog.showMessageBox({ message: 'File sačuvan!' });
  };

  return (
    <InvoicePreviewStyle>
      <h1>RAČUN br. 007</h1>
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
      {/* <button onClick={savePdf}>Sačuvaj u PDF</button> */}
    </InvoicePreviewStyle>
  );
};

export default InvoicePreview;
