import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import db from '../../../services/db';

import DeliveryNoteStyle from './DeliveryNoteStyle';

const DeliveryNote = (props) => {
  const [notes, setNote] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getKupci = async () => {
      const baza = await db.kupci.toArray();
      const idPartnera = props.location.state.row;
      const idPartneraNum = Number(idPartnera.id);

      const filterPartner = baza.filter(
        (partner) => partner.id === idPartneraNum + 1
      );

      setNote(filterPartner);
    };

    getKupci();
  }, []);

  return (
    <DeliveryNoteStyle>
      <p>Ovo je:</p>
      <h2>Otpremnica</h2>
      {notes.map((note) => (
        <>
          <h1>{note.id}</h1>
          <p>{note.adresa}</p>
        </>
      ))}

      <div>
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          Nazad na listu otpremnica
        </button>
      </div>
    </DeliveryNoteStyle>
  );
};

export default DeliveryNote;
