import React, { useState } from 'react';
import ButtonCustom from '../../components/ButtonCustom';
import CheckSwitch from '../../components/CheckSwitch';

import { GlobalContext } from '../../contexts/GlobalContext';
import InputCustom from '../../components/InputCustom';
import './UserConfig.scss';

function UserConfig() {
  const [tconfig, setTconfig] = useState('');
  const [checkConfig, setCheckConfig] = useState(false);
  const [checkConfig2, setCheckConfig2] = useState(false);

  const global = React.useContext(GlobalContext);

  return (
    <div
      className={`popUp_config 
      ${global.onConfig && 'open_config'} 
      ${global.nightMode && 'night_mode'}`}
    >
      <div className="container_config">
        <form action="">
          <div className="container_check">
            <CheckSwitch
              id="ipt"
              label="teste"
              value="teste"
              checked={checkConfig}
              setChecked={setCheckConfig}
            />

            <CheckSwitch
              id="ipt2"
              label="teste2"
              value="teste2"
              checked={checkConfig2}
              setChecked={setCheckConfig2}
            />
          </div>
          <InputCustom
            id="tx1"
            label="tx1"
            value={tconfig}
            setValue={setTconfig}
          />
          <div className="btnForm_config">
            <ButtonCustom> enviar </ButtonCustom>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserConfig;
