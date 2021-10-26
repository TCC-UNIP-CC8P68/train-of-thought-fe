import React, { useEffect, useState } from 'react';
import Logo from '../Logo';

import { getUserProfileData } from '../../utils/utilsChrome';

import './HeaderOptions.scss';

const HeaderOptions = () => {
  const [userProfile, setUserProfile] = useState({});

  useEffect(async () => {
    const profileData = await getUserProfileData();
    setUserProfile(profileData);
  }, []);

  return (
    <header className="header_options">
      <div class="logo_content">
        <Logo />
      </div>
      <div class="user_content">
        <h1>{userProfile.name}</h1>
        <span class="user">
          <i><img src={userProfile.picture} alt="Foto de perfil"/></i>
        </span>
      </div>
    </header>
  );
};

export default HeaderOptions;
