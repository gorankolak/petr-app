import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import db from '../../services/db';

import { MainFooter } from '../../components/MainFooter/MainFooter';
import { Button } from '../../components/Components';
import AddPartnerStyle from './AddPartnerStyle';

const { dialog } = window.require('electron').remote;

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

      dialog.showMessageBox({ message: 'Kupac uspješno dodan' });

      history.push({
        pathname: '/partner',
        state: {
          row: {
            values: newPartner,
          },
        },
      });
      db.partners.add(newPartner);
    } else {
      dialog.showMessageBox({ message: 'Podaci o kupcu su nepotpuni' });
    }
  };

  return (
    <AddPartnerStyle>
      <h2>Dodaj kupca</h2>
      <form onSubmit={submitPartner}>
        {/* <div className="formWrapper"> */}
        <div className="formColumn">
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
            <Button type="submit">Dodaj</Button>
          </div>
        </div>
      </form>

      <MainFooter>
        <Button
          onClick={() => {
            history.goBack();
          }}
        >
          Nazad na listu kupaca
        </Button>
      </MainFooter>
    </AddPartnerStyle>
  );
};

export default AddPartner;
