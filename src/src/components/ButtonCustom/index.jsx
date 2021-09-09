import React from 'react';

import './ButtonCustom.scss';

function ButtonCustom({ className, children, onClick, type }) {
  return (
    <button
      className={`buttonCustom ${className ? className : ''}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonCustom;
