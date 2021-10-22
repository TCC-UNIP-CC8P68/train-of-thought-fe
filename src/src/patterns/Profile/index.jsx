import React, { useState } from 'react';
import InputCustom from '../../components/InputCustom';
import './Profile.scss';

const Profile = () => {
  const [nome, setNome] = useState('');
  const [insta, setInsta] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

  return (
    <div className="block_options">
      <div className="div-block">
        <h2> Geral</h2>
        <InputCustom
          id="nomeBox"
          label="Nome"
          value={nome}
          setValue={setNome}
        />
      </div>
      <div className="div-block">
        <h2> Social</h2>
        <InputCustom
          id="instBox"
          label="Insta"
          value={insta}
          setValue={setInsta}
        />
        <InputCustom
          id="fbBox"
          label="Facebook"
          value={facebook}
          setValue={setFacebook}
        />
        <InputCustom
          id="linkBox"
          label="LinkedIn"
          value={linkedIn}
          setValue={setLinkedIn}
        />
      </div>
    </div>
  );
};

export default Profile;
