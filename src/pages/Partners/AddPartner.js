import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import db from '../../services/db';

import AddPartnerStyle from './AddPartnerStyle';

const AddPartner = () => {
  const history = useHistory();
  const [partnerName, setPartnerName] = useState([]);
  const [partnerAdress, setPartnerAdress] = useState([]);
  let newPartner;

  const submitPartner = (e) => {
    e.preventDefault();

    if (partnerName != '' && partnerAdress != '') {
      newPartner = {
        dateAdded: `${new Date().toLocaleDateString()}`,
        name: partnerName,
        address: partnerAdress,
      };

      db.partners.add(newPartner);
    }
  };

  return (
    <AddPartnerStyle>
      <h2>Dodaj partnera</h2>
      <form onSubmit={submitPartner}>
        <label htmlFor="name">Ime partnera</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setPartnerName(e.target.value)}
        />
        <label htmlFor="address">Adresa partnera</label>
        <input
          type="text"
          id="address"
          onChange={(e) => setPartnerAdress(e.target.value)}
        />
        <button type="submit">Dodaj</button>
      </form>

      <div>
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          Nazad na listu partnera
        </button>
      </div>
    </AddPartnerStyle>
  );
};

export default AddPartner;
