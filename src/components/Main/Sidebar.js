import React from 'react';
import { NavLink } from 'react-router-dom';

import SidebarStyle from './SidebarStyle';

const Sidebar = () => {
  return (
    <SidebarStyle>
      <ul className="sidebar-menu">
        <li>
          <NavLink exact to="/" activeClassName="sidebar-selected">
            Kupci
          </NavLink>
        </li>
        <li>
          <NavLink to="/invoices" activeClassName="sidebar-selected">
            Računi
          </NavLink>
        </li>
        <li>
          <NavLink to="/articles" activeClassName="sidebar-selected">
            Artikli
          </NavLink>
        </li>{' '}
        <li>
          <NavLink to="/otpremnice" activeClassName="sidebar-selected">
            Otpremnice
          </NavLink>
        </li>{' '}
        <li>
          <NavLink to="/statistika" activeClassName="sidebar-selected">
            Statistika
          </NavLink>
        </li>
      </ul>
    </SidebarStyle>
  );
};

export default Sidebar;
