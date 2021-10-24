import React, { useState, useEffect } from 'react';
import HeaderOptions from '../components/HeaderOptions';
import MenuOptions from '../components/MenuOptions';
import Dashboard from '../patterns/Dashboard';
import LinksPg from '../patterns/LinksPg';
import Profile from '../patterns/Profile';
import SettingPg from '../patterns/SettingPg';

import {getUserProfile, test} from '../utils/utilsFunction';

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
      id: 'profile',
      text: 'Profile',
    },
    {
      id: 'settings',
      text: 'Settings',
    },
  ];

  const [pageOptions, setPageOptions] = useState('profile');

  useEffect(async () => {
    const profile = await getUserProfile();
  }, []);

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
          {pageOptions === 'profile' && <Profile />}
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
