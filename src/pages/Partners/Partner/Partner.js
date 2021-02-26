import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import db from '../../../services/db';

import PartnerStyle from './PartnerStyle';

const Partner = (props) => {
  const [partner, setPartner] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getKupci = async () => {
      const bazaPartnera = await db.kupci.toArray();
      const idPartnera = props.location.state.row;
      const idPartneraNum = Number(idPartnera.id);

      const filterPartner = bazaPartnera.filter(
        (partner) => partner.id === idPartneraNum + 1
      );

      setPartner(filterPartner);
    };

    getKupci();
  }, []);

  return (
    <PartnerStyle>
      <p>Ovo je partner sa id brojem:</p>
      {partner.map((partner) => (
        <>
          <h2>{partner.naziv}</h2>
          <h3>ID: {partner.id}</h3>
          <p>{partner.adresa}</p>
        </>
      ))}

      <div>
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          Nazad na listu partnera
        </button>
      </div>
    </PartnerStyle>
  );
};

export default Partner;
