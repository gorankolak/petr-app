import Dexie from 'dexie';

const db = new Dexie('myDb');

// db.version(1).stores({
//   kupci: '++id, naziv, adresa',
// });

// db.version(2).stores({
//   newDvaRacuni: '++ide, datum, broj_racuna, otpremnica',
// });

// db.newDvaRacuni.bulkAdd([
//   { datum: '2/9/2020', broj_racuna: 10, otpremnica: 32 },
//   { datum: '1/22/2020', broj_racuna: 44, otpremnica: 83 },
//   { datum: '4/14/2020', broj_racuna: 86, otpremnica: 28 },
// ]);

db.version(1).stores({
  partners: '++id, name, address, dateAdded',
  invoices:
    '++id, partner, invoiceNumber, invoiceDate, dlvNoteNumber, deliveryDate, supplierCode, type, invoiceState, articles, quantity, note',
  articles: '++id, name, type',
  dlvNotes: '++id, dlvNoteNumber, dlvNoteDate',
});

db.open().catch((err) => {
  console.log(err.stack || err);
});

export default db;

// db.partners
// id, naziv, adresa, datum dodavanja u bazu

// db.invoices
// račun br., datum računa, otpremnica br., datum isporuke, šifra dobavljača, vrsta (select: račun/obavijest o knjiženju), stanje (select: plaćeno/nije plaćeno), artikl (select: pr. jaja), količina cijena, rabat (osnovni/dodatni), cijena bez pdv-a, napomena
// + fixed data (not in db) -> added the same for each invoice e.g., jed. mjere, zbrajanje svih stavki na računu for total price, calculate pdv added etc.

// db.articles
// db.deliverynotes
