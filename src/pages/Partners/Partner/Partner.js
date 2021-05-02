import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { MainFooter } from '../../../components/mainFooter/mainFooter';
import { Button } from '../../../components/Components';
import PartnerStyle from './PartnerStyle';

const Partner = (props) => {
  const [partner, setPartner] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getPartners = async () => {
      const partnerData = props.location.state.row.values;

      console.log(partnerData);

      setPartner(partnerData);
    };

    getPartners();
  }, []);

  return (
    <PartnerStyle>
      <p>Ovo je kupac sa id brojem:</p>

      <h2>{partner.name}</h2>
      <p>{partner.address}</p>
      <p>{partner.dateAdded}</p>

      <MainFooter>
        {/* <Link to="/add-invoice">
          <Button>Dodaj novi račun</Button>
        </Link> */}

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
