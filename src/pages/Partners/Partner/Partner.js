import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

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
      <p>Ovo je partner sa id brojem:</p>

      <h2>{partner.name}</h2>
      <p>{partner.address}</p>
      <p>{partner.dateAdded}</p>

      <div>
        {/* <Link to="/add-invoice">
          <button>Dodaj novi račun</button>
        </Link> */}

        <Link
          to={{
            pathname: '/add-invoice',
            state: partner,
          }}
        >
          <button>Dodaj novi račun</button>
        </Link>
      </div>

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
