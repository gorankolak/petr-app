import React from 'react';

import { DefaultTable } from '../../components/Table/Table';
import { COLUMNS } from '../../components/Table/Columns';

const { ipcRenderer } = window.require('electron');
const { dialog } = window.require('electron').remote;

const DeliveryNotes = () => {
  const savePdf = () => {
    ipcRenderer.send('print-to-pdf');

    dialog.showMessageBox({ message: 'File sačuvan!' });
  };
  const data = [
    {
      id: 666,
      datum: '2/9/2020',
      broj_racuna: 1034343,
      otpremnica: 32,
    },
    {
      id: 6666666,
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
      <button onClick={savePdf}>Sačuvaj PDF</button>
    </div>
  );
};

export default DeliveryNotes;
