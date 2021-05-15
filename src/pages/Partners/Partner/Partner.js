import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import db from '../../../services/db';

import { DefaultTable } from '../../../components/Table/Table';
import { MainFooter } from '../../../components/mainFooter/mainFooter';
import { Button } from '../../../components/Components';
import PartnerStyle from './PartnerStyle';

const { dialog } = window.require('electron').remote;

const Partner = (props) => {
  const [partner, setPartner] = useState([]);
  const [partnerInvoices, setPartnerInvoices] = useState([]);

  const [editPartner, setEditPartner] = useState(false);

  const history = useHistory();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [dateAdded, setDateAdded] = useState('');

  useEffect(() => {
    const getPartners = async () => {
      const rowValue = props.location.state.row.values;

      const partnerData = await db.partners.get({
        name: rowValue.name,
      });

      console.log(partnerData);

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

  const deleter = async (id) => {
    const options = {
      buttons: ['Da', 'Otkaži'],
      message: 'Da li ste sigurni da želite obrisati kupca?',
      defaultId: 1,
    };

    dialog.showMessageBox(null, options).then((response) => {
      console.log(response.response);

      if (response.response === 0) {
        db.partners.delete(id);

        dialog.showMessageBox({ message: 'Kupac obrisan' });

        history.push({
          pathname: '/partners',
        });
      }
    });
  };

  const changePartner = async (e) => {
    e.preventDefault();

    const newPartner = {
      name,
      address,
      dateAdded,
    };

    await db.partners.update(partner.id, newPartner);

    const updatedPartner = await db.partners.get({
      name: name,
    });

    setPartner(updatedPartner);
    setName('');
    setAddress('');
    setDateAdded('');
    setEditPartner(false);
  };

  let partnerDisplay;

  if (editPartner === false) {
    partnerDisplay = (
      <>
        <h2>Kupac</h2>
        <div className="formWrapper">
          <div className="formColumn">
            <div className="formItem">
              Naziv kupca: <strong>{partner.name}</strong>
            </div>

            <div className="formItem">
              Adresa kupca: <strong>{partner.address}</strong>
            </div>

            <div className="formItem">
              Datum dodavanja: <strong>{partner.dateAdded}</strong>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    partnerDisplay = (
      <form onSubmit={changePartner}>
        <h2>Izmjena podataka o kupcu</h2>

        <div className="formWrapper">
          <div className="formColumn">
            <div className="formItem">
              Naziv kupca{' '}
              <input
                type="text"
                id="name"
                placeholder={partner.name}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="formItem">
              Adresa kupca{' '}
              <input
                type="text"
                id="address"
                placeholder={partner.address}
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>

            <div className="formItem">
              Datum dodavanja{' '}
              <input
                type="text"
                id="date"
                placeholder={partner.dateAdded}
                onChange={(e) => setDateAdded(e.target.value)}
                value={dateAdded}
              />
            </div>

            <div>
              <Button
                onClick={() => {
                  setEditPartner(false);
                  setName('');
                  setAddress('');
                  setDateAdded('');
                }}
              >
                Otkaži izmjenu
              </Button>

              <Button type="submit">Spremi izmjene</Button>
            </div>
          </div>
        </div>
      </form>
    );
  }

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
      {partnerDisplay}

      <h3>Izdani računi:</h3>

      {invoicesList}

      <MainFooter>
        <Link to="/partners">
          <Button>Nazad na listu kupaca</Button>
        </Link>

        <Link
          to={{
            pathname: '/add-invoice',
            state: partner,
          }}
        >
          <Button>Dodaj novi račun</Button>
        </Link>

        <Button
          onClick={() => {
            setEditPartner(true);
            setName(partner.name);
            setAddress(partner.address);
            setDateAdded(partner.dateAdded);
          }}
        >
          Izmijeni podatke kupca
        </Button>

        <Button
          onClick={() => {
            deleter(partner.id);
          }}
        >
          Obriši kupca
        </Button>
      </MainFooter>
    </PartnerStyle>
  );
};

export default Partner;
