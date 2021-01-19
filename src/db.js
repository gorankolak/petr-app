import Dexie from 'dexie';

const db = new Dexie('myDb');
db.version(1).stores({
  kupci: 'naziv, adresa',
});
db.open().catch((err) => {
  console.log(err.stack || err);
});

export default db;
