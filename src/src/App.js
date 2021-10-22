import React from 'react';

import { GlobalStorege } from './contexts/GlobalContext';
import Options from './pages/Options';
import Extension from './pages/Extension';

import './sass/global.scss';

function App() {
  return (
    <>
      <GlobalStorege>
         { window.innerHeight === 25 ? <Extension /> : <Options /> }
      </GlobalStorege>
    </>
  );
}

export default App;
