import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from '../../../services/db';

import Partner from './ThePartnerStyle';

const ThePartner = (props) => {
  const [partner, setPartner] = useState([]);

  useEffect(() => {
    const getKupci = async () => {
      const bazaPartnera = await db.kupci.toArray();
      const idPartnera = props.location.state.test;

      console.log(idPartnera);

      const filterPartner = bazaPartnera.filter(
        (partner) => partner.id === idPartnera
      );
      // console.log(filterPartner[0].id);
      setPartner(filterPartner);
    };

    getKupci();
  }, []);

  useEffect(() => {});

  return (
    <Partner>
      <p>Ovo je kupac sa id brojem:</p>
      {/* {partner.map((partner) => (
        <>
          <h1>{partner.id}</h1>
          <p>{partner.adresa}</p>
        </>
      ))} */}
      {/* {partner[0].id} */}
    </Partner>
  );
};

export default ThePartner;
