import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import db from '../../../services/db';

import InvoiceStyle from './InvoiceStyle';

const Invoice = (props) => {
  const [invoice, setInvoice] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getKupci = async () => {
      const bazaPartnera = await db.kupci.toArray();
      const idPartnera = props.location.state.row;
      const idPartneraNum = Number(idPartnera.id);

      const filterPartner = bazaPartnera.filter(
        (partner) => partner.id === idPartneraNum + 1
      );

      setInvoice(filterPartner);
    };

    getKupci();
  }, []);

  return (
    <InvoiceStyle>
      <p>Individual invoice</p>

      {invoice.map((invoice) => (
        <>
          <h1>{invoice.id}</h1>
          <p>{invoice.adresa}</p>
        </>
      ))}

      <div>
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          Natrag na račune
        </button>
      </div>
    </InvoiceStyle>
  );
};

export default Invoice;
