import React, { useState } from 'react';
import HeaderOptions from '../components/HeaderOptions';
import MenuOptions from '../components/MenuOptions';
import Dashboard from '../patterns/Dashboard';
import LinksPg from '../patterns/LinksPg';
import SettingPg from '../patterns/SettingPg';

import '../sass/Options.scss';

const Options = () => {
  const optMenu = [
    {
      id: 'dashboard',
      text: 'Dashboard',
    },
    {
      id: 'links',
      text: 'Links',
    },
    {
      id: 'settings',
      text: 'Settings',
    },
  ];

  const [pageOptions, setPageOptions] = useState('dashboard');

  return (
    <div className="body_options">
      <HeaderOptions />
      <div className="body_content">
        <MenuOptions
          options={optMenu}
          active={pageOptions}
          setPage={setPageOptions}
        />
        <main>          
          {pageOptions === 'dashboard' && <Dashboard />}
          {pageOptions === 'links' && <LinksPg />}
          {pageOptions === 'settings' && <SettingPg />}
        </main>
      </div>
      <footer>
        <small>train of thought</small>
      </footer>
    </div>
  );
};

export default Options;
