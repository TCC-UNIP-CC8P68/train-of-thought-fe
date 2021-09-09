import React from 'react';

import { GlobalContext } from '../../contexts/GlobalContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { BsGear } from 'react-icons/bs';

import './Header.scss';

function Header() {
  const global = React.useContext(GlobalContext);

  return (
    <header className={global.nightMode ? 'night_mode' : ''}>
      <div>
        <p>Logo</p>
      </div>
      <div className="btn-config">
      <span onClick={() => { global.setOnConfig(!global.onConfig) }}> <BsGear /> </span>
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
