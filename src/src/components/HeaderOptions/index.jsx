import React from 'react';
import Logo from '../Logo';

import './HeaderOptions.scss';

const HeaderOptions = () => {
  return (
    <header className="header_options">
      <div class="logo_content">
        <Logo />
      </div>
      <div class="user_content">
        <span class="user">
          <i></i>
        </span>
      </div>
    </header>
  );
};

export default HeaderOptions;
