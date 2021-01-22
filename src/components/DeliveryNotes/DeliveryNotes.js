import React from 'react';
import { DefaultTable } from '../Table/Table';
import { COLUMNS } from '../Table/Columns';

// ---------------
// const ipc = require('electron').ipcRenderer;

const { ipcRenderer } = window.require('electron');
const { dialog } = window.require('electron').remote;

// const printPDFBtn = document.getElementById('pdfME');

// printPDFBtn.addEventListener('click', function (event) {
//   ipc.send('print-to-pdf');
// });

// ---------------

const DeliveryNotes = () => {
  const clicker = () => {
    // ipc.send('print-to-pdf');
    console.log('yesssss nooo');
    ipcRenderer.send('print-to-pdf');

    dialog.showMessageBox({ message: 'File sačuvan!' });
  };
  const data = [
    {
      id: 555,
      datum: '2/9/2020',
      broj_racuna: 1034343,
      otpremnica: 32,
    },
    {
      id: 555,
      datum: '2/29/2020',
      broj_racuna: 1343430,
      otpremnica: 3334342,
    },
  ];
  return (
    <div>
      <h2>Otpremnice</h2>
      {/* <DefaultTable /> */}
      <DefaultTable appData={data} tableColumns={COLUMNS} />
      <button onClick={clicker}>Clikaaaaj</button>
    </div>
  );
};

export default DeliveryNotes;
