import Dexie from 'dexie';

const db = new Dexie('myDb');

db.version(2).stores({
  partners: '++id, name, address, dateAdded',
  invoices:
    '++id, partner, invoiceNumber, invoiceDate, dlvNoteNumber, orderNumber, deliveryDate, supplierCode, invoiceType, invoiceState, articles, invoiceNote, invoiceTotal',
  invoiceArticles:
    '++id, invoiceId, name, type, price, quantity, measure, fullPrice',
  articles: '++id, name, type, measure, tax, rebateBase, rebateAdded, price',
  dlvNotes: '++id, dlvNoteNumber, dlvNoteDate',
  invoicePreview: 'invID',
});

db.open().catch((err) => {
  console.log(err.stack || err);
});

export default db;
