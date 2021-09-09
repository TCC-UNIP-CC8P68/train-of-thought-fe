import React from 'react';

import { GlobalContext } from '../../contexts/GlobalContext';
import './SelectBar.scss';

function SelectBar({ buttons }) {
  const global = React.useContext(GlobalContext);
  return (
    <div className="select-bar">
      <ul className="select-bar-list">
        {buttons.map((btn, index) => {
          return (
            <li
              className={`select-bar-button ${
                global.typeMode === index ? 'onBtn' : ''
              }`}
              onClick={() => {
                global.setTypeMode(index);
              }}
              key={btn.id}
            >
              <span>{btn.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SelectBar;
