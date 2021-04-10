import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainStyle from './MainStyle';

import Sidebar from './Sidebar.js';
import Partners from '../pages/Partners/Partners';
import Invoices from '../pages/Invoices/Invoices.js';
import Articles from '../pages/Articles/Articles';
import DeliveryNotes from '../pages/DeliveryNotes/DeliveryNotes.js';
import Statistika from '../pages/Stats/Stats.js';
import Partner from '../pages/Partners/Partner/Partner';
import Invoice from '../pages/Invoices/Invoice/Invoice';
import InvoicePreview from '../pages/Invoices/InvoicePreview/InvoicePreview';
import DeliveryNote from '../pages/DeliveryNotes/DeliveryNote/DeliveryNote';
import Article from '../pages/Articles/Article/Article';
import AddPartner from '../pages/Partners/AddPartner';
import AddInvoice from '../pages/Invoices/AddInvoice';
import AddArticle from '../pages/Articles/AddArticle';

const Main = () => {
  return (
    <MainStyle>
      <Sidebar />

      <div className="main-section">
        <Switch>
          <Route exact path="/" component={Partners} />
          <Route path="/partners" component={Partners} />
          <Route path="/invoices" component={Invoices} />
          <Route path="/articles" component={Articles} />
          <Route path="/otpremnice" component={DeliveryNotes} />
          <Route path="/statistika" component={Statistika} />
          <Route path="/partner" component={Partner} />
          <Route path="/invoice" component={Invoice} />
          <Route path="/invoice-preview" component={InvoicePreview} />
          <Route path="/deliverynote" component={DeliveryNote} />
          <Route path="/article" component={Article} />
          <Route path="/add-partner" component={AddPartner} />
          <Route path="/add-invoice" component={AddInvoice} />
          <Route path="/add-article" component={AddArticle} />
        </Switch>
      </div>
    </MainStyle>
  );
};

export default Main;
