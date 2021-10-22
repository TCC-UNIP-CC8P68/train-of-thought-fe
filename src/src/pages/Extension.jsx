import React from 'react';

import { GlobalContext } from '../contexts/GlobalContext';
import SelectBar from '../components/SelectBar';

import '../sass/Extension.scss';
import SearchMode from '../patterns/SearchMode';
import FocusMode from '../patterns/FocusMode';
import Header from '../components/Header';

function Extension() {
  const global = React.useContext(GlobalContext);
  const btnSelect = [
    {
      id: 'sMode',
      text: 'Captura de Paginas',
    },
    {
      id: 'fMode',
      text: 'Foco',
    },
    {
      id: 'pMode',
      text: 'Pomodoro',
    },
  ];

  return (
    <div className="body_popup">
      <Header />
      <main
        className={`container_extension ${
          global.nightMode ? 'night_mode' : ''
        }`}
      >
        <SelectBar buttons={btnSelect} />
        <div className={`container`}>
          {global.typeMode === 0 && <SearchMode />}
          {global.typeMode === 1 && <FocusMode />}
        </div>
      </main>
    </div>
  );
}

export default Extension;
