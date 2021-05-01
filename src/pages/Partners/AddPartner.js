import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import db from '../../services/db';

import { MainFooter } from '../../components/mainFooter/mainFooter';
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
      <h2>Dodaj kupca</h2>
      <form onSubmit={submitPartner}>
        <div className="formItem">
          <label htmlFor="name">Ime kupca</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setPartnerName(e.target.value)}
          />
        </div>

        <div className="formItem">
          <label htmlFor="address">Adresa kupca</label>
          <input
            type="text"
            id="address"
            onChange={(e) => setPartnerAdress(e.target.value)}
          />
        </div>

        <div className="formItem">
          <button type="submit">Dodaj</button>
        </div>
      </form>

      <MainFooter>
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          Nazad na listu kupaca
        </button>
      </MainFooter>
    </AddPartnerStyle>
  );
};

export default AddPartner;
