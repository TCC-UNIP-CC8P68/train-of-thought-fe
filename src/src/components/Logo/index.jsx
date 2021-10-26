import React from 'react';
import LogoNormal from '../../assets/logo/iconTrain.png';
import LogoWhite from '../../assets/logo/iconTrain2.png';

function Logo({ colorNormal, className }) {
  return (
    <img
      src={colorNormal ? LogoNormal : LogoWhite}
      className={className}
      alt="Logo"
    />
  );
}

export default Logo;
