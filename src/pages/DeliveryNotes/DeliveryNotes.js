import React, { useState, useEffect } from 'react';
import db from '../../services/db';

import { DefaultTable } from '../../components/Table/Table';

const { ipcRenderer } = window.require('electron');
const { dialog } = window.require('electron').remote;

const DeliveryNotes = () => {
  const [baza, setBaza] = useState([]);

  useEffect(() => {
    const getKupci = async () => {
      const kupci = await db.kupci.toArray();

      setBaza(kupci);
    };

    getKupci();
  }, []);

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

  const COLUMNS = [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Partner',
      accessor: 'partner',
    },
    {
      Header: 'Adresa',
      accessor: 'adresa',
    },
  ];

  const path = 'deliverynote';

  return (
    <div>
      <h2>Otpremnice</h2>
      {/* <DefaultTable /> */}
      <DefaultTable path={path} appData={baza} tableColumns={COLUMNS} />
      <button onClick={savePdf}>Sačuvaj PDF</button>
    </div>
  );
};

export default DeliveryNotes;
