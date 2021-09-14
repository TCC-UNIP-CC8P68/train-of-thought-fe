import React from 'react';

import './InputCustom.scss';

function InputCustom({
  classInput,
  id,
  type,
  label,
  value,
  setValue,
  refInput,
  mask,
}) {
  function handleValue(e) {
    setValue(mask(e.target.value));
  }

  function handleValueMask(e) {
    setValue(mask(e.target.value));
  }

  function handleMaskValue(e) {
    setValue(mask(e.target.value));
    return value
  }

  return (
    <div className={`inputCustom ${classInput ? classInput : ''}`}>
      <input
        type={type ? type : 'text'}
        name={id}
        id={id}
        value={handleMaskValue(value)}
        onChange={mask ? handleValueMask : handleValue}
        ref={refInput}
      />
      <label htmlFor={id} className={value ? 'onValue' : ''}>
        {label}
      </label>
    </div>
  );
}

export default InputCustom;
