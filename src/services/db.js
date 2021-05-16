import Dexie from 'dexie';

const db = new Dexie('myDb');

db.version(1).stores({
  partners: '++id, name, address, dateAdded',
  invoices:
    '++id, partner, invoiceNumber, invoiceDate, dlvNoteNumber, orderNumber, deliveryDate, supplierCode, invoiceType, invoiceState, articles, invoiceNote, invoiceTotal',
  articles: '++id, name, type',
  dlvNotes: '++id, dlvNoteNumber, dlvNoteDate',
  invoicePreview: 'invID',
});

db.open().catch((err) => {
  console.log(err.stack || err);
});

export default db;
