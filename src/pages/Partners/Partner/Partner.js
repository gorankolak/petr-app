import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import db from '../../../services/db';

import { DefaultTable } from '../../../components/Table/Table';
import { MainFooter } from '../../../components/mainFooter/mainFooter';
import { Button } from '../../../components/Components';
import PartnerStyle from './PartnerStyle';

const Partner = (props) => {
  const [partner, setPartner] = useState([]);
  const [partnerInvoices, setPartnerInvoices] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getPartners = async () => {
      const partnerData = props.location.state.row.values;

      const invoices = await db.invoices
        .where('partner')
        .equals(partnerData.name)
        .toArray();

      console.log(invoices);

      setPartnerInvoices(invoices);
      setPartner(partnerData);
    };

    getPartners();
  }, []);

  const COLUMNS = [
    {
      Header: 'Br.',
      accessor: 'invoiceNumber',
    },
    {
      Header: 'Kupac',
      accessor: 'partner',
    },
    {
      Header: 'Datum izdavanja',
      accessor: 'invoiceDate',
    },
    {
      Header: 'Vrsta računa',
      accessor: 'invoiceType',
    },
    {
      Header: 'Stanje',
      accessor: 'invoiceState',
    },
    {
      Header: 'Ukupan iznos',
      accessor: 'invoiceTotal',
    },
  ];

  const path = 'invoice';

  let invoicesList;
  const noInvoices = <p>Kupac nema izdanih računa.</p>;

  console.log(partnerInvoices);

  partnerInvoices.length !== 0
    ? (invoicesList = (
        <DefaultTable
          path={path}
          appData={partnerInvoices}
          tableColumns={COLUMNS}
        />
      ))
    : (invoicesList = noInvoices);

  return (
    <PartnerStyle>
      <p>Ovo je kupac sa id brojem:</p>

      <h2>{partner.name}</h2>
      <p>{partner.address}</p>
      <p>{partner.dateAdded}</p>

      <h3>Izdani računi:</h3>

      {invoicesList}

      <MainFooter>
        <Button
          onClick={() => {
            history.goBack();
          }}
        >
          Nazad na listu kupaca
        </Button>

        <Link
          to={{
            pathname: '/add-invoice',
            state: partner,
          }}
        >
          <Button>Dodaj novi račun</Button>
        </Link>
      </MainFooter>
    </PartnerStyle>
  );
};

export default Partner;
