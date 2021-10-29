import React from 'react';

import { GlobalStorage } from './contexts/GlobalContext';
import Options from './pages/Options';
import Popup from './pages/Popup';

import './sass/global.scss';

function App() {
  return (
    <>
      <GlobalStorage>
         { window.innerHeight === 25 ? <Popup /> : <Options /> }
      </GlobalStorage>
    </>
  );
}

export default App;
