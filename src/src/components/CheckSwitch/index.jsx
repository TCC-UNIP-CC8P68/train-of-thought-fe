import React from 'react';

import './CheckSwitch.scss';

function CheckSwitch({ classInput, id, label, value, checked, setChecked }) {
  return (
    <div className="check-switch">
      <input
        type="checkbox"
        id={id}
        name={id}
        value={value ? value : id}
        checked={checked}
        onChange={({ target }) => setChecked(target.checked)}
      />
      <label
        className={`switcher ${classInput ? classInput : ''}`}
        htmlFor={id}
      ></label>
      <span>{label}</span>
    </div>
  );
}

export default CheckSwitch;
