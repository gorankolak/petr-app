import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainStyle from './MainStyle';

import Sidebar from './Sidebar.js';
import Partners from '../Partners/Partners.js';
import Invoices from '../Invoices/Invoices.js';
import Articles from '../Articles/Articles';
import DeliveryNotes from '../DeliveryNotes/DeliveryNotes.js';
import Statistika from '../Stats/Stats.js';
import ThePartner from '../Partners/Partner/ThePartner';

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
          <Route path="/partner" component={ThePartner} />
        </Switch>
      </div>
    </MainStyle>
  );
};

export default Main;
