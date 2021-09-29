/*global chrome*/

import React from "react";

import { GlobalContext } from "../../contexts/GlobalContext";
import ButtonCustom from "../../components/ButtonCustom";
import InputCustom from "../../components/InputCustom";
import { handleTime, setCaptureOnOff, muteTabsOnOff } from '../../utils/utilsFunction';
import CheckSwitch from "../../components/CheckSwitch";
import { maskTime, removeMaskTime } from "../../utils/utilsMask";

import "./SearchMode.scss";

function SearchMode() {
  const global = React.useContext(GlobalContext);

  const refTime = React.useRef(null);

  return (
    <div className="srcMode">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const [min, sec] = removeMaskTime(refTime.current.value);
          const totalTime = (min * 60 + Number(sec)) * 1000;

          handleTime(totalTime);
        }}
      >
        <div className="container_form">
          <InputCustom
            id="timeUser"
            label="Tempo de Captura"
            value={global.time}
            setValue={global.setTime}
            refInput={refTime}
            mask={maskTime}
          />
          <ButtonCustom type="submit"> Redefinir </ButtonCustom>
        </div>
        <div className="allowCapture">
          <CheckSwitch
            id="allow_capture"
            label="Ativar Captura"
            value="capture"
            checked={global.allowCapture}
            setChecked={global.setAllowCapture}
            onClick={() => {setCaptureOnOff()}}
          />
        </div>

        <div className="allowCapture">
          <CheckSwitch
            id="mute_tabs"
            label="Mutar abas"
            value="capture"
            checked={global.allowMute}
            setChecked={global.setAllowMute}
            onClick={() => {muteTabsOnOff()}}
          />
        </div>
      </form>
    </div>
  );
}

export default SearchMode;
