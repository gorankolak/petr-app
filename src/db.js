import Dexie from 'dexie';

const db = new Dexie('myDb');
db.version(1).stores({
  kupci: 'naziv, adresa',
});

db.version(2).stores({
  newDvaRacuni: '++ide, datum, broj_racuna, otpremnica',
});

db.newDvaRacuni.bulkAdd([
  { datum: '2/9/2020', broj_racuna: 10, otpremnica: 32 },
  { datum: '1/22/2020', broj_racuna: 44, otpremnica: 83 },
  { datum: '4/14/2020', broj_racuna: 86, otpremnica: 28 },
]);

db.open().catch((err) => {
  console.log(err.stack || err);
});

export default db;
