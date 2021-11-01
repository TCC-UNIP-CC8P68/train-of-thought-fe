import React, { useState } from 'react';
import ButtonCustom from '../../components/ButtonCustom';
import CheckSwitch from '../../components/CheckSwitch';
import InputCustom from '../../components/InputCustom';
import { GlobalContext } from '../../contexts/GlobalContext';
import { handleTime, setCaptureOnOff, toggleDontDisturb } from '../../utils/utilsFunction';
import { removeMaskTime } from '../../utils/utilsMask';
import './SettingPg.scss';

const SettingPg = () => {
  const [time, setTime] = useState('');
  const [timeFoco, setTimeFoco] = useState('');
  const refTime = React.useRef(null);

  const global = React.useContext(GlobalContext);

  return (
    <form className="block_options" onSubmit={(e) => {
      e.preventDefault();
      const [min, sec] = removeMaskTime(refTime.current.value);
      const totalTime = ((min * 60) + Number(sec)) * 1000;

      handleTime(totalTime);
    }}>
      <div className="div-block">
        <h2> Captura de paginas</h2>
        <div className="divSett">
          <InputCustom
            id="timeBox"
            label="Tempo de Captura"
            value={time}
            setValue={setTime}
          />
        </div>
        <div className="divSett">
          <CheckSwitch
            id="allow_capture"
            label="Ativar Captura"
            value="capture"
            checked={global.allowCapture}
            setChecked={global.setAllowCapture}
            onClick={() => {setCaptureOnOff()}}
          />
          <CheckSwitch
            id="allow_capture"
            label="Não pertube"
            value="capture"
            checked={global.allowMute}
            setChecked={global.setAllowMute}
            onClick={() => {toggleDontDisturb()}}
          />
        </div>
      </div>
      <div className="div-block">
        <h2> Foco </h2>
        <div className="div-block">
          <InputCustom
          
            id="timeBox"
            label="Tempo"
            value={timeFoco}
            setValue={setTimeFoco}
          />
        </div>
        <div className="saveConfig">
          <ButtonCustom> Salvar </ButtonCustom>
        </div>
      </div>
    </form>
  );
};

export default SettingPg;
