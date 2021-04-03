import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import SidebarStyle from './SidebarStyle';

const Sidebar = () => {
  const [listOrder, setListOrder] = useState(1);
  return (
    <SidebarStyle>
      <ul className="sidebar-menu">
        <li>
          {/* <NavLink exact to="/" activeClassName="sidebar-selected"> */}
          <NavLink
            exact
            to="/"
            className={listOrder === 0 ? 'sidebar-selected' : ''}
            onClick={() => setListOrder(0)}
          >
            Partneri
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/invoices"
            className={listOrder === 1 ? 'sidebar-selected' : ''}
            onClick={() => setListOrder(1)}
          >
            Računi
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/articles"
            className={listOrder === 2 ? 'sidebar-selected' : ''}
            onClick={() => setListOrder(2)}
          >
            Artikli
          </NavLink>
        </li>{' '}
        <li>
          <NavLink
            to="/otpremnice"
            className={listOrder === 3 ? 'sidebar-selected' : ''}
            onClick={() => setListOrder(3)}
          >
            Otpremnice
          </NavLink>
        </li>{' '}
        <li>
          <NavLink
            to="/statistika"
            className={listOrder === 4 ? 'sidebar-selected' : ''}
            onClick={() => setListOrder(4)}
          >
            Statistika
          </NavLink>
        </li>
      </ul>
    </SidebarStyle>
  );
};

export default Sidebar;
