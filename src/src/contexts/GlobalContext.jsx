import React, { useState } from 'react';

export const GlobalContext = React.createContext();

export const GlobalStorege = ({ children }) => {
  const [nightMode, setNightMode] = React.useState(false);
  const [typeMode, setTypeMode] = React.useState(0);
  const [onConfig, setOnConfig] = React.useState(false);
  const [allowCapture, setAllowCapture] = useState(false)

  function handleNightMode() {
    setNightMode(!nightMode);
  }

  return (
    <GlobalContext.Provider
      value={{ nightMode, handleNightMode, typeMode, setTypeMode, onConfig, setOnConfig, allowCapture, setAllowCapture }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
