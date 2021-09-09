import React from 'react';
import ButtonCustom from '../../components/ButtonCustom';
import InputCustom from '../../components/InputCustom';
import TimeStopwatch from '../../components/TimeStopwatch';
import { maskTime, removeMaskTime } from '../../utils/utilsMask';

import './FocusMode.scss';

function FocusMode() {
  const [focusTime, setFocusTime] = React.useState('');

  const refFocus = React.useRef(null);

  return (
    <div className="focusMode">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(
            removeMaskTime(removeMaskTime(focusTime.current.value)) * 1000,
          );
          // handleTime(refTime);
        }}
      >
        <h1>Manter o foco</h1>
        <div className="container_form">
          <InputCustom
            id="focusUser"
            label="Tempo"
            value={focusTime}
            setValue={setFocusTime}
            refInput={refFocus}
            mask={maskTime}
          />
          <ButtonCustom type="submit"> Alterar </ButtonCustom>
        </div>
      </form>
      <div className="container_time">
        <TimeStopwatch />
      </div>
    </div>
  );
}

export default FocusMode;
