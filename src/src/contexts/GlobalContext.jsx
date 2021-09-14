import React, { useEffect, useState } from 'react';
import { getSyncConfig } from '../utils/utilsFunction';

export const GlobalContext = React.createContext();

export const GlobalStorege = ({ children }) => {
  const [nightMode, setNightMode] = React.useState(false);
  const [typeMode, setTypeMode] = React.useState(0);
  const [onConfig, setOnConfig] = React.useState(false);
  const [allowMute, setAllowMute] = useState(false);
  const [time, setTime] = React.useState("");
  const [allowCapture, setAllowCapture] = useState({})

  function handleNightMode() {
    setNightMode(!nightMode);
  }
  useEffect(() => {
    getSyncConfig().then(function(res) {
      setAllowCapture(res.allowCapture);
      setTime(res.timeoutValue)
    })
  }, [])

  

  return (
    <GlobalContext.Provider
      value={{ nightMode, handleNightMode, typeMode, setTypeMode, onConfig, setOnConfig, time, setTime, allowCapture, setAllowCapture, allowMute, setAllowMute }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
