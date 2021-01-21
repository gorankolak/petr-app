import React from 'react';
import { DefaultTable } from '../Table/Table';
import { COLUMNS } from '../Table/Columns';

const DeliveryNotes = () => {
  const data = [
    {
      id: 134,
      datum: '2/9/2020',
      broj_racuna: 1034343,
      otpremnica: 32,
    },
    {
      id: 555,
      datum: '2/29/2020',
      broj_racuna: 1343430,
      otpremnica: 3334342,
    },
  ];
  return (
    <div>
      <h2>Otpremnice</h2>
      {/* <DefaultTable /> */}
      <DefaultTable appData={data} tableColumns={COLUMNS} />
    </div>
  );
};

export default DeliveryNotes;
