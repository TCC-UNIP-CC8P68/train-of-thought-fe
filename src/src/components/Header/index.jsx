import React from 'react';

import { GlobalContext } from '../../contexts/GlobalContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { BsGear } from 'react-icons/bs';

import './Header.scss';
import Logo from '../Logo';
import { handleDashboard } from '../../utils/utilsFunction';

function Header() {
  const global = React.useContext(GlobalContext);

  return (
    <header className={global.nightMode ? 'night_mode' : ''}>
      <div>
        <Logo className="logo-header"/>
      </div>
      <div className="btn-config">
        <span
          onClick={() => {
            handleDashboard()
          }}
        >
          <BsGear />
        </span>
        {global.nightMode ? (
          <span onClick={global.handleNightMode}>
            <FiSun />
          </span>
        ) : (
          <span onClick={global.handleNightMode}>
            <FiMoon />
          </span>
        )}
      </div>
    </header>
  );
}

export default Header;
