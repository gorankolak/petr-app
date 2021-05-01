import React, { useState, useEffect } from 'react';
import db from '../../services/db';

import { DefaultTable } from '../../components/Table/Table';

const { ipcRenderer } = window.require('electron');
const { dialog } = window.require('electron').remote;

const DeliveryNotes = () => {
  const [dlvNotes, setDlvNotes] = useState([]);

  useEffect(() => {
    const getDlvNotes = async () => {
      const dlvNotesData = await db.dlvNotes.toArray();

      setDlvNotes(dlvNotesData);
    };

    getDlvNotes();
  }, []);

  const savePdf = () => {
    ipcRenderer.send('print-to-pdf');

    dialog.showMessageBox({ message: 'File sačuvan!' });
  };

  const COLUMNS = [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Kupac',
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
      <DefaultTable path={path} appData={dlvNotes} tableColumns={COLUMNS} />
      <button onClick={savePdf}>Sačuvaj PDF</button>
    </div>
  );
};

export default DeliveryNotes;
