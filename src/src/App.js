import React from 'react';

import { GlobalStorege } from './contexts/GlobalContext';
import Options from './pages/Options';
import Popup from './pages/Popup';

import './sass/global.scss';

function App() {
  return (
    <>
      <GlobalStorege>
         { window.innerHeight === 25 ? <Popup /> : <Options /> }
      </GlobalStorege>
    </>
  );
}

export default App;
