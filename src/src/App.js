import React from 'react';

import { GlobalStorege } from './contexts/GlobalContext';
import Header from './components/Header';
import Extension from './pages/Extension';
import UserConfig from './patterns/UserConfig';

import './sass/global.scss';

function App() {
  return (
    <div className="body_popup">
      <GlobalStorege>
        <Header />
        <Extension />
        <UserConfig />
      </GlobalStorege>
    </div>
  );
}

export default App;
