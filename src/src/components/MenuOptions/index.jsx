import React from 'react';
import './MenuOptions.scss';

const MenuOptions = ({ options, active, setPage }) => {
  return (
    <menu>
      <ul>
        {options.map((opt) => (
          <li key={opt.id} className={active === opt.id ? 'ativo' : ''}>
            <a onClick={() => setPage(opt.id)}> {opt.text} </a>
          </li>
        ))}
      </ul>
    </menu>
  );
};

export default MenuOptions;
