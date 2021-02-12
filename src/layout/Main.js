import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainStyle from './MainStyle';

import Sidebar from './Sidebar.js';
import Partners from '../pages/Partners/Partners';
import Invoices from '../pages/Invoices/Invoices.js';
import Articles from '../pages/Articles/Articles';
import DeliveryNotes from '../pages/DeliveryNotes/DeliveryNotes.js';
import Statistika from '../pages/Stats/Stats.js';
import ThePartner from '../pages/Partners/Partner/ThePartner';

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
