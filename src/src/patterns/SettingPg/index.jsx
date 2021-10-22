import React, { useState } from 'react';
import InputCustom from '../../components/InputCustom';
import './SettingPg.scss';

const SettingPg = () => {
  const [time, setTime] = useState('');
  const [insta, setInsta] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

  return (
    <div className="block_options">
      <div className="div-block">
        <h2> Capture Mode</h2>
        <InputCustom
          id="timeBox"
          label="Time"
          value={time}
          setValue={setTime}
        />
      </div>
      <div className="div-block">
        <h2> Social</h2>
        <InputCustom
          id="nomeBox"
          label="Insta"
          value={insta}
          setValue={setInsta}
        />
        <InputCustom
          id="nomeBox"
          label="Facebook"
          value={facebook}
          setValue={setFacebook}
        />
        <InputCustom
          id="nomeBox"
          label="LinkedIn"
          value={linkedIn}
          setValue={setLinkedIn}
        />
      </div>
    </div>
  );
};

export default SettingPg;
